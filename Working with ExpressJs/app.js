const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const rootDir = require('./util/path');

app.set('view engine', 'pug');
app.set('views', 'views')
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:false}))
app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);



app.use((req, res, next)=>{
    res.status(404).render('404', {pageTitle : '404 | Page not found'});
})



app.listen(3000);