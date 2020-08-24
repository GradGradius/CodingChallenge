from flask import Flask, Response, request
from flask_mysqldb import MySQL
from flask_cors import CORS
import webServiceStream
from RandomDealData import *
import mysql.connector

app = Flask(__name__)
CORS(app)

#cnx = mysql.connector.connect(host='localhost', database='db_grad_cs_1917', user='root',password='ppp', port='3306')

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

@app.route('/anonymous_users_get')
def anonymous_users_get():
 
    cursor = cnx.cursor(buffered=True)
    query = ("SELECT * FROM anonymous_users")
    cursor.execute(query)
    r = [dict((cursor.description[i][0], str(value)) for i, value in enumerate(row)) for row in cursor.fetchall()]
    cursor.close()
    cnx.close()
    res = ''
    for s in r:
        res += str(s) + '\n'
    return res

@app.route('/anonymous_users_post')
def anonymous_users_post():
    cursor = cnx.cursor()
    cursor = cnx.cursor(buffered=True)
    query = ("INSERT INTO anonymous_users VALUES (%(anonymous_user_id)s, %(anonymous_user_pwd)s)")
    data = {
        "anonymous_user_id" : "1234567",
        "anonymous_user_pwd": "1234567"
    }
    cursor.execute(query, data)
    cursor.close()
    cnx.commit()
    cnx.close()
    return 'success'

@app.route('/login')
def login():

    cursor = mysql.connection.cursor()
    query = ("SELECT * FROM anonymous_users")
    data = {
        "anonymous_user_id" : "1234567",
        "anonymous_user_pwd": "1234567"
    }
    cursor.execute(query)
    mysql.connection.commit()
    r = [dict((cursor.description[i][0], str(value)) for i, value in enumerate(row)) for row in cursor.fetchall()]
    cursor.close()
    res = ''
    for s in r:
        res += str(s) + '\n'
    return res


def bootapp():
    #global rdd 
    #rdd = RandomDealData()
    #webServiceStream.bootServices()
    app.run(debug=True, port=8080, threaded=True, host=('0.0.0.0'))


if __name__ == "__main__":
      bootapp()
    
