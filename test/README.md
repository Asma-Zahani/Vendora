# API de recommandation de produits

python -m venv venv
venv\Scripts\activate 

pip install flask
pip install guincorn
pip install pandas
pip install requests

pip freeze > requirements.txt

run local: flask --app app run
