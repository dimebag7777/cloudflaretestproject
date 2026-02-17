# Fullstack Python & React Template

This is a simple fullstack application template featuring:

- **Backend**: Python (FastAPI)
- **Frontend**: React (Vite)
- **Mobile**: React Native (Expo)
- **Infrastructure**: Docker Compose & Cloudflare Tunnel (Ad-Hoc Mode)

## Prerequisites

- Docker & Docker Compose
- Node.js & npm (for local mobile development)
- Expo Go app on your mobile device

## Setup

1.  **Start Services**:
    Run the backend, frontend, and tunnel with Docker Compose:

    ```bash
    docker-compose up --build
    ```

2.  **Get Public URL**:
    Since we are using Cloudflare Tunnel without a domain, a random URL is generated at startup.
    Find it by running:

    ```bash
    docker-compose logs tunnel
    ```

    Look for a line like: `https://<random-name>.trycloudflare.com`

3.  **Access the App**:
    - **Frontend**: Open `http://localhost:5173` in your browser.
    - **Backend API**: Accessible at `http://localhost:8000` (locally) or via the Tunnel URL (publicly).

## Mobile App

The mobile app is located in the `mobile/` directory.

1.  Navigate to the directory:

    ```bash
    cd mobile
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  **Configure API URL**:
    Open `mobile/App.js` and update the `API_URL` variable with the **Tunnel URL** you got from step 2.
    _Note: This URL changes every time you restart the tunnel._

4.  Start the app:

    ```bash
    npx expo start
    ```

5.  Scan the QR code with the Expo Go app.
