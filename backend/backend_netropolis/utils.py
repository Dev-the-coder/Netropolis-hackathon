import jwt
from dotenv import load_dotenv
import os
from datetime import datetime, timedelta

load_dotenv()
SECRET_KEY = os.getenv('SECRET_KEY')
def create_token(email, role="user"):
    payload = {
        'email': email,
        'role': role,
        'exp': datetime.utcnow() + timedelta(days=1),
        'iat': datetime.utcnow(),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')

def decode_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return {"error": "Token has expired"}
