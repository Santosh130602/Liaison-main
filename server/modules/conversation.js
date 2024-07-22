const mongooes = require("mongoose")
const ChatSchema = mongooes.Schema ({
    members:{
        type:Array
    },
   },
{ timestamps: true}
)
const ChatModel = mongooes.model('ChatModel', ChatSchema);
module.exports = ChatModel;