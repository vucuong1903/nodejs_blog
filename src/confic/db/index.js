const mongoose = require('mongoose');


async function connect(){
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/blog_education_dev', {});
        console.log("Connect Sucessfully");
        
    } catch (error) {
        console.log("Connect Failure!");
        
        
    }
}

module.exports = { connect }