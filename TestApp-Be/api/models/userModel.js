const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    gender:String,
    friends: [{ type: Schema.Types.ObjectId, ref: 'Friends'}]
});
module.exports = mongoose.model('user', userSchema, 'users')
