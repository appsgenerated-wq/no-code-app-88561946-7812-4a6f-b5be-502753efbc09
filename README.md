# Lunar Life Logger 🌕

Welcome to the Lunar Life Logger, a React application for tracking scientific observations of chimps and mice on the moon. This project is built entirely on the Manifest backend platform.

## ✨ Features

- **User Authentication**: Secure login for scientists and technicians using Manifest's built-in authentication.
- **Mission Logging**: Create and manage detailed observation logs.
- **Public Feed**: A public landing page showcases the latest discoveries from the mission.
- **Ownership**: Scientists can only manage the logs they have created.
- **Admin Panel**: A complete, auto-generated admin interface for managing users, logs, and system data.
- **Backend Health Check**: A status indicator shows the connectivity to the Manifest backend.

## 🚀 Getting Started

This application is designed to work out-of-the-box with a Manifest backend.

### Prerequisites

- Node.js and npm
- A running Manifest backend instance

### Frontend Setup

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Configure Environment**:
    Create a `.env` file in the root of the project and add your Manifest backend URL and App ID:
    ```
    VITE_BACKEND_URL=https://your-manifest-backend-url.vercel.app
    VITE_APP_ID=your-app-id
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

### Backend

The backend is defined by the `manifest.yml` file and is deployed via the Manifest platform. No additional backend setup is required.

## 🔑 Admin Access

- **Admin Panel URL**: Access the admin panel at `${config.BACKEND_URL}/admin`.
- **Default Credentials**:
  - **Email**: `admin@manifest.build`
  - **Password**: `admin`

From the admin panel, you can manage all `User` and `MissionLog` entities, invite new users, and oversee the entire application's data.
