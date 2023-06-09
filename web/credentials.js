const mongoose = require('mongoose');

const credentialSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    }
});

const User = mongoose.model('user', credentialSchema, 'login-credentials');
module.exports = User;