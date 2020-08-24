from flask import Flask, Response, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
import webServiceStream
from RandomDealData import *
import mysql.connector

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'ppp'
app.config['MYSQL_DB'] = 'db_grad_cs_1917'
app.config['MYSQL_DATABASE_PORT'] = '3306'

mysql = MySQL(app)


@app.route('/')
def index():
    return webServiceStream.index()

@app.route('/testservice')
def testservice():
    return webServiceStream.testservice()

@app.route('/streamTest')
def stream():
    return webServiceStream.stream()

@app.route('/streamTest/sse')
def sse_stream():
     return webServiceStream.sse_stream()

@app.route('/login', methods = ['POST'])
def login():
    content = request.get_json()
    cursor = mysql.connection.cursor()
    
    data = {
        "anonymous_user_id" : content['username'],
        "anonymous_user_pwd": content['password']
    }
    
    query = "SELECT * FROM anonymous_users WHERE anonymous_user_id = \"{0}\" AND anonymous_user_pwd = \"{1}\"".format(data["anonymous_user_id"], data["anonymous_user_pwd"])
    cursor.execute(query)
    mysql.connection.commit()
    cursor.close()
    if cursor.rowcount == 0:
        return jsonify(0)
    return jsonify(1)


def bootapp():
    #global rdd 
    #rdd = RandomDealData()
    #webServiceStream.bootServices()
    app.run(debug=True, port=8080, threaded=True, host=('0.0.0.0'))


if __name__ == "__main__":
      bootapp()
    
