import time
from flask import Flask, Response
from flask_cors import CORS
import numpy, random
from datetime import datetime, timedelta
import json
from RandomDealData import *

app = Flask(__name__)
CORS(app)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'ppp'
app.config['MYSQL_DB'] = 'db_grad_cs_1917'
app.config['MYSQL_DATABASE_PORT'] = '3306'

mysql = MySQL(app)

def index():
    return "Data Generator is running..."

def testservice():
    rdd = RandomDealData()
    deal = rdd.createRandomData( rdd.createInstrumentList() )
    return Response( deal, status=200, mimetype='application/json')

def stream():
    rdd = RandomDealData()
    instrList = rdd.createInstrumentList()
    cursor = mysql.connection.cursor()
    def eventStream():
        while True:
            data = rdd.createRandomData(instrList)
            yield data + "\n"
            query = "SELECT * FROM anonymous_users WHERE anonymous_user_id = \"{0}\" AND anonymous_user_pwd = \"{1}\"".format(data["anonymous_user_id"], data["anonymous_user_pwd"])
            cursor.execute(query)
            mysql.connection.commit()
            cursor.close()
    return Response(eventStream(), status=200, mimetype="text/event-stream")

def sse_stream():
    theHeaders = {"X-Accel-Buffering": "False"}
    rdd = RandomDealData()
    instrList = rdd.createInstrumentList()
    def eventStream():
        while True:
            #nonlocal instrList
            yield 'data:{}\n\n'.format(rdd.createRandomData(instrList))
    resp = Response(eventStream(), status=200, mimetype="text/event-stream")
    resp.headers["X-Accel-Buffering"] = "False"
    return resp


def get_time():
    """this could be any function that blocks until data is ready"""
    time.sleep(1.0)
    s = time.ctime(time.time())
    return s


