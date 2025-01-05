const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const ConnectDatabase = require('./Connect_DB/Connect_DB');

const app = express();
const port = process.env.PORT || 5000; // Default port if not defined
const localhost = process.env.LOCALHOST || 'localhost'; // Default localhost if not defined

// Import routers
const { Advertisment_Router } = require('./Routers/Advertisment.router.js');
const { Category_Router } = require('./Routers/Category.router.js');
const { City_Router } = require('./Routers/City.router.js');
const { CityArea_Router } = require('./Routers/CityArea.router.js');
const { Country_Router } = require('./Routers/Countries.router.js');
const { Province_Router } = require('./Routers/Province.router.js');
const { Role_Router } = require('./Routers/Role.router.js');
const { Status_Router } = require('./Routers/Status.router.js');
const { Type_Router } = require('./Routers/Type.router.js');
const { User_Router } = require('./Routers/User.router');
const { Message_Router } = require('./Routers/message.router.js');

// Middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "http://localhost:5173" // Adjust the origin as needed
}));

// API Routes
app.use('/api/ARZ/advertisment', Advertisment_Router);
app.use('/api/ARZ/category', Category_Router);
app.use('/api/ARZ/city', City_Router);
app.use('/api/ARZ/cityarea', CityArea_Router);
app.use('/api/ARZ/country', Country_Router);
app.use('/api/ARZ/province', Province_Router);
app.use('/api/ARZ/role', Role_Router);
app.use('/api/ARZ/status', Status_Router);
app.use('/api/ARZ/type', Type_Router);
app.use('/api/ARZ/user', User_Router);
app.use('/api/ARZ/User', Message_Router);

// Catch-all route for unhandled routes
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

// Start server
ConnectDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://${localhost}:${port}`);
  });
}).catch(err => {
  console.error('Failed to connect to the database:', err);
});
