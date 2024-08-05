const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const loginController = require('./server/controllers/login-controller');
const companyController = require('./server/controllers/company-controller');
const userController = require('./server/controllers/user-controller');
const employeeController = require('./server/controllers/employee-controller');
const shiftController = require('./server/controllers/shift-controller');
const departmentController = require('./server/controllers/department-controller');
const uploadController = require('./server/controllers/upload-controller');
const connectDB = require('./server/config/db-config');
const cookieParser = require('cookie-parser');
const { isAuthenticated } = require('./server/validations/user-validations');
global.__basedir = __dirname;
app.use(cookieParser())
app.use(express.json()); 
app.use(cors({
    credentials:true,
    origin: 'https://factory-manager-client.onrender.com',
}));
app.use(cors(corsOptions));
app.use('/uploads',express.static(__dirname + '/server/storage-files'));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
      maxAge: 86400000, // 24 hours in milliseconds
    //   secure: true // Set to true if using HTTPS
    actionCount: 0,
    lastActionTimestamp: Date.now()
    },
    // Custom properties to track user actions
   
  }));
  
app.use("/registration", loginController);
app.use("/users",isAuthenticated, userController);
app.use("/companies",isAuthenticated, companyController);
app.use("/employees",isAuthenticated, employeeController);
app.use("/shifts",isAuthenticated, shiftController);
app.use("/departments",isAuthenticated, departmentController);
app.use("/file",uploadController);


const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log('Server up...');
    await connectDB();
    
});
