let inputEle = document.getElementsByClassName('chat-input')[0]

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
        url: 'http://192.168.199.178:3000/addContent',
        data:{
          content: value
        },
        success:(result)=>{
          // if (result.status === 'success') {

          inputEle.value = ''

          //清空
          $('.chat-content').html('')
          let html = ''

          result.data.forEach((item)=>{
      
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
              ${moment(item.createdAt).locale('zh_cn').format('YYYY MMMDo dddd HH:mm:ss')}
            </div>`

          })

          //重新渲染
          $('.chat-content').html(html)
          $('.chat-content').scrollTop($('.content').prop('scrollHeight'))

        }
      })
    }
  }
}