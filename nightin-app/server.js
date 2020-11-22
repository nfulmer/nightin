const app = require('./app');

//const portnumber = 3000;
const portnumber = 8080;

const port = process.env.PORT || portnumber;
const server = app.listen(port, () => {
    console.log(`Express is running on port`, port);
});