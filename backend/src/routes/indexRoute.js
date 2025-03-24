const authRoute = require('./authRoute');
const userRoute = require('./userRoute');
module.exports = (app) => {
    const version = '/api/v1';
    app.use(`${version}`, authRoute);
    app.use(`${version}/users`, userRoute)
}