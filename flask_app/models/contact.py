import re
from flask import session
from flask_app.config.mysqlconnection import connectToMySQL
from flask_app.models import user, comm

class Contact:
    DB = 'village'

    def __init__(self, data):
        self.id = data['id']
        self.firstName = data['firstName']
        self.lastName = data['lastName']
        self.role = data['role']
        self.email = data['email']
        self.phone = data['phone']
        self.linkedin = data['linkedin']
        self.headline = data['headline']
        self.photo = data['photo']
        self.preferred = data['preferred']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        self.user_id = data['user_id']
        # self.comms = []

    @classmethod
    def save(cls, data):
        query = """ 
            INSERT INTO contacts (firstName, lastName, role, email, phone, linkedin, preferred, user_id) 
            VALUES (%(firstName)s, %(lastName)s, %(role)s, %(email)s, %(phone)s, %(linkedin)s, %(preferred)s, %(user_id)s);
            """
        return connectToMySQL(cls.DB).query_db(query, data)
    
    @classmethod
    def get_all_with_latest_comm(cls, data): 
        query = """
            SELECT con.id AS contactId, firstName, lastName, headline, commsDate, com.channel AS commsChannel, com.company AS commsCompany, com.status AS commsStatus 
            FROM contacts con
            LEFT JOIN comms com ON com.contact_id = con.id 
            AND commsDate = (SELECT MAX(commsDate) FROM comms WHERE contact_id = con.id)
            WHERE user_id = %(user_id)s 
            ORDER BY commsDate DESC;
            """
        results = connectToMySQL(cls.DB).query_db(query, data)
        print(results)
        if results: 
            print(results)
            results = Contact.convert_date(results)
            return results
        return False

    @classmethod
    def get_one(cls, id):
        query  = "SELECT * FROM contacts WHERE id = %(id)s;"
        data = {'id': id}
        results = connectToMySQL(cls.DB).query_db(query, data)
        return results[0]

    @classmethod
    def get_linkedin(cls, data): 
        query = """UPDATE contacts
            SET headline=%(headline)s, photo=%(photo)s
            WHERE id=%(id)s;"""
        return connectToMySQL(cls.DB).query_db(query, data)

    @classmethod
    def update(cls, data):
        query = """UPDATE contacts 
                SET firstName=%(firstName)s, lastName=%(lastName)s, role=%(role)s, email=%(email)s, phone=%(phone)s, linkedin=%(linkedin)s, preferred=%(preferred)s, user_id=%(user_id)s 
                WHERE id = %(id)s;"""
        return connectToMySQL(cls.DB).query_db(query,data)

    @classmethod
    def delete(cls, id):
        query  = "DELETE FROM contacts WHERE id = %(id)s;"
        data = {"id": id}
        return connectToMySQL(cls.DB).query_db(query, data)
    
    @staticmethod
    def validate_contact(contact): 
        EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
        is_valid = True
        if len(contact['firstName']) < 2: 
            session['errors'] += {"First Name must be at least 2 characters"}
            is_valid = False
        if len(contact['lastName']) < 2: 
            session['errors'] += {"Last Name must be at least 2 characters"}
            is_valid = False
        if not contact['email'] and not contact['phone'] and not contact['linkedin']: 
            session['errors'] +={"At least 1 piece of contact info must be provided"}
            is_valid = False
        if contact['email'] and not EMAIL_REGEX.match(contact['email']):
            session['errors'] += {"Invalid email address"}
            is_valid = False
        if contact['phone'] and len(contact['phone']) < 7: 
            session['errors'] += {"Phone number must be at least 7 digits"}
            is_valid = False
        if contact['linkedin'] and len(contact['linkedin']) < 2:
            session['errors'] += {"Linkedin username must have at least 2 characters"}
            is_valid = False
        return is_valid

    @staticmethod 
    def convert_date(results): 
        for row in results: 
            if row['commsDate']: 
                row['commsDate'] = row['commsDate'].strftime("%Y-%m-%d")
        return results