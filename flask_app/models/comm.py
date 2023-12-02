from datetime import datetime
from flask import jsonify, session
from flask_app.config.mysqlconnection import connectToMySQL
from flask_app.models import contact

class Comm:
    DB = 'village'

    def __init__( self , data ):
        self.id = data['id']
        self.commsDate = data['commsDate']
        self.channel = data['channel']
        self.company = data['company']
        self.status = data['status']
        self.summary = data['summary']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        self.contact_id = data['contact_id']

    @classmethod
    def save(cls, data):
        query = """ 
            INSERT INTO comms (commsDate, channel, company, status, summary, contact_id) 
            VALUES (%(commsDate)s, %(channel)s, %(company)s, %(status)s, %(summary)s, %(contact_id)s);
            """
        return connectToMySQL(cls.DB).query_db(query, data)

    @classmethod
    def get_all_for_contact(cls, data):
        query = """ SELECT * FROM comms 
            WHERE contact_id = %(contact_id)s
            ORDER BY commsDate DESC;"""
        results = connectToMySQL(cls.DB).query_db(query, data)
        if results: 
            results = Comm.convert_date(results)
            return results
        return False

    @classmethod
    def get_one(cls, id):
        query  = "SELECT * FROM comms WHERE id = %(id)s;"
        data = {'id': id}
        results = connectToMySQL(cls.DB).query_db(query, data)
        results = Comm.convert_date(results)
        return results[0]

    @classmethod
    def update(cls, data):
        query = """UPDATE comms 
                SET commsDate=%(commsDate)s, channel=%(channel)s, company=%(company)s, status=%(status)s, summary=%(summary)s
                WHERE id = %(id)s;"""
        return connectToMySQL(cls.DB).query_db(query,data)
        
    @classmethod
    def delete(cls, id):
        query  = "DELETE FROM comms WHERE id = %(id)s;"
        data = {"id": id}
        return connectToMySQL(cls.DB).query_db(query, data)

    @staticmethod
    def validate_comm(comm): 
        is_valid = True
        if not comm['commsDate']: 
            session['errors'] += {"Please enter the date of this communication"}
            is_valid = False
        if len(comm['company']) < 2: 
            session['errors'] += {"Company must be at least 2 characters"}
            is_valid = False
        return is_valid

    @staticmethod 
    def convert_date(results): 
        for row in results: 
            row['commsDate'] = row['commsDate'].strftime("%Y-%m-%d")
        return results