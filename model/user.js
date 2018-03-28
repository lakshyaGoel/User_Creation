var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var config = require('../config');

mongoose.connect(config.dbURI);

var userSchema = new Schema({
    id: Schema.Types.ObjectId,
    name: String,
    email: {
        type:String,
        unique:true,
        required:true,
        validator:function(v){
        return /.+@.+\..+/.test(v)
        }
    },
    displayName: String
});

module.exports = mongoose.model("User", userSchema);
