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

@app.route('/login', methods = ['POST'])
def login():
    content = request.get_json()
    
    #id = request.args.get()
    cursor = mysql.connection.cursor()
    
    data = {
        "anonymous_user_id" : content.name,
        "anonymous_user_pwd": content.password
    }

    query = ("SELECT * FROM anonymous_users WHERE anonymous_user_id = %s AND anonymous_user_pwd = %s", (data["anonymous_user_id"], data["anonymous_user_pwd"]))
    cursor.execute(query)
    #r = [dict((cursor.description[i][0], str(value)) for i, value in enumerate(row)) for row in cursor.fetchall()]
    mysql.connection.commit()
    cursor.close()
    if cursor.rowcount == 0:
        return None
    return 200


def bootapp():
    #global rdd 
    #rdd = RandomDealData()
    #webServiceStream.bootServices()
    app.run(debug=True, port=8080, threaded=True, host=('0.0.0.0'))


if __name__ == "__main__":
      bootapp()
    
