from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from passlib.hash import sha256_crypt
import json
from flask_mail import Mail, Message

app = Flask(__name__)
app.config.from_pyfile('config.py')

mysql = MySQL(app)
mail = Mail(app)


@app.route('/ping', methods=['GET', 'POST'])
def index():
    print("Hello from frontend")
    obj = json.loads(request.data)
    print(obj['ping'])
    return jsonify({"message": "pong"})


@app.route('/api/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        obj = json.loads(request.data)
        username = obj['username']
        email = obj['email']
        phone_number = obj['phone_number']
        password = sha256_crypt.encrypt(str(obj['password']))

        cur = mysql.connection.cursor()
        result = cur.execute(
            'SELECT username FROM users WHERE username=%s', [username])
        if result > 0:
            return jsonify({"error_message": "The entered username has already been taken"})
        else:
            cur.execute(
                'INSERT INTO users (username, email, password, phone_number, updated_timestamp) values(%s, %s, %s, %s, NOW())', (username, email, password, phone_number))
            mysql.connection.commit()
            cur.close()
            return jsonify({"error_message": ""})


@app.route('/api/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        obj = json.loads(request.data)
        username = obj['username']
        password_input = obj['password']

        cur = mysql.connection.cursor()

        result = cur.execute(
            "SELECT * FROM users WHERE username = %s", [username])

        if result > 0:
            user = cur.fetchone()
            user_id = user['id']
            password = user['password']
            email = user['email']

            if sha256_crypt.verify(password_input, password):
                return jsonify({"error_message": "", "user_id": user_id, "username": username, "email": email})
            else:
                return jsonify({"error_message": "Password is incorrect. Please try again"})
        else:
            return jsonify({"error_message": f"User with username '{username}' does not exist. Sign Up if you haven't registered"})


@app.route('/api/forums', methods=['GET', 'POST'])
def forums():
    cur = mysql.connection.cursor()
    if request.method == 'GET':
        result = cur.execute('SELECT * FROM forum ORDER BY id desc')
        if result > 0:
            messages = cur.fetchall()
            return jsonify({"messages": messages, "error_message": ""})
        else:
            return jsonify({"error_message": "No messages under this label"})

    if request.method == 'POST':
        obj = json.loads(request.data)
        user_id = obj['user_id']
        username = obj['username']
        message = obj['message']
        label = obj['label']
        result = cur.execute(
            'INSERT INTO forum(user_id, username, message, label, updated_timestamp) VALUES (%s, %s, %s, %s, NOW())', (user_id, username, message, label))

        mysql.connection.commit()
        cur.close()

        return jsonify({"error_message": ""})


@app.route('/api/forum/<string:label>', methods=['GET', 'POST'])
def forumLabel(label):
    cur = mysql.connection.cursor()
    if request.method == 'GET':
        result = cur.execute('SELECT * FROM forum WHERE label = %s ORDER BY id desc' , [label])
        if result > 0:
            messages = cur.fetchall()
            return jsonify({"messages": messages, "error_message": ""})
        else:
            return jsonify({"error_message": "No messages under this label"})

    if request.method == 'POST':
        obj = json.loads(request.data)
        user_id = obj['user_id']
        username = obj['username']
        message = obj['message']
        label = obj['label']
        result = cur.execute(
            'INSERT INTO forum(user_id, username, message, label, updated_timestamp) VALUES (%s, %s, %s, %s, NOW())', (user_id, username, message, label))

        mysql.connection.commit()
        cur.close()

        return jsonify({"error_message": ""})


@app.route('/api/restricted_urls', methods=['GET'])
def restricted_urls():
    cur = mysql.connection.cursor()
    if request.method == 'GET':
        result = cur.execute('SELECT * FROM restricted_urls ORDER BY id desc')
        if result > 0:
            restricted_urls = cur.fetchall()
            return jsonify({"restricted_urls": restricted_urls, "error_message": ""})
        else:
            return jsonify({"error_message": "No restricted urls added yet"})


@app.route('/api/restricted_url/<string:id>', methods=['GET', 'POST', 'DELETE'])
def restricted_url(id):
    cur = mysql.connection.cursor()

    if request.method == 'GET':
        result = cur.execute(
            'SELECT * FROM restricted_urls where user_id = %s ORDER BY id desc', [id])
        if result > 0:
            restricted_urls = cur.fetchall()
            return jsonify({"restricted_urls": restricted_urls, "error_message": ""})
        else:
            return jsonify({"error_message": "No restricted urls added yet"})

    if request.method == 'POST':
        obj = json.loads(request.data)
        url = obj['url']
        user_id = obj['user_id']
        result = cur.execute(
            'INSERT INTO restricted_urls(url, updated_timestamp, user_id) VALUES (%s, NOW(), %s)', (url, user_id))

        mysql.connection.commit()
        cur.close()

        return jsonify({"error_message": ""})

    if request.method == 'DELETE':
        cur.execute('DELETE FROM restricted_urls WHERE id = %s', [id])
        mysql.connection.commit()
        cur.close()
        return jsonify({"error_message": ""})


@app.route('/api/history', methods=['GET', 'POST'])
def history():
    cur = mysql.connection.cursor()
    if request.method == 'GET':
        result = cur.execute('SELECT * FROM urls ORDER BY id desc')
        if result > 0:
            urls = cur.fetchall()
            return jsonify({"urls": urls, "error_message": ""})
        else:
            return jsonify({"error_message": "No restricted urls added yet"})

    if request.method == "POST":
        obj = json.loads(request.data)
        url = obj['url']
        time_spent = obj['time_spent']
        restricted = obj['restricted']
        result = cur.execute(
            'INSERT INTO urls(url, restricted, time_spent, updated_timestamp) VALUES (%s, %s, %s, NOW())', (url, restricted, time_spent))

        mysql.connection.commit()
        cur.close()

        return jsonify({"error_message": ""})


@app.route('/api/sendemail', methods=['GET', 'POST'])
def sendMail():
    if request.method == "POST":
        obj = json.loads(request.data)
        url = obj['url']
        timestamp = obj['timestamp']
        email = obj['email']
        msg = Message('Child Browsing Activity', sender='noreply@demo.com', recipients=[
                      email])
        msg.body = f"Your child is accessing a website \"{url}\" marked restricted by you at {timestamp}"
        mail.send(msg)

        return jsonify({"error_message": ""})


if __name__ == '__main__':
    app.run(debug=True)
