import os

DEBUG = True
TESTING = False
MYSQL_HOST = 'localhost'
MYSQL_USER = 'root'
MYSQL_PASSWORD = os.getenv('MYSQL_PWD')
MYSQL_DB = 'focus'
MYSQL_CURSORCLASS = 'DictCursor'
SECRET_KEY = 'your_secret_key'
MAIL_SERVER = 'smtp.googlemail.com'
MAIL_PORT = 465
MAIL_USE_TLS = False
MAIL_USE_SSL = True
MAIL_USERNAME = os.environ.get('EMAIL_USER')
MAIL_PASSWORD = os.environ.get('EMAIL_PASS')
