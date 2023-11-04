from flask import request, session, jsonify, make_response
from flask_app import app
from flask_cors import CORS
from flask_app.models.comm import Comm

CORS(app, supports_credentials=True)

#Load comms table
@app.route('/api/comms/all/<int:contact_id>', methods=['GET'])
def get_comms(contact_id):
    all_comms = Comm.get_all_for_contact({'contact_id': contact_id})
    if not all_comms: 
        response = make_response(jsonify({'message':'No communication history found'}), 204)
    else: 
        response = make_response(all_comms)
    return response

#Add new comm
@app.route('/api/comms/create/<int:contact_id>', methods=['POST'])
def create_comm(contact_id): 
    session['errors'] = []
    if (not Comm.validate_comm(request.json)):
        return jsonify(session['errors']), 400
    data = {
        "commsDate": request.json['commsDate'],
        "channel": request.json['channel'],
        "company": request.json['company'],
        "status": request.json['status'],
        "summary": request.json['summary'],
        "contact_id": contact_id
    }
    session['comm_id'] = Comm.save(data)
    return jsonify({"id": session['comm_id']})

#Comms details for updating 
@app.route('/api/comms/<int:comm_id>')
def get_one_comm(comm_id):
    comm_details = Comm.get_one(comm_id)
    response = make_response(comm_details)
    return response

#Update comm record details
@app.route('/api/comms/update/<int:contact_id>/<int:comm_id>', methods=['PATCH'])
def update_comm(contact_id, comm_id):
    session['errors'] = []
    if not Comm.validate_comm(request.json): 
        return jsonify(session['errors']), 400
    data = {
        "id": comm_id,
        "commsDate": request.json['commsDate'],
        "channel": request.json['channel'],
        "company": request.json['company'],
        "status": request.json['status'],
        "summary": request.json['summary'],
        "contact_id": contact_id
    }
    Comm.update(data)
    return jsonify(success=True)

#Delete comm record
@app.route('/api/comms/delete/<int:comms_id>', methods=['DELETE'])
def delete_comm(comms_id):
    Comm.delete(comms_id)
    return jsonify(success=True)