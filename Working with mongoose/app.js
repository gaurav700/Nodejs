// Suggested code may be subject to a license. Learn more: ~LicenseLog:1694669601.
require('dotenv').config();
const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoDbName = process.env.MONGO_DATABASE_NAME;

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const User = require('./models/user');
const mongoose = require('mongoose');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));




app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

const uri = `mongodb+srv://${mongoUser}:${mongoPassword}@project0.35tzr.mongodb.net/?retryWrites=true&w=majority&appName=${mongoDbName}`;
mongoose
    .connect(uri)
    .then(res => app.listen(3000))
    .catch(err=> console.log(err));

