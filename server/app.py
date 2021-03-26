from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from passlib.hash import sha256_crypt
import json

app = Flask(__name__)
app.config.from_pyfile('config.py')

mysql = MySQL(app)


@app.route('/ping', methods=['GET', 'POST'])
def index():
    print("Hello from frontend")
    obj = json.loads(request.data)
    print(obj['ping'])
    return jsonify({"message": "pong"})


@app.route('/api/forum/<string:label>', methods=['GET', 'POST'])
def forum(label):
    cur = mysql.connection.cursor()
    if request.method == 'GET':
        result = cur.execute(f'SELECT * FROM forum WHERE label = %s', [label])
        if result > 0:
            messages = cur.fetchall()
            print(messages)
            return jsonify({"messages": messages, "error_message": ""})
        else:
            return jsonify({"error_message": "No messages under this label"})

    if request.method == 'POST':
        pass


if __name__ == '__main__':
    app.run(debug=True)
