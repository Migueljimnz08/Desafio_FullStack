-- Borrar todo si ya existía
DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS "logs";
DROP TABLE IF EXISTS users;

-- Crear tabla companies
create table companies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) UNIQUE NOT NULL
);

-- Insertar datos en companies
INSERT INTO companies (name)
VALUES 

-- Crear tabla logs 
  create table "logs" (
  id SERIAL PRIMARY KEY,
  company_id INT NOT NULL,
  status VARCHAR(100) NOT NULL DEFAULT 'Nuevo',
  type VARCHAR(150) NOT NULL,
  indicators VARCHAR(255) NOT NULL,
  severity INT NOT NULL,
  "date" DATE NOT NULL,
  "time" TIME NOT NULL,
  actions_taken TEXT NOT NULL,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

-- Insertar datos en tabla logs 
INSERT INTO "logs" (
  company_id,
  status,
  type,
  indicators,
  severity,
  "date",
  "time",
  actions_taken
)
VALUES

-- Obtener todos los datos de la tabla logs
SELECT * 
FROM "logs";

-- Obtener datos tabla logs por criticidad
SELECT *
FROM "logs"
WHERE severity =

-- Crear tabla usuarios
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

-- Crear usuarios
INSERT INTO users (
  company_id,
  username,
  email,
  password,
  role,
  logged
)
VALUES


