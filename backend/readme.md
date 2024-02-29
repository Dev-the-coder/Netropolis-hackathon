# Netropolis Community Backend Detailed Documentation

## ComManager Endpoints

### Get User Details
#### `GET /commanager/getuser/`
Retrieves details of the authenticated Community Manager.

- **Method:** GET
- **Parameters:**
  - `Authorization` (header) - Required: true, Type: string
- **Responses:**
  - 200: Success
    - Schema:
      ```json
      {
        "name": "string",
        "dob": "string",
        "gender": "string",
        "location": "string",
        "area": "string",
        "email": "string"
      }
      ```
  - 400: Bad Request

### User Login
#### `POST /commanager/login/`
Logs in a Community Manager.

- **Method:** POST
- **Parameters:**
  - `data` (body) - Required: true
    - Schema:
      ```json
      {
        "email": "string",
        "password": "string"
      }
      ```
- **Responses:**
  - 200: OK
  - 400: Bad Request

### Get Community Manager's Quests
#### `GET /commanager/myquests/`
Retrieves all quests created by the authenticated Community Manager.

- **Method:** GET
- **Parameters:**
  - `Authorization` (header) - Required: true, Type: string
- **Responses:**
  - 200: Success
    - Schema:
      ```json
      {
        "quests": [
          {
            "id": 1,
            "active": "string",
            "datetime": "string",
            "location": "string",
            "provided_by": "string",
            "title": "string",
            "duration": "string",
            "description": "string",
            "points": 0,
            "fee": 0,
            "allowance": "string",
            "tags": "string",
            "comManagerId": 0
          }
        ]
      }
      ```
  - 400: Bad Request

### Register Community Manager
#### `POST /commanager/register/`
Registers a new Community Manager.

- **Method:** POST
- **Parameters:**
  - `data` (body) - Required: true
    - Schema:
      ```json
      {
        "name": "string",
        "dob": "string",
        "gender": "string",
        "location": "string",
        "area": "string",
        "email": "string",
        "password": "string"
      }
      ```
- **Responses:**
  - 201: Created
  - 400: Bad Request

## Quest Endpoints

### Get All Quests
#### `GET /quest/all/`
Retrieves all quests available in the system.

- **Method:** GET
- **Responses:**
  - 200: Success
    - Schema:
      ```json
      {
        "quests": [
          {
            "id": 1,
            "active": "string",
            "datetime": "string",
            "location": "string",
            "provided_by": "string",
            "title": "string",
            "duration": "string",
            "description": "string",
            "points": 0,
            "fee": 0,
            "allowance": "string",
            "tags": "string",
            "comManagerId": 0
          }
        ]
      }
      ```
  - 400: Bad Request

### Create Quest
#### `POST /quest/create/`
Creates a new quest. Accessible only to community managers.

- **Method:** POST
- **Parameters:**
  - `data` (body) - Required: true
    - Schema:
      ```json
      {
        "active": "string",
        "datetime": "string",
        "location": "string",
        "provided_by": "string",
        "title": "string",
        "duration": "string",
        "description": "string",
        "points": 0,
        "fee": 0,
        "allowance": "string",
        "tags": "string"
      }
      ```
  - `Authorization` (header) - Required: true, Type: string
- **Responses:**
  - 201: Created
  - 400: Bad Request

### Update Quest Status
#### `PUT /quest/questaction/`
Updates the status of a quest request. Accessible only to community managers.

- **Method:** PUT
- **Parameters:**
  - `data` (body) - Required: true
    - Schema:
      ```json
      {
        "status": "string",
        "quest_id": 0,
        "user_id": 0
      }
      ```
  - `Authorization` (header) - Required: true, Type: string
- **Responses:**
  - 200: OK
  - 400: Bad Request

### Register for Quest
#### `POST /quest/register/`
Registers a user for a quest.

- **Method:** POST
- **Parameters:**
  - `data` (body) - Required: true
    - Schema:
      ```json
      {
        "quest_id": 0
      }
      ```
  - `Authorization` (header) - Required: true, Type: string
- **Responses:**
  - 200: OK
  - 400: Bad Request

### Get Quest Requests
#### `GET /quest/requests/{id}/`
Retrieves all requests for a specific quest. Accessible only to community managers.

