Backend-Employee Project Setup Guide
This guide will walk you through setting up the backend-employee project with PostgreSQL 16 as the database and Node.js as the backend framework. Follow these steps carefully to ensure everything works smoothly.
________________________________________
Step 1: Install Required Tools
Before starting, ensure you have the following tools installed on your system:
•	Node.js (v16 or higher): https://nodejs.org
•	PostgreSQL 16 : https://www.postgresql.org/download/
•	Git : https://git-scm.com/downloads
•	npm (bundled with Node.js)
You can verify the installations by running:

node -v
npm -v
psql –version

Step 2: Clone the Repository
If you haven’t already cloned the backend-employee repository, do so now:

git clone https://github.com/masuagt/backend-employee.git
cd backend-employee

Step 3: Set Up the PostgreSQL Database
Follow these steps to create the database and configure the required user and tables.
A. Log in to PostgreSQL
Open a terminal and log in to PostgreSQL using the default postgres user:
sudo -u postgres psql

B. Create the Database
Run the following commands to create the datadb database:
CREATE DATABASE datadb;

C. Create the Application User
Create a new user (app_user) with a secure password:
CREATE USER app_user WITH PASSWORD 'SecurePassword123$$';
GRANT CONNECT ON DATABASE datadb TO app_user;
\q

D. Connect to the Database with the New User
Log in to the datadb database as app_user:

psql -U app_user -d datadb -h localhost
When prompted, enter the password: SecurePassword123$$

E. Create the Tables
Run the following SQL commands to create the employees and users tables:

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    position VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


F. Grant Permissions
Ensure the app_user has the necessary permissions to interact with the tables and sequences:

GRANT ALL PRIVILEGES ON TABLE employees TO app_user;
GRANT ALL PRIVILEGES ON TABLE users TO app_user;

GRANT ALL PRIVILEGES ON SEQUENCE employees_id_seq TO app_user;
GRANT ALL PRIVILEGES ON SEQUENCE users_id_seq TO app_user;
\q

Install the required Node.js packages:
npm install

Step 4: Start the Development Server
Run the development server using the following command:

npm run dev

[nodemon] starting `node index.js`
Server running at http://localhost:4000/graphql

Step 5: Test the API
You can test the API using tools like Postman , GraphQL Playground , or curl . 
Remember you need to use the bearer token for employees. 
