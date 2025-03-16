You need to create the database in postgreSQL 16
Database name: datadb
Remeber to create this user:
CREATE USER app_user WITH PASSWORD 'securePassword123$$';
GRANT CONNECT ON DATABASE datadb TO app_user;
You need to connect with the new user and create the following tables

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

Remember to give access to the user = app_user for these tables. 

GRANT ALL PRIVILEGES ON TABLE employees TO app_user;
GRANT ALL PRIVILEGES ON TABLE users TO app_user;

GRANT ALL PRIVILEGES ON SEQUENCE employees_id_seq TO app_user;
GRANT ALL PRIVILEGES ON SEQUENCE users_id_seq TO app_user;

npm run dev
