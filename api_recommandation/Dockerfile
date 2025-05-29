FROM python:3.12-slim

# Crée un environnement virtuel
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Copie les fichiers du projet
COPY . /app
WORKDIR /app

# Installe les dépendances
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Lance gunicorn
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "main:app"]
