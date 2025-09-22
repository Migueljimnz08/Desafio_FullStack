require('dotenv').config();

// Modelo 
const userModel = require('../models/users.model');

// Mock data 
const users = [
  { id: 1, username: 'userPrueba', email: 'userPrueba@gmail.com', password: 'Prueba-123' },
  { id: 1, username: 'Pepe', email: 'pepe@email.com', password: 'PepeKey-1' },
  { id: 1, username: 'Maria', email: 'maria@email.com', password: 'MariaKey-1' },
];

const seed = async () => {
  try {
    console.log('Starting seeder...');

    // USERS
    for (const user of users) {
      await userModel.signUpUser(user.id, user.username, user.email, user.password);
    }
    console.log('Users injected');

    console.log('All data injected');
    process.exit(0);
  } catch (error) {
    console.error('Error executing seeder:', error);
    process.exit(1);
  }
};

seed();
