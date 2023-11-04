import re
from flask import session
from flask_app.config.mysqlconnection import connectToMySQL

class User:
    DB = "village"

    def __init__(self, data):
        self.id = data['id']
        self.firstName = data['firstName']
        self.lastName = data['lastName']
        self.email = data['email']
        self.password = data['password']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        self.contacts = []

    @classmethod
    def save(cls, data):
        query = """ 
            INSERT INTO users (firstName, lastName, email, password) 
            VALUES (%(firstName)s, %(lastName)s, %(email)s, %(password)s);
            """
        return connectToMySQL(cls.DB).query_db(query, data)

    @classmethod
    def get_by_email(cls, data):
        query = "SELECT * FROM users WHERE email = %(email)s;"
        result = connectToMySQL(cls.DB).query_db(query, data)
        if not result:
            return False
        return cls(result[0])

    @staticmethod
    def validate_user(user): 
        EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
        is_valid = True
        if len(user['firstName']) < 2: 
            session['errors'] += {"First Name must be at least 2 characters"}
            is_valid = False
        if len(user['lastName']) < 2: 
            session['errors'] += {"Last Name must be at least 2 characters"}
            is_valid = False
        if not EMAIL_REGEX.match(user['email']):
            session['errors'] += {"Invalid email address"}
            is_valid = False
        if len(user['password']) < 8: 
            session['errors'] += {"Password must be at least 8 characters"}
            is_valid = False
        if user['cfmPassword'] != user['password']:
            session['errors'] += {"Does not match password"}
            is_valid = False
        return is_valid
