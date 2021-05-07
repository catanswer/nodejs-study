const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/lagou-admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var usersSchema = mongoose.Schema({
  username: String,
  password: String
});
var Users = mongoose.model('users', usersSchema);

exports.Users = Users