import json
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
        return jsonify(-1)
    return jsonify(1)


@app.route('/average', methods = ['GET'])
def average():
    date_from = request.args.get('date_from')
    date_to = request.args.get('date_to')
    
    cursor = mysql.connection.cursor()
    query = '''select deal_instrument_id, deal_type, sum(deal_amount * deal_quantity) / sum(deal_quantity) as average
    from deal
    where DATE(deal_time) between DATE("{0}") and DATE("{1}")
    group by deal_instrument_id, deal_type
    order by deal_instrument_id'''.format(date_from, date_to)

    cursor.execute(query)
    r = [dict((cursor.description[i][0], str(value)) for i, value in enumerate(row)) for row in cursor.fetchall()]
    mysql.connection.commit()
    cursor.close()

    if cursor.rowcount == 0:
        return jsonify(-1)
    return jsonify(r)

@app.route('/positions', methods = ['GET'])
def positions(dealer = None):
    dealer_id = request.args.get('dealer_id')
    
    cursor = mysql.connection.cursor()
    query = '''select buy.deal_instrument_id, sum(buy.deal_quantity) - sell.quan as position from deal as buy
                join (
                    select sum(deal_quantity) as quan, deal_instrument_id from deal
                    where deal_type = 'S'
                    and deal_counterparty_id = {0}
                    group by deal_instrument_id
                ) sell on sell.deal_instrument_id = buy.deal_instrument_id
                where buy.deal_type = 'B'
                and buy.deal_counterparty_id = {0}
                group by buy.deal_instrument_id
                order by buy.deal_instrument_id;'''.format(dealer if dealer else dealer_id)

    cursor.execute(query)
    r = [dict((cursor.description[i][0], str(value)) for i, value in enumerate(row)) for row in cursor.fetchall()]
    mysql.connection.commit()
    cursor.close()

    if cursor.rowcount == 0:
        return jsonify(-1)
    return jsonify(r)

@app.route('/realised_pnl', methods = ['GET'])
def realised_pnl(dealer = None):
    dealer_id = request.args.get('dealer_id')
    
    cursor = mysql.connection.cursor()
    query = '''select buy.deal_instrument_id, sum(buy.deal_quantity * buy.deal_amount) - sell.quan as realised_PnL from deal as buy
                join (
                    select sum(deal_quantity * deal_amount) as quan, deal_instrument_id from deal
                    where deal_type = 'S'
                    and deal_counterparty_id = {0}
                    group by deal_instrument_id
                ) sell on sell.deal_instrument_id = buy.deal_instrument_id
                where buy.deal_type = 'B'
                and buy.deal_counterparty_id = {0}
                group by buy.deal_instrument_id
                order by buy.deal_instrument_id;'''.format(dealer if dealer else dealer_id)

    cursor.execute(query)
    r = [dict((cursor.description[i][0], str(value)) for i, value in enumerate(row)) for row in cursor.fetchall()]
    mysql.connection.commit()
    cursor.close()

    if cursor.rowcount == 0:
        return jsonify(-1)
    return jsonify(r)

#key: instrument, value: balance - positions * current_price
@app.route('/effective_pnl', methods = ['GET'])
def effective_pnl():
    dealer_id = request.args.get('dealer_id')
    pos = positions(dealer_id).get_json()
    bal = realised_pnl(dealer_id).get_json()
    cursor = mysql.connection.cursor()
    query = '''select tm.deal_instrument_id, tm.deal_time, avg(tm.deal_amount) as price from deal tm
join (
	select deal_instrument_id, max(deal_time) as time from deal
    where deal_counterparty_id = {0}
    group by deal_instrument_id
) pr on pr.deal_instrument_id = tm.deal_instrument_id and pr.time = tm.deal_time
group by tm.deal_instrument_id, tm.deal_time
order by tm.deal_instrument_id;'''.format(dealer_id)
    cursor.execute(query)
    price = [dict((cursor.description[i][0], str(value)) for i, value in enumerate(row)) for row in cursor.fetchall()]
    mysql.connection.commit()
    cursor.close()
    res = []

    for i in range(len(bal)):
        res.append({"dealer_instrument_id" : bal[i]['deal_instrument_id'], "effective_pnl" : float(bal[i]['realised_PnL']) - float(pos[i]['position']) * float(price[i]['price'])})

    if cursor.rowcount == 0:
        return jsonify(-1)
    return jsonify(res)





def bootapp():
    #global rdd 
    #rdd = RandomDealData()
    #webServiceStream.bootServices()
    app.run(debug=True, port=8080, threaded=True, host=('0.0.0.0'))


if __name__ == "__main__":
      bootapp()
    
