from flask import Flask, render_template, Response, session, redirect, url_for, request, jsonify, make_response
from flask_sse import sse
from flask_cors import CORS
import requests
import time

app = Flask(__name__)
CORS(app)

userList = []

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
    if request.json['username'] in userList:
        return 'Ok'
    else:
        return "You are not logged in <br><a href = '/login'>" + "click here to log in</a>"


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        bd_response = requests.post('http://localhost:8080/login', json=request.json)
        print(type(bd_response.text))
        if int(bd_response.text) != 0:
            userList.append(request.json['username'])
            return jsonify(True)
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
