from flask import Flask

app = Flask(__name__)

from app.views import party
from app.views import webpage