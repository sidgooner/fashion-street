const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    displayName: String,
    email: String,
    password: String,
    
},{collection: 'users'});

module.exports = mongoose.model("User", UserSchema);