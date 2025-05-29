# API de recommandation de produits

python -m venv venv
venv\Scripts\activate 

pip install flask
pip install flask_cors
pip install guincorn
pip install pandas
pip install requests
pip install joblib
pip install xgboost
pip install scikit-learn

pip install -r requirements.txt

pip freeze > requirements.txt

run local: flask --app app run