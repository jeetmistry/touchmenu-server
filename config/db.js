const mongoose = require('mongoose')

const connect = () => {
     mongoose.connect(process.env.ATLAS_URI, (err) => {
        if (err) console.log("DB Connection Error ", err);
        else console.log("MongoDB Connected");
      });
    }
module.exports = connect ;