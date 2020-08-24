from flask import Flask, render_template, Response, session, redirect, url_for, request, jsonify, make_response
from flask_sse import sse
from flask_cors import CORS
import requests
import time

app = Flask(__name__)
# app.register_blueprint(sse, url_prefix='/stream')
CORS(app)

app.secret_key = 'aasdkaka0a0)I(838 28 -0(*-)_:":?:JL:H@'


@app.route('/deals')
def forwardStream():
    r = requests.get('http://localhost:8080/streamTest', stream=True)

    def eventStream():
        for line in r.iter_lines(chunk_size=1):
            if line:
                yield 'data:{}\n\n'.format(line.decode())

    return Response(eventStream(), mimetype="text/event-stream")


@app.route('/client/testservice')
def client_to_server():
    r = requests.get('http://localhost:8080/testservice')
    return Response(r.iter_lines(chunk_size=1), mimetype="text/json")


@app.route('/')
@app.route('/index')
def index():

    if 'username' in session:
        return 'Ok'
    else:
        return "You are not logged in <br><a href = '/login'>" + "click here to log in</a>"


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        session['username'] = request.json['username']
        print(session['username'])

        # todo: get request to database-ms
        # response = redirect(url_for('index'))
        # return response

        resp = make_response()
        resp.set_cookie("session", session)
        resp.set_bodie(jsonify(True))
        return resp
    return jsonify(False)


def get_message():
    """this could be any function that blocks until data is ready"""
    time.sleep(1.0)
    s = time.ctime(time.time())
    return s


def bootapp():
    app.run(port=8090, threaded=True, host=('0.0.0.0'))


if __name__ == '__main__':
    bootapp()
