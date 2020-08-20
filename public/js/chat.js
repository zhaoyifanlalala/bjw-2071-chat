let inputEle = document.getElementsByClassName('chat-input')[0]

let timer


stopTimer()

longPolling()

window.onload=function(){

  $('.chat-content').scrollTop($('.chat-content').prop('scrollHeight'))

}

inputEle.onkeydown = function (e) {
  var key = e.which
    
  if (key == 13) {
        
    let value = inputEle.value

    if (value) {
      $.ajax({
        type: 'post',
        url: 'http://localhost:3000/addContent',
        data:{
          content: value
        },
        success:(result)=>{
          // if (result.status === 'success') {
          renderChat(result.data)

          inputEle.value = ''

        }
      })
    }
  }
}


/**
 * 
 * 重新渲染聊天内容
 */
function renderChat(data) {
  //清空
  $('.chat-content').html('')

  let html = ''

  data.forEach((item)=>{

    html += `
    <div class='chat-content-detail clearFix'>

      <div class="chat-detail-left">
        <img src='${ item.avatar }' class="chat-avatar">
        <div class="chat-name">${ item.nickName}</div>
      </div>

      <div class="chat-detail-right">
        ${ item.content }
      </div>
    </div>

    <div style="clear:both"></div>

    <div class="chat-time">
      ${moment(item.createdAt).locale('zh_cn').format('YYYY MMMDo dddd aHH:mm:ss')}
    </div>`

  })

  //重新渲染
  $('.chat-content').html(html)

  $('.chat-content').scrollTop($('.chat-content').prop('scrollHeight'))
}

/**
 * 长轮询
 */
function longPolling() {
  timer = setInterval(()=>{
    $.ajax({
      type: 'get',
      url: 'http://localhost:3000/longPollContent',
      data:{},
      success:(result)=>{

        renderChat(result.data)
      }
    })
  },2000)
}


function stopTimer() {
  if (timer) {
    clearInterval(timer)
  }
}