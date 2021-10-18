const mongoose = require('mongoose');
const connectionTomongo = () => {

    mongoose.connect("mongodb://localhost:27017/inoteBook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false", () => {
        console.log("Connection successfull");
    })
};
module.exports = connectionTomongo;