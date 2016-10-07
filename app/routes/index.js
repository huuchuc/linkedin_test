var user = require('./user');

module.exports = function(app) {

    //user 
    user(app);

    //route all request to index.html
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });
};
