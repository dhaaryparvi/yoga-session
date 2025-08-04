Arvyax Wellness Session Platform
Objective
This project is a full-stack application designed to allow users to securely manage wellness sessions (e.g., yoga, meditation). It demonstrates core functionalities like user authentication, session drafting, publishing, and auto-saving, simulating a real-world interactive system.

Features
User Authentication:

Secure user registration (/api/auth/register) with hashed passwords.

User login (/api/auth/login) returning a JSON Web Token (JWT).

JWT storage in the frontend for persistent sessions.

Protected routes accessible only by authenticated users.

Fully functional logout.

Session Management API:

View public wellness sessions (GET /api/sessions).

View user's own sessions (drafts and published) (GET /api/sessions/my-sessions).

View a single user's session by ID (GET /api/sessions/my-sessions/:id).

Save or update a session as a draft (POST /api/sessions/save-draft).

Publish a draft session (POST /api/sessions/publish).

Frontend User Interface:

Landing Page (/): A welcoming page with a background image and a prominent "Login / Register" button.

Login / Register Page (/login): Forms for user authentication with a full-screen background image and a modern, semi-transparent card UI.

Dashboard (/ or /dashboard): Displays all publicly published wellness sessions with a beautiful background and styled cards.

My Sessions (/my-sessions): Lists all sessions (drafts and published) owned by the logged-in user, with options to create or edit.

Session Editor (/my-sessions/new or /my-sessions/edit/:id): Form for creating/editing session details (title, tags, JSON file URL).

Toast Notifications: Provides non-blocking user feedback for success, error, and warning messages.

Bonus Features Implemented:

Auto-save: Drafts are automatically saved after 5 seconds of user inactivity in the Session Editor.

Fully Working Logout: Clear user session and token.

Responsive UI: Basic responsive considerations applied through flexible layouts and relative units (though a full framework like Tailwind would enhance this further).

Auto-save feedback: Toast messages provide feedback for auto-save operations.

Tech Stack
Frontend: React.js

Backend: Node.js, Express.js

Database: MongoDB (via Mongoose ODM)

Authentication: JWT (jsonwebtoken, bcryptjs)

HTTP Client: Axios

UI Notifications: React Toastify

Local Assets: Stored in src/assets/

Setup Instructions
Follow these steps to get the project up and running on your local machine.

Prerequisites
Node.js (LTS version recommended)

npm (Node Package Manager) or Yarn

MongoDB Atlas Account (preferred) or a local MongoDB instance

1. Clone the Repository
git clone <your-repository-url>
cd arvyax-wellness-platform # Or whatever your root folder is named

2. Backend Setup
Navigate to the backend directory:

cd backend

Install dependencies:

npm install
# or yarn install

Create a .env file in the backend directory based on .env.example:

# backend/.env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=a_very_strong_random_secret_key_for_jwt_signing

Replace your_mongodb_atlas_connection_string with your actual MongoDB Atlas connection URI.

Replace a_very_strong_random_secret_key_for_jwt_signing with a long, random string.

Start the backend server:

npm start
# or node server.js

The backend server will typically run on http://localhost:5000.

3. Frontend Setup
Open a new terminal and navigate to the frontend directory:

cd ../frontend

Install dependencies:

npm install
# or yarn install

Start the React development server:

npm start
# or yarn start

The frontend application will typically run on http://localhost:3000.

Note: Ensure both the backend and frontend servers are running simultaneously for the application to function correctly.

API Documentation (Backend Routes)
The backend API is designed with RESTful principles. All endpoints are prefixed with /api.

Authentication Routes (/api/auth)
Method

Endpoint

Description

Request Body

Response (Success)

Response (Error)

Auth Required

POST

/register

Register a new user. Password is hashed.

{ email, password }

{ message: "User registered successfully" }

{ message: "User with this email already exists" }

No

POST

/login

Log in a user and return a JWT token.

{ email, password }

{ token: "jwt_token", user: { id, email } }

{ message: "Invalid credentials" }

No

Session Management Routes (/api/sessions)
Method

Endpoint

Description

Request Body

Response (Success)

Response (Error)

Auth Required

GET

/

Get all public (published) wellness sessions.

None

[ { _id, userId, title, tags, jsonFileUrl, status, ... } ]

{ error: "..." }

No

GET

/my-sessions

Get all sessions (drafts + published) for the authenticated user.

None

[ { _id, userId, title, tags, jsonFileUrl, status, ... } ]

{ message: "No authentication token..." }

Yes

GET

/my-sessions/:id

Get a single session by ID for the authenticated user.

None

{ _id, userId, title, tags, jsonFileUrl, status, ... }

{ message: "Session not found" }

Yes

POST

/save-draft

Create or update a session as a draft.

{ id (optional), title, tags[], jsonFileUrl }

{ message: "Draft saved successfully", session: {...} }

{ message: "Failed to save draft." }

Yes

POST

/publish

Publish an existing draft or a new session.

{ id (optional), title, tags[], jsonFileUrl }

{ message: "Session published successfully", session: {...} }

{ message: "Failed to publish session." }

Yes

