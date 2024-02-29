# Netropolis Community Documentation

## Motive

The Netropolis Community project aims to address the challenges stemming from Japan's unique demographic landscape characterized by an aging population and declining birthrate. As a consequence of this demographic shift, local cities are witnessing depopulation, leading to a dwindling workforce. This trend poses a significant threat to the maintenance of local economies, cultures, and histories, particularly in rural areas where labor scarcity is acute. Netropolis seeks to tackle this challenge by attracting individuals from outside the region to contribute to local communities and revitalize their economy, culture, and heritage.

## Goal

The overarching goal of the Netropolis Community project is to develop a comprehensive matching platform that facilitates the connection between local labor shortages and individuals interested in experiencing and contributing to the local community. The platform is designed to emulate the immersive experience of an RPG game, where users can explore quests and activities tailored to their interests while simultaneously addressing local labor needs. Specific objectives include:

- Proposing functions to build a matching platform that effectively pairs local labor shortage tasks with users seeking immersive local experiences.
- Providing users with opportunities to engage enthusiastically and actively with the local community through a diverse range of quests and experiences.
- Creating stay packages on the platform that bundle together various experiences (quests), leisure activities, local events, and opportunities to contribute to the local economy.
- Matching users from outside the region with quests and tasks that align with their interests, preferences, and skill sets.



## Setup

### Access URLs

- Frontend: [Netropolis Community Frontend](https://netropolis-community.vercel.app/)
- Backend: [Netropolis Community Backend](https://netropolis-backend.vercel.app/)

### Installation Instructions

1. **Clone Repository**:
   '''git clone https://github.com/Pranay-Pandey/Netropolis-hackathon.git```

#### Frontend (React)

2. **Navigate to Project Directory**:
   ```cd frontend```

4. **Install Dependencies**:
   ```npm install```

5. **Start Development Server**:
   ```npm start```

This will start the development server and launch the frontend application in your default web browser.

#### Backend (Django)

2. **Navigate to Project Directory**:
   ```cd backend```
4. **Create Virtual Environment**:
   ``` python -m venv venv```
5. **Activate Virtual Environment**:
- On Windows:```
  venv\Scripts\activate```
- On macOS and Linux:```
  source venv/bin/activate```
5. **Install Dependencies**:
  ``` pip install -r requirements.txt```
6. **Define Environment Variables**:
Create a file named `.env` in the backend directory and specify the following variables:
  ```
  SECRET_KEY = your_secret_key
  DB_ENGINE = your_database_engine
  DB_NAME = your_database_name
  DB_USER = your_database_user
  DB_PASSWORD = your_database_password
  DB_HOST = your_database_host
  DB_PORT = your_database_port
  ENV = your_environment (e.g., dev, prod)
  OPENAI_API_KEY = your_openai_api_key
  ```

8. **Run Migrations**:
   ```python manage.py migrate```
10. **Start Django Server**:
    ```python manage.py runserver```





## Technical Aspect

### Flow

#### Community Manager

Community managers play a pivotal role in the Netropolis ecosystem by facilitating the coordination between localities and users. The workflow involves the following steps:

1. **Task Identification:** Community managers interact with localities to identify tasks and quests essential for addressing labor shortages and promoting community engagement.
2. **Quest Definition:** Once tasks are identified, community managers define the scope, duration, rewards, and pricing for each quest.
3. **Quest Registration:** Community managers register quests on the platform, making them available for users to apply.
4. **User Interaction:** Community managers review and manage user applications for quests, including accepting, rejecting, or marking quests as completed.

#### User

Users are the driving force behind the Netropolis Community project, actively seeking and participating in quests and experiences. The user workflow is as follows:

1. **Quest Exploration:** Users browse available quests on the platform, exploring detailed descriptions and requirements for each quest.
2. **Quest Registration:** Users register for quests of interest, expressing their willingness to participate and contribute.
3. **Application Review:** Community managers review user applications for quests, determining acceptance based on criteria such as suitability and availability.
4. **Quest Participation:** Upon acceptance, users actively participate in the quest, completing tasks and contributing to the local community.
5. **Reward Acquisition:** Upon successful completion of quests, users earn experience points and rewards, enhancing their engagement and progression within the platform.

### Frontend

The frontend of the Netropolis Community platform is developed using React, offering a user-friendly interface for seamless navigation and interaction. Key features of the frontend include:

- **Authentication:** Separate login and registration interfaces are provided for users and community managers, ensuring secure access to platform functionalities.
- **Dashboard:** Users and community managers have access to personalized dashboards displaying relevant information, such as quest listings, user profiles, and quest management tools.
- **Profile Management:** Users can view and manage their profiles, including experience points, quest history, and personal preferences.
- **Quest Registration:** Users can explore available quests, read detailed descriptions, and register for quests of interest with a simple click.

### Backend

The backend infrastructure of the Netropolis Community platform is powered by Django, offering robust functionality and efficient data management. The backend architecture comprises four distinct apps:

#### User

The User app manages user-specific operations, including authentication, registration, profile management, and quest history tracking.

#### Community Manager

The Community Manager app provides tools and functionalities tailored to the needs of community managers, including authentication, quest registration, application management, and quest completion tracking.

#### Quest

The Quest app serves as the core component of the platform, handling all quest-related operations, including quest creation, participant management, status tracking, and reward distribution.

#### Search

The Search app enhances user experience by enabling quest discovery through keyword-based searches and personalized recommendations based on user preferences.

### Documentation

The backend API is thoroughly documented using Swagger, providing comprehensive guidance on available endpoints, request parameters, and response formats. The documentation is accessible at [Netropolis Backend Swagger](https://netropolis-backend.vercel.app/swagger), offering developers and stakeholders insights into the platform's functionalities and integration possibilities.

