from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
app.secret_key = "secretkey"
cors = CORS(app, resources={r'/api/*': {"origins":"*"}}, supports_credentials=True)