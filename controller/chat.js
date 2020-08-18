
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

  ctx.cookies.set('user',JSON.stringify({ nickName }),{ maxAge: 24 * 60 * 60 * 1000 })

  if (nickName) {

    // ctx.redirect('/chat')

    ctx.response.body = {status: 'success'}

  }
}



async function chat(ctx,next) {

  let user = ctx.cookies.get('user')

  if (user) {
    user = JSON.parse(user)

    if (user.nickName) {
      await ctx.render('chat')
    }else{
      ctx.redirect('/')
    }
  }else{
    ctx.redirect('/')
  }

  await ctx.render('chat')
}


module.exports = {
  login,
  chat,
  chatLogin
}