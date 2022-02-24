from contextlib import redirect_stderr
from flask import render_template
from app import app

@app.route('/')
@app.route('/index')
def index():
    username = 'guest'

    return render_template('index.html', username=username)