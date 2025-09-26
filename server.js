const express = require('express');
const cowsay = require('cowsay');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

// Middlewares
const morgan = require('./middlewares/morgan');
const setUser = require('./middlewares/decodedUser');

// Middleware para servir archivos estáticos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Todas las rutas tienen acceso a req.user
app.use(setUser);

app.use(cors());

// app.use(cors({
//   origin: "http://localhost:3000",
//   credentials: true
// }));

// Mas protección para la web
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https:", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "https:", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        fontSrc: ["'self'", "https:"],
        connectSrc: ["'self'", "https:"], // permite llamadas a cualquier API HTTPS
      },
    },
  })
);

// Configuración del logger con morgan
app.use(morgan(':method :url :status :param[id] - :response-time ms :body'));

// Rutas
const usersRoutes = require('./routes/users.routes');
const logsRoutes = require('./routes/logs.routes');

// Rutas API 
app.use('/api', usersRoutes);
app.use('/api/logs', logsRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//* Serve static assets in production, must be at this location of this file
if (process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(path.join(__dirname, 'client', 'dist')));
  // Catch-all handler para React routing
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(
    cowsay.say({
      text: `Example app listening on port http://localhost:${port}`,
      f: "tux", // Use the tux ASCII art // tux
    })
  );
});
