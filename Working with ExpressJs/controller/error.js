exports.get404 = (req, res, next)=>{
    // res.sendFile(path.join(rootDir , 'views', '404.html'))
    res.status(404).render('404', {pageTitle : '404 | Page not found'});
}