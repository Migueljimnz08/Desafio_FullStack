# 🔐 FireWatch - Proyecto final, Fullstack + Ciber security + Data Science


## 📝 Descripción

**CyberWatch** es una aplicación web para la **gestión y monitorización de eventos de ciberseguridad**.  
Permite a los usuarios consultar información de seguridad y amenazas, filtrar por diferentes campos, cambiar el estado en el que se encuentra la alerta, obtener más información mediante un click, y obtener acceso a un PDF detallado que muestra como combatir y solventar estos ataques.

Cuenta con **autenticación JWT** y un sistema de logs centralizado para PostgreSQL.  

---

## 🛠️ Tecnologías usadas

- **Frontend:** React, JSX, SASS, HTML5, CSS3  
- **Backend:** Node.js + Express
- **Base de datos:** PostgreSQL  
- **Documentación:** Swagger, JSDoc  
- **Autenticación:** JWT  
- **Control de versiónes:** Git + GitHub  
- **Despliegue:** Render + Docker

---

## 🎯 Objetivos del proyecto

- Crear una aplicación web full stack funcional orientada a ciberseguridad  
- Permitir gestión y monitorización de eventos de seguridad  
- Implementar buenas prácticas de seguridad y arquitectura MVC  
- Gestionar autenticación 
- Aplicar metodología ágil SCRUM  
- Documentar backend con Swagger y JSDoc  
- Trabajo colaborativo entre diferentes departamentos: fullstack, cibersguridad y data science

---

## 🧩 Funcionalidades principales

- Registro y login seguro con JWT    
- Visualización de logs y eventos de seguridad   
- Filtración por diferentes categorías
- Muestra visual, mediante gráficas y porcentajes de los ataques recibidos
- Ampliación de información para la mitigación de estos ataques a través de playbooks 
- Simulación de ataques en vivo

---

## 📸 Capturas de pantalla

![Home](./assets/DESAFÍO1.png)

## 🚀 Cómo ejecutar el proyecto

1. Clonar el repositorio:  

	git clone https://github.com/TU_USUARIO/TU_REPO.git

2. Instalar dependencias:

* Abrir terminal:
- cd backend/ npm install
- cd frontend/ npm install

3. Crear archivos .env basados en .env.example en backend y frontend

4. Iniciar servidor backend:

- npm run dev

5. Acceder a la app en:

- http://localhost:3000

## 🌐 Proyecto desplegado
- https://desafio-fullstack-5yro.onrender.com

## 🌐 Documentación
- Swagger: http://localhost:3000/api-docs
- JSDoc: Abrir archivo .html alojado en la carpeta/jsondocs

## 📂 Estructura del proyecto
```
project-root/
├── backend/
│   ├── controllers/
│   ├── jsondocs/
│   ├── middlewares/
│   ├── models/
│   ├── queries/
│   ├── routes/
│   ├── seed/
│   ├── utils/
│   ├── config/
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── Dockerfile
│   ├── jsdoc.json
│   ├── package.json
│   ├── README.md
│   └── server.js
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       ├── styles/
│       ├── services/
│       ├── utils/
│       ├── context/
│       ├── App.jsx
│       └── main.jsx
──
```
## 📚 Lecciones aprendidas

- Integración segura con PostgreSQL
- Gestión de autenticación JWT
- Uso avanzado de Express y middlewares
- Diseño y consumo de APIs REST seguras
- Planificación de tareas con metodología SCRUM
- Trabajo colaborativo con GitHub
- Trabajo en equipos con otros departamentos

## 🔧 Funcionalidades futuras

- Autenticación con OAuth (Google, GitHub)
- Simulador de ataques real
- Posibilidad de resolver el ataque desde la aplicación

## 🧑‍💻 Autores
Miguel Ángel Jiménez
María de Nazaret Melquiades
