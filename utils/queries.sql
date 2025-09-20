-- Borrar todo si ya existía
DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS "logs";
DROP TABLE IF EXISTS users;

create table companies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) UNIQUE NOT NULL
);

create table "logs" (
  id SERIAL PRIMARY KEY,
  company_id INT NOT NULL,
  status VARCHAR(100) NOT NULL,
  alerts VARCHAR(150) UNIQUE NOT NULL,
  indicators VARCHAR(255) NOT NULL,
  severity INT NOT NULL,
  "date" DATE NOT NULL,
  "time" TIME NOT NULL,
  actions_taken TEXT NOT NULL,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  company_id INT NOT NULL,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'User', 
  logged BOOLEAN DEFAULT false NOT NULL,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);
