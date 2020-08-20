const { getRandomAvatar } = require('../common/utils')
const services = require('../services/chat')

/**
 * login 页面
 */
async function login(ctx,next) {

  await ctx.render('login',ctx.state)
}

/**
 * login检测  登陆成功跳到chat页面，如果登录失败回归login页面 
 */
async function chatLogin(ctx,next) {

  const { nickName } = ctx.request.body

  const avatar = getRandomAvatar()

  ctx.cookies.set('user',JSON.stringify({ nickName, avatar }),{ maxAge: 24 * 60 * 60 * 1000 })

  if (nickName) {

    ctx.response.body = {status: 'success'}

  }
}



async function chat(ctx,next) {

  let user = ctx.cookies.get('user')

  if (user) {
    user = JSON.parse(user)

    if (user.nickName) {
      
      const contents = await services.getContent()

      //和前端页面连接，登录后可以显示名字
      ctx.state = {

        nickName: user.nickName,
        avatar: user.avatar,
        contents

      }
      await ctx.render('chat',ctx.state)

    }else{
      ctx.redirect('/')
    }
  }else{
    ctx.redirect('/')
  }

  await ctx.render('chat')
}



/**
 * 添加聊天输入的内容
 */
async function addContent(ctx,next) {
  
  let user = ctx.cookies.get('user')

  const { content } = ctx.request.body

  if (user) {

    const { nickName, avatar } = JSON.parse(user)

    await services.addContent({ nickName, avatar, content, createdAt:new Date()})

  }

  let data=await services.getContent()
  // console.log(data)
  ctx.response.body = {
    data,
    status:'success'
  }

}




module.exports = {
  login,
  chat,
  chatLogin,
  addContent
}