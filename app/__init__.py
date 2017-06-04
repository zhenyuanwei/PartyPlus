from flask import Flask

app = Flask(__name__)
app.secret_key = 'something is secret for others'

from app.views import party
from app.views import webpage
from app.views import wxsysview
from app.views import flowview
from app.views import bookview