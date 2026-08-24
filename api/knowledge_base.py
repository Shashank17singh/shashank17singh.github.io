# knowledge_base.py
# Structured source documents for the RAG chatbot. Each entry becomes one
# retrievable chunk. Keep entries focused (one topic each) — smaller, focused
# chunks retrieve more precisely than one giant blob.
#
# TO UPDATE: edit/add entries here, then re-run `python ingest.py` to rebuild
# the vector index. The Flask app reads from the persisted Chroma DB, not
# from this file directly, so ingestion must be re-run after any edit.

DOCUMENTS = [
    {
        "id": "about-1",
        "category": "about",
        "text": (
            "Shashank Singh is a final-year B.Tech Computer Science and "
            "Artificial Intelligence candidate at the University of Lucknow "
            "(Oct 2023 - Present). He specializes in architecting scalable "
            "machine learning infrastructure, engineering computer vision "
            "systems, and deploying Retrieval-Augmented Generation (RAG) "
            "pipelines for production environments."
        ),
    },
    {
        "id": "about-2",
        "category": "about",
        "text": (
            "Shashank's technical expertise centers on building scalable "
            "backend infrastructure, engineering custom vector databases, "
            "and deploying machine learning models as production web APIs "
            "using Flask, FastAPI, Docker, and AWS. He has built systems "
            "ranging from a deep packet inspection engine in modern C++ to "
            "localized RAG pipelines using Ollama."
        ),
    },
    {
        "id": "about-3",
        "category": "about",
        "text": (
            "Shashank is actively seeking full-time and internship "
            "opportunities in software engineering, machine learning, and "
            "data science, particularly roles involving AI/ML deployment, "
            "backend systems, and RAG applications."
        ),
    },
    {
        "id": "education-1",
        "category": "education",
        "text": (
            "Education: B.Tech in Computer Science and Engineering "
            "(Artificial Intelligence) at the University of Lucknow, "
            "October 2023 to present, currently in his final year."
        ),
    },
    {
        "id": "experience-1",
        "category": "experience",
        "text": (
            "Shashank worked as a Data Science Intern at NIELIT, Gorakhpur "
            "(Government of India, remote) from June 2025 to July 2025. He "
            "led data preprocessing, feature engineering, and exploratory "
            "data analysis across 5+ real-world datasets using NumPy, "
            "Pandas, and Matplotlib; built and evaluated 6 machine learning "
            "algorithms including SVM, Random Forest, and KNN with "
            "Scikit-learn; and built 10+ interactive data visualizations "
            "for feature selection and model tuning."
        ),
    },
    {
        "id": "certifications-1",
        "category": "certifications",
        "text": (
            "Shashank holds a certification in Fundamentals of Machine "
            "Learning and AI from AWS Training & Certification (June 2026), "
            "and an Artificial Intelligence certification from the Samsung "
            "Innovation Campus (Oct-Dec 2025, ID: SIC19189)."
        ),
    },
    {
        "id": "skills-languages",
        "category": "skills",
        "text": (
            "Programming languages: Python, C++, SQL, HTML, CSS, "
            "JavaScript."
        ),
    },
    {
        "id": "skills-ai-ml",
        "category": "skills",
        "text": (
            "AI & Machine Learning skills: Scikit-learn, PyTorch, "
            "LangChain, HuggingFace, ChromaDB, Ollama, Groq, OpenCV, "
            "MediaPipe, Pydantic."
        ),
    },
    {
        "id": "skills-systems",
        "category": "skills",
        "text": (
            "Systems engineering skills: C++17, multithreading, libpcap, "
            "TCP/UDP networking, vector databases, HNSW."
        ),
    },
    {
        "id": "skills-backend",
        "category": "skills",
        "text": (
            "Backend development skills: Flask, FastAPI, REST APIs, "
            "cpp-httplib, SQLite, SQLAlchemy."
        ),
    },
    {
        "id": "skills-cloud",
        "category": "skills",
        "text": (
            "Cloud & DevOps skills: Docker, Nginx, AWS, GitHub Actions "
            "(CI/CD), Vercel, Streamlit."
        ),
    },
    {
        "id": "skills-data",
        "category": "skills",
        "text": (
            "Data science & analytics skills: Pandas, NumPy, Matplotlib, "
            "Jupyter Notebook."
        ),
    },
    {
        "id": "project-vectordb",
        "category": "project",
        "text": (
            "Project: Your-Own-AI (Vector Database from Scratch). A "
            "high-performance vector database built in modern C++, "
            "implementing HNSW, KD-Tree, and Brute-Force search algorithms "
            "across multiple distance metrics with an automated "
            "benchmarking suite. Integrates a localized RAG pipeline using "
            "Ollama with document chunking, nomic-embed-text embeddings, "
            "and context retrieval for Llama 3.2 1B. Includes a REST API "
            "and a 2D PCA visualization frontend. Tech: C++, HNSW, "
            "KD-Tree, RAG, Ollama, cpp-httplib. "
            "GitHub: github.com/Shashank17singh/Your-Own-AI"
        ),
    },
    {
        "id": "project-dpi",
        "category": "project",
        "text": (
            "Project: DPI Engine (Deep Packet Inspector). A C++17 deep "
            "packet inspection engine that analyzes PCAP captures, "
            "reconstructs TCP/UDP flows, and classifies application-layer "
            "traffic via TLS SNI and HTTP Host inspection. Includes "
            "configurable traffic blocking heuristics and both "
            "single-threaded and multi-threaded (load-balancer + fast-path) "
            "architectures. Tech: C++17, libpcap, TLS/SNI, multithreading. "
            "GitHub: github.com/Shashank17singh/DPI-Engine"
        ),
    },
    {
        "id": "project-homeprice",
        "category": "project",
        "text": (
            "Project: Home Price Suite. An end-to-end ML ecosystem with a "
            "Flask REST API, Nginx reverse proxy, and a responsive "
            "frontend. Uses a Scikit-learn Linear Regression model "
            "optimized through feature engineering, EDA, outlier "
            "mitigation, and K-Fold cross-validation. Tech: Python, "
            "Scikit-learn, Flask, Nginx, Docker, AWS, GitHub Actions. API "
            "repo: github.com/Shashank17singh/Home-Prices-API. Live demo: "
            "home-prices-api.duckdns.org"
        ),
    },
    {
        "id": "project-upimesh",
        "category": "project",
        "text": (
            "Project: UPI Mesh (Offline-First Payments). An offline-first "
            "payment backend that settles UPI-style transactions in "
            "zero-connectivity environments, using hybrid RSA/AES-GCM "
            "cryptography, a simulated Bluetooth mesh network, and an "
            "idempotent settlement engine managed via a FastAPI dashboard. "
            "Tech: Python, FastAPI, RSA/AES-GCM, SQLite, Docker, Nginx, "
            "AWS, GitHub Actions. GitHub: github.com/Shashank17singh/"
            "UPI_Mesh. Live demo: upi-mesh.duckdns.org"
        ),
    },
    {
        "id": "project-resumescreener",
        "category": "project",
        "text": (
            "Project: AI Resume Screener. An LLM-driven pipeline using "
            "Streamlit and the Groq API to parse resumes and job "
            "descriptions into structured Pydantic schemas for automated "
            "candidate ranking. Features exponential retry-with-backoff, "
            "hash-based document caching, and isolated error handling. "
            "Tech: Python, Streamlit, Groq, Pydantic. GitHub: "
            "github.com/Shashank17singh/ai-resume-screener. Live demo: "
            "resume-parsers.streamlit.app"
        ),
    },
    {
        "id": "project-rag-chatbot",
        "category": "project",
        "text": (
            "Project: Conversational RAG Chatbot. An interactive "
            "Retrieval-Augmented Generation web app using Streamlit, "
            "LangChain, and Groq for context-aware, multi-turn dialogue "
            "over uploaded PDF documents. Features document chunking, "
            "HuggingFace embeddings, ChromaDB vector storage, and the Groq "
            "Llama 3.3 70B model for low-latency inference. Tech: Python, "
            "Streamlit, LangChain, ChromaDB, Groq, HuggingFace. GitHub: "
            "github.com/Shashank17singh/Conversational-RAG-Chatbot. Live "
            "demo: conversational-rag-chatbot-pdf.streamlit.app"
        ),
    },
    {
        "id": "project-sportsclassifier",
        "category": "project",
        "text": (
            "Project: Sports Person Classifier. A computer vision "
            "classification system using OpenCV Haar Cascades and Wavelet "
            "Transforms for feature extraction, with SVM, Random Forest, "
            "and Logistic Regression models tuned via GridSearchCV, "
            "achieving over 87% accuracy. Deployed as a Flask REST API "
            "with a real-time frontend. Tech: Python, OpenCV, Scikit-learn, "
            "Flask. GitHub: github.com/Shashank17singh/"
            "Sports-Person-Classifier. Live demo: "
            "sports-person-classifier-xi.vercel.app"
        ),
    },
    {
        "id": "project-posture",
        "category": "project",
        "text": (
            "Project: Posture Checker (AI Physiotherapy). An AI-driven "
            "physiotherapy app giving real-time exercise form feedback "
            "using MediaPipe pose estimation, with geometric algorithms "
            "converting pose landmarks into joint angles for rep counting, "
            "isometric hold tracking, and form-deviation detection. Tech: "
            "Python, Streamlit, MediaPipe, OpenCV. GitHub: "
            "github.com/Shashank17singh/SIC-Project. Live demo: "
            "sic-project.streamlit.app"
        ),
    },
    {
        "id": "project-houseprice",
        "category": "project",
        "text": (
            "Project: House Price Predictor. A desktop application built "
            "with Python's Tkinter framework and Scikit-learn for "
            "real-time property price predictions, using a trained Linear "
            "Regression model in a GUI. Tech: Python, Tkinter, "
            "Scikit-learn. GitHub: github.com/Shashank17singh/"
            "NIELIT-Project. Live demo: nielit-project.streamlit.app"
        ),
    },
    {
        "id": "contact-1",
        "category": "contact",
        "text": (
            "Contact Shashank Singh: email shashanksingh1709@gmail.com, "
            "phone +91 79058 51722, GitHub github.com/Shashank17singh, "
            "LinkedIn linkedin.com/in/shashank17singh, portfolio site "
            "shashank17singh.github.io. He is open to discussing "
            "full-time roles, internships, and collaborations."
        ),
    },
]
