var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connection to mongodb is established")
});

var taskSchema = mongoose.Schema({
    name: {type: String, required: true},
    priority: Number,
    description: String,
    done: {type: Boolean, default: false}
});

var Task = mongoose.model('task', taskSchema);

module.exports = Task