const express = require('express');
const dotenv = require('dotenv');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const helmet = require('helmet')

dotenv.config();

// Middlewares
const morgan = require('./middlewares/morgan');

app.use(express.json());
app.use(cors());
app.use(helmet());

// Configuración del logger con morgan
app.use(morgan(':method :url :status :param[id] - :response-time ms :body'));

app.get('/', (req, res) => {
    res.json({ message: 'Servidor funcionando 🚀' });
});

//* Serve static assets in production, must be at this location of this file
if (process.env.NODE_ENV === 'production') {
    //*Set static folder
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