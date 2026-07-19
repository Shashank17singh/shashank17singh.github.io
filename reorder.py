import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# Extract projects
# We know projects-grid starts around line 491
start_grid = html.find('<div class="projects-grid">')
end_grid = html.find('</div>\n  </div>\n</section>\n\n<section id="experience">')

grid_content = html[start_grid + len('<div class="projects-grid">'):end_grid]

# Split into cards. Each card starts with <div class="project-card reveal tilt">
# But the first one doesn't have a split point before it easily if we just split by this string.
cards_split = grid_content.split('<div class="project-card reveal tilt">')
cards = []
for c in cards_split:
    if c.strip():
        cards.append('<div class="project-card reveal tilt">' + c)

# Map titles to cards
card_dict = {}
for c in cards:
    match = re.search(r'<div class="project-title">(.*?)</div>', c)
    if match:
        title = match.group(1).split("—")[0].strip()
        card_dict[title] = c

# We want the order:
# 1. Your-Own-AI
# 2. DPI Engine
# 3. Home Price Suite
# 4. UPI Mesh
# 5. AI Resume Screener
# 6. Conversational RAG Chatbot
# 7. Sports Person Classifier
# 8. Posture Checker

order = [
    "Your-Own-AI",
    "DPI Engine",
    "Home Price Suite",
    "UPI Mesh",
    "AI Resume Screener",
    "Conversational RAG Chatbot",
    "Sports Person Classifier",
    "Posture Checker — AI Physiotherapy"
]

new_grid_content = "\n".join([card_dict[title] for title in order])

new_html = html[:start_grid + len('<div class="projects-grid">')] + "\n" + new_grid_content + html[end_grid:]

# Now let's update some project details in the new_html
# Home price suite:
# Add Docker, AWS, GitHub Actions to stack
new_html = new_html.replace(
    '<span class="stack-pill">Scikit-learn</span><span class="stack-pill">Flask</span><span class="stack-pill">Nginx</span>',
    '<span class="stack-pill">Scikit-learn</span><span class="stack-pill">Flask</span><span class="stack-pill">Nginx</span><span class="stack-pill">Docker</span><span class="stack-pill">AWS</span><span class="stack-pill">GitHub Actions</span>'
)

# Standardize Live Demo links
# UPI Mesh
new_html = new_html.replace(
    '<a href="https://home-prices-api.duckdns.org/upi/" target="_blank" class="project-link" style="color: var(--accent); margin-right: 15px; font-weight: bold;">🔴 Live Demo</a>',
    '<a href="https://home-prices-api.duckdns.org/upi/" target="_blank" class="project-link" style="color: var(--accent); margin-right: 15px; font-weight: bold;">Live Demo 🔴</a>'
)

# Home Price suite demo link
new_html = new_html.replace(
    '<a href="https://home-prices-api.duckdns.org/" target="_blank" class="project-link demo">Live Demo ↗</a>',
    '<a href="https://home-prices-api.duckdns.org/" target="_blank" class="project-link" style="color: var(--accent); margin-left: 15px; font-weight: bold;">Live Demo 🔴</a>'
)


with open("index.html", "w", encoding="utf-8") as f:
    f.write(new_html)
