# User Role-Based Complaint Management System

## Getting Started

### Installation

### Setting Up the .env File

Add the following to your .env file, replacing root, orange123, localhost, and project_1 with your MySQL database credentials:

```
DATABASE_URL="mysql://root:orange123@localhost:3306/project_1"
```

### Importing the MySQL Backup

The backup file is available in the repository under the name project-1.mysql.

### Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```
