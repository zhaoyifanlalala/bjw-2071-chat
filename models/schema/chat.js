const mongoose = require('mongoose')

//放到数据库里
const { Schema } = mongoose
const chatsSchema = new Schema({
  nickName: String,
  avatar:String,
  content:String,
  createdAt:{ type:Date, default: new Date()},   //数据库里有录入时间
//   updatedAt:{ type:Date, default: new Date()},
})

const chatsModel = mongoose.model('chats', chatsSchema)

module.exports = {
  chatsModel
}