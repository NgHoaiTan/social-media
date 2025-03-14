const authRoute = require('./authRoute');
module.exports = (app) => {
    const version = '/api/v1';
    app.use(`${version}/`, authRoute);
}