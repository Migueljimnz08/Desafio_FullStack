# FireWatch

## Descripción
Proyecto FullStack para la gestión y visualización de logs de ciberseguridad. Incluye:
- Backend en Node.js/Express con PostgreSQL.
- Frontend en React + Vite.
- Documentación automática con JSDoc y Swagger.

## Características principales
- Autenticación de usuarios y roles.
- Visualización de logs y gráficas interactivas.
- API REST documentada con Swagger.
- Estilos modernos y responsive con SASS/SCSS y Material UI.

## Estructura del proyecto
```
├── server.js
├── Dockerfile
├── package.json
├── jsdoc.json
├── config/
├── controllers/
├── middlewares/
├── models/
├── queries/
├── routes/
├── seed/
├── utils/
├── client/
│   ├── package.json
│   ├── src/
│   ├── public/
│   └── ...
```

## Instalación

1. Clona el repositorio:
	 ```bash
	 git clone https://github.com/Migueljimnz08/Desafio_FullStack.git
	 cd Desafio_FullStack
	 ```

2. Instala dependencias:
	 ```bash
	 npm install
	 npm run clientinstall
	 ```

3. Configura las variables de entorno en `.env` (ver `.env.example`).

4. Inicializa la base de datos (opcional):
	 ```bash
	 npm run feed_db
	 ```

## Uso

- Inicia el servidor y el cliente en modo desarrollo:
	```bash
	npm run dev
	```

- Accede a la aplicación en [http://localhost:3000](http://localhost:3000).

## Documentación

- **JSDoc:**  
	Genera la documentación técnica del backend:
	```bash
	npm run generate-docs
	```
	Consulta la documentación en `jsondocs/index.html`.

- **Swagger:**  
	Accede a la documentación interactiva de la API en  
	[http://localhost:3000/api-docs](http://localhost:3000/api-docs).

## Docker

Para ejecutar el proyecto con Docker:
```bash
docker build -t desafio_fullstack .
docker run -p 8080:8080 desafio_fullstack
```
