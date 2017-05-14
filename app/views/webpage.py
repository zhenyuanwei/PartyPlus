from app import app
from flask import render_template

@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/partyguild')
def guild():
    return render_template('partyguild.html')