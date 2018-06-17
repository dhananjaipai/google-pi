const app = require('./app');

const server = app.listen(8080, () => {
    console.log("Google-Pi is listening at http://%s:%s", server.address().address, server.address().port)
});