from flask import jsonify, request, session, make_response
from flask_app import app
from flask_cors import CORS
from flask_app.models.contact import Contact

CORS(app, supports_credentials=True)

#Load main dashboard
@app.route('/api/contacts/all/<int:user_id>', methods=['GET'])
def get_contacts(user_id): 
    all_contacts = Contact.get_all_with_latest_comm({'user_id': user_id})
    if not all_contacts: 
        response = make_response(jsonify({'message':'No contacts found'}), 204)
    else: 
        response = make_response(all_contacts)
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
    response.headers['Access-Control-Allow-Credentials'] = True
    return response

#Add new contact
@app.route('/api/contacts/create/<int:user_id>', methods=['POST'])
def create_contact(user_id):
    session['errors'] = []
    if not Contact.validate_contact(request.json): 
        return jsonify(session['errors']), 400
    data = {
        "firstName": request.json['firstName'],
        "lastName": request.json['lastName'],
        "role": request.json['role'],
        "email": request.json['email'],
        "phone": request.json['phone'],
        "linkedin": request.json['linkedin'],
        "preferred": request.json['preferred'],
        "user_id": user_id
    }
    session['contact_id'] = Contact.save(data)
    return jsonify({'contact_id': session['contact_id']})

# Contact details page
@app.route('/api/contacts/<int:contact_id>')
def get_one_contact(contact_id):
    contact_details = Contact.get_one(contact_id)
    response = make_response(contact_details)
    return response

# Get linkedin details
@app.route('/api/contacts/linkedin/<username>')
def linkedin(username): 
    data = Contact.get_linkedin(username)
    response = make_response(data)
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
    response.headers['Access-Control-Allow-Credentials'] = True
    return response

#Update contact details
@app.route('/api/contacts/update/<int:user_id>/<int:contact_id>', methods=['PATCH'])
def update_contact(user_id, contact_id):
    session['errors'] = []
    if not Contact.validate_contact(request.json): 
        return jsonify(session['errors']), 400
    data = {
        "id": contact_id,
        "firstName": request.json['firstName'],
        "lastName": request.json['lastName'],
        "role": request.json['role'],
        "email": request.json['email'],
        "phone": request.json['phone'],
        "linkedin": request.json['linkedin'],
        "preferred": request.json['preferred'],
        "user_id": user_id
    }
    Contact.update(data)
    return jsonify(success=True)

#Delete contact
@app.route('/api/contacts/delete/<int:contact_id>', methods=['DELETE'])
def delete_contact(contact_id):
    Contact.delete(contact_id)
    return jsonify(success=True)