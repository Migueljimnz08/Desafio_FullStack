const express = require('express');
const cowsay = require('cowsay');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet')
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

// Mas protección para la web
app.use(helmet());

// Configuración del logger con morgan
app.use(morgan(':method :url :status :param[id] - :response-time ms :body'));

// Rutas
const usersRoutes = require('./routes/users.routes');

// Rutas API 
app.use('/api', usersRoutes);

// Serve static assets in production, must be at this location of this file
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

app.listen(port, () => {
    console.log(
        cowsay.say({
            text: `Example app listening on port http://localhost:${port}`,
            f: "tux", // Use the tux ASCII art // tux
        })
    );
});