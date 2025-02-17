const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const rootDir = require('./util/path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:false}))
app.use('/admin', adminRoutes);
app.use(shopRoutes);



app.use((req, res, next)=>{
    res.sendFile(path.join(rootDir , 'views', '404.html'));
})



app.listen(3000);