- **Method:** GET
- **Parameters:**
  - `Authorization` (header) - Required: true, Type: string
  - `id` (path) - Required: true, Type: string
- **Responses:**
  - 200: Success
    - Schema:
      ```json
      {
        "requests": [
          {
            "accepted": "string",
            "user_id": "string",
            "username": "string",
            "email": "string",
            "persona": "string",
            "points": "string",
            "field_of_specialization": "string",
            "completed_quest_tags": "string"
          }
        ]
      }
      ```
  - 400: Bad Request

## Search Endpoints

### Deep Search for Quests
#### `POST /search/deepSearch/`
Performs a deep search for quests.

- **Method:** POST
- **Parameters:**
  - `data` (body) - Required: true
    - Schema:
      ```json
      {
        "phrase": "string"
      }
      ```
- **Responses:**
  - 201: Success
    - Schema:
      ```json
      {
        "quests": [
          {
            "id": 1,
            "active": "string",
            "datetime": "string",
            "location": "string",
            "provided_by": "string",
            "title": "string",
            "duration": "string",
            "description": "string",
            "points": 0,
            "fee": 0,
            "allowance": "string",
            "tags": "string",
            "comManagerId": 0
          }
        ]
      }
      ```
  - 400: Bad Request

### Get All Tags
#### `GET /search/getTags/`
Retrieves all tags available in the system.

- **Method:** GET
- **Responses:**
  - 201: Success
    - Schema:
      ```json
      {
        "tags": ["string"]
      }
      ```
  - 400: Bad Request

### Search Quests by Tags
#### `GET /search/searchByTags/`
Searches quests by tags.

- **Method:** GET
- **Parameters:**
  - `tags` (query) - Required: true, Type: string
- **Responses:**
  - 201: Success
    - Schema:
      ```json
      {
        "quests": [
          {
            "id": 1,
            "active": "string",
            "datetime": "string",
            "location": "string",
            "provided_by": "string",
            "title": "string",
            "duration": "string",
            "description": "string",
            "points": 0,
            "fee": 0,
            "allowance": "string",
            "tags": "string",
            "comManagerId": 0
          }
        ]
      }
      ```
  - 400: Bad Request

### Suggest Quests to Users
#### `GET /search/suggested/`
Suggests quests to users based on their personality and completed quest tags.

- **Method:** GET
- **Parameters:**
  - `Authorization` (header) - Required: true, Type: string
- **Responses:**
  - 201: Success
    - Schema:
      ```json
      {
        "quests": [
          {
            "id": 1,
            "active": "string",
            "datetime": "string",
            "location": "string",
            "provided_by": "string",
            "title": "string",
            "duration": "string",
            "description": "string",
            "points": 0,
            "fee": 0,
            "allowance": "string",
            "tags": "string",
            "comManagerId": 0
          }
        ]
      }
      ```
  - 400: Bad Request

## User Endpoints

### Get User Details
#### `GET /users/getuser`
Retrieves details of the authenticated User.

- **Method:** GET
- **Parameters:**
  - `Authorization` (header) - Required: true, Type: string
- **Responses:**
  - 201: Success
    - Schema:
      ```json
      {
        "name": "string",
        "dob": "string",
        "gender": "string",
        "persona": "string",
        "location": "string",
        "field_of_specialization": "string",
        "email": "string",
        "completed_quest_tags": "string",
        "active_quest": true,
        "points": 0
      }
      ```
  - 400: Bad Request

### User Login
#### `POST /users/login`
Logs in a User.

- **Method:** POST
- **Parameters:**
  - `data` (body) - Required: true
    - Schema:
      ```json
      {
        "email": "string",
        "password": "string"
      }
      ```
- **Responses:**
  - 201: Created
  - 400: Bad Request

### User Registration
#### `POST /users/register`
Registers a new User.

- **Method:** POST
- **Parameters:**
  - `data` (body) - Required: true
    - Schema:
      ```json
      {
        "name": "string",
        "dob": "string",
        "gender": "string",
        "persona": "string",
        "location": "string",
        "field_of_specialization": "string",
        "email": "string",
        "password": "string",
        "completed_quest_tags": "string",
        "active_quest": true,
        "points": 0
      }
      ```
- **Responses:**
  - 201: Created
  - 400: Bad Request
