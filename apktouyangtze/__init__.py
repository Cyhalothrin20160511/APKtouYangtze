from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(os.path.dirname(__file__), 'apktouyangtze.db')
app.config['SECRET_KEY'] = os.urandom(24)
db = SQLAlchemy(app)
CORS(app)

from apktouyangtze import routes
