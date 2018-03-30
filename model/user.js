var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var config = require('../config');

mongoose.connect(config.dbURI);

var userSchema = new Schema({
    id: Schema.Types.ObjectId,
    username: {
        type:String,
        unique:true,
        required:true,
    },
    department: String,
    displayName: String
});

module.exports = mongoose.model("User", userSchema);
