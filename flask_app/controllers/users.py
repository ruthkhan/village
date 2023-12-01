from flask import request, jsonify, make_response, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_app import app
from flask_app.models.user import User 
from flask_app.models.contact import Contact

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)

#Register User 
@app.route('/api/users/create', methods=['POST'])
def create_user():
    session['errors'] = []
    repeat_user = False
    if (User.get_by_email({'email':request.json['email']}) != False): 
        session['errors'] += {"Email has already been registered"}
        repeat_user = True
    if (not User.validate_user(request.json) or repeat_user or not User.validate_password(request.json)):
        return jsonify(session['errors']), 409
    pw_hash = bcrypt.generate_password_hash(request.json['password'])
    data = {
        "firstName": request.json['firstName'],
        "lastName": request.json['lastName'],
        "email": request.json['email'],
        "password": pw_hash
    }
    session['user_id'] = User.save(data)
    response = make_response({
        'id': session['user_id'],
        'firstName': request.json['firstName'],
        'lastName': request.json['lastName'], 
        'email': request.json['email']})
    response.headers = [{'Access-Control-Allow-Origin': 'http://localhost:5173/', 
        'Access-Control-Allow-Credentials': True}]
    return response

#Login User 
@app.route('/api/users/login', methods=['POST'])
def login():
    data = { "email" : request.json["email"] }
    user_in_db = User.get_by_email(data)
    if not user_in_db:
        return jsonify({'error': "Invalid Email/Password"}), 401
    if not bcrypt.check_password_hash(user_in_db.password, request.json['password']):
        return jsonify({'error': "Invalid Email/Password"}), 401
    response = make_response(jsonify({
        'id': user_in_db.id,
        'firstName': user_in_db.firstName,
        'lastName': user_in_db.lastName, 
        'email': user_in_db.email}), 200)
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
    response.headers['Access-Control-Allow-Credentials'] = True
    return response

#Update User 
@app.route('/api/users/<int:user_id>', methods=['PATCH'])
def update_user(user_id):
    session['errors'] = []
    repeat_user = False
    repeated_user = User.get_by_email({'email':request.json['email']})
    if (repeated_user != False): 
        if (repeated_user.id != user_id):
            session['errors'] += {"Email has already been registered"}
            repeat_user = True
    if (not User.validate_user(request.json) or repeat_user):
        return jsonify(session['errors']), 409
    data = {
        "id": user_id,
        "firstName": request.json['firstName'],
        "lastName": request.json['lastName'],
        "email": request.json['email'],
    }
    User.update(data)
    response = make_response({
        'id': user_id,
        'firstName': request.json['firstName'],
        'lastName': request.json['lastName'], 
        'email': request.json['email']})
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
    response.headers['Access-Control-Allow-Credentials'] = True
    return response