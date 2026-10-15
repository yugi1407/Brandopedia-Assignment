# TheBrandopedia — React Native Full-Stack Assignment

A mobile application built using React Native and Expo, with a Node.js, Express, and MongoDB backend.

## Features

- **Home:** Displays the current user's profile and a feed of five posts.
- **Discover:** Displays users with Connect buttons.
- **Connection requests:** Changes the button to Requested after submitting a request.
- **Persistent state:** Requested status remains after restarting the app.
- **Backend integration:** Fetches users and posts and stores connection requests in MongoDB.

## Tech Stack

- React Native
- Expo
- Node.js
- Express.js
- MongoDB

## Project Structure

```text
Brandopedia-Assignment/
├── Brandopedia/         # Mobile application
├── Brandopedia_server/  # Backend API and seed script
├── .gitignore
└── README.md
```

## Prerequisites

- Node.js and npm
- MongoDB running locally or a MongoDB Atlas database
- Expo Go or an Android emulator

## 1. Backend Setup

Open a terminal in the backend directory:

```bash
cd Brandopedia_server
npm install
```

### Configure Environment Variables

Create a `.env` file inside `Brandopedia_server`:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/brandopedia
```

Use your own MongoDB connection string if you are using MongoDB Atlas. Never commit your `.env` file.

### Seed the Database

Run the seed script to insert the sample users and posts:

```bash
npm run seed
```

### Start the Backend

```bash
npm start
```

The backend is expected to run on port `7000`, according to the server configuration.

## 2. Mobile App Setup

Open another terminal in the project root:

```bash
cd Brandopedia
npm install
```

### Configure the API URL

Ensure the API base URL in the app points to the backend.

- **Android emulator:** Use the appropriate emulator host address.
- **Physical device:** Use your computer's local network IP address.
- Ensure the phone and computer can communicate over the network.

### Start Expo

```bash
npx expo start
```

Scan the QR code using Expo Go or launch the app in your configured emulator.

## 3. API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/posts` | Retrieves posts |
| GET | `/users` | Retrieves users and existing request status |
| POST | `/connect` | Creates a connection request |

The first seeded user is treated as the current user, as required by the assignment.

## 4. Running the Complete Project

1. Start MongoDB.
2. Run `npm run seed` in `Brandopedia_server` if the sample data needs to be populated.
3. Run `npm start` in `Brandopedia_server`.
4. Run `npx expo start` in `Brandopedia`.
5. Open the app on a device or emulator.

## Notes

- No login or authentication flow is required for this assignment.
- MongoDB must be accessible to the backend.
- The app and backend are intended to run locally.
- Do not commit environment variables, credentials, or dependency folders.
