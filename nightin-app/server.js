const app = require('./app');

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
    console.log(`Express is running on port`, port);
});