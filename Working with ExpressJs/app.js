const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const expressHbs = require('express-handlebars');
const rootDir = require('./util/path');

// for enabling hbs
app.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'}));
app.set('view engine', 'hbs');

// for enabling pug
// app.set('view engine', 'pug');

app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:false}))
app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);



app.use((req, res, next)=>{
    // res.sendFile(path.join(rootDir , 'views', '404.html'))
    res.status(404).render('404', {pageTitle : '404 | Page not found'});
})



app.listen(3000);