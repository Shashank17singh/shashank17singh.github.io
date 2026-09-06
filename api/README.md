# Portfolio RAG Chatbot

A retrieval-augmented chatbot for shashank17singh.github.io. Visitors ask
questions about Shashank's projects, skills, experience, and contact info;
the bot retrieves the relevant facts from a small vector index and answers
using Groq's Llama 3.3 70B.

## What's in this folder

```
backend/
  knowledge_base.py   # source facts about Shashank (edit this to update the bot's knowledge)
  ingest.py            # builds the Chroma vector index from knowledge_base.py
  app.py                # Flask API: POST /chat
  requirements.txt
  .env.example
widget-snippet.html    # standalone copy of the chat widget (HTML+CSS+JS)
index.html              # YOUR PORTFOLIO with the widget already inserted before </body>
```

`index.html` is your existing portfolio content, unchanged, with the chat
widget appended right before `</body>`. You can copy it straight over your
current `index.html` in the `shashank17singh.github.io` repo.

## 1. Backend setup (local)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# edit .env: set GROQ_API_KEY (get one free at console.groq.com)

python ingest.py     # builds ./chroma_db from knowledge_base.py - run once, and again after any edit to knowledge_base.py
python app.py         # starts dev server on http://localhost:5000
```

Test it:
```bash
curl -X POST http://localhost:5000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What projects has Shashank built?"}'
```

## 2. Deploying the backend

GitHub Pages only serves static files, so the Flask API needs to run
somewhere else. Two options, both compatible with what you've already set up:

**Option A - same pattern as Home-Prices-Suite (Flask + Nginx + DuckDNS)**
1. Provision a small VM (or reuse your existing one).
2. Copy the `backend/` folder over, set up the venv, run `ingest.py`.
3. Run the app with gunicorn: `gunicorn -w 2 -b 127.0.0.1:5000 app:app`
4. Point Nginx at it and set up a DuckDNS subdomain (e.g. `portfolio-bot.duckdns.org`), same as your other projects.
5. Add HTTPS (Let's Encrypt / certbot) - required, since GitHub Pages is HTTPS and browsers block mixed-content requests from an HTTPS page to an HTTP API.

**Option B - Render free tier (zero server maintenance)**
1. Push the `backend/` folder to a GitHub repo.
2. On Render: New → Web Service → connect the repo.
3. Build command: `pip install -r requirements.txt && python ingest.py`
4. Start command: `gunicorn -w 2 -b 0.0.0.0:$PORT app:app`
5. Add the `GROQ_API_KEY` env var in Render's dashboard.
6. Render gives you an HTTPS URL automatically.

Either way, once deployed, note the final API URL (e.g.
`https://portfolio-bot.duckdns.org/chat` or
`https://your-app.onrender.com/chat`).

## 3. Wire the frontend to your deployed backend

In `index.html`, find this line near the bottom (inside the widget's
`<script>` block):

```js
const CW_API_URL = "https://YOUR-BACKEND-DOMAIN/chat";
```

Replace it with your real deployed URL, then push `index.html` to your
`shashank17singh.github.io` repo.

Also update `ALLOWED_ORIGINS` in your backend's `.env` to your exact GitHub
Pages origin (`https://shashank17singh.github.io`) so CORS allows the
request - it's already set as the default.

## 4. Updating what the bot knows

Edit `backend/knowledge_base.py` - each entry is a short, focused fact.
Add a project, update your experience, whatever's changed. Then re-run:

```bash
python ingest.py
```

and restart the server (or redeploy, if hosted). The widget itself never
needs to change for content updates - only for style/behavior tweaks.

## Notes

- The bot only answers from `knowledge_base.py` - it's instructed not to
  invent details, so it won't hallucinate metrics or dates that aren't there.
- Groq's free tier is generous and fast (same one you're already using in
  AI Resume Screener and the Conversational RAG Chatbot), so cost shouldn't
  be an issue for portfolio-level traffic.
- If you'd rather skip a database dependency for something this small, you
  could swap ChromaDB for a plain in-memory cosine-similarity search over
  the ~20 chunks - it's a small enough corpus that this would work fine and
  removes one moving part. Not done here since you already know the
  ChromaDB + HuggingFace pattern from your other RAG projects.
