const authRoute = require('./authRoute');
const userRoute = require('./userRoute');
const postRoute = require('./postRoute');
const messageRoute = require('./messageRoute');
module.exports = (app) => {
    const version = '/api/v1';
    app.use(`${version}`, authRoute);
    app.use(`${version}/users`, userRoute);
    app.use(`${version}/posts`, postRoute);
    app.use(`${version}/messages`, messageRoute)
}