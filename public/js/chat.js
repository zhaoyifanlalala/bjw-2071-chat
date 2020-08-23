let inputEle = document.getElementsByClassName('chat-input')[0]

let timer

// 初始化的数据
let originData

stopTimer()

longPolling()

getOriginData()

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

          originData=result.data
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

  // $('.chat-content').scrollTop($('.chat-content').prop('scrollHeight'))
}

// function getOriginData(){

//   // 获取原始数据
//   $.ajax({
//     success:(result)=>{

//       originData = result.contents
//     }
//   })
// }


function getOriginData(){
  $.ajax({
    type:'get',
    url:'http://localhost:3000/longPollContent',
    data:{},
    success:(result)=>{
      originData=result.data
    }
  })
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

        let times = 0
        result.data.filter((item)=>{

          if( moment(originData[originData.length  - 1].createdAt).isBefore(moment(item.createdAt)) ){
            times ++
          }
        })
        
        if(times>0){
          //如果有新信息，渲染消息框
          renderWarning(times)
        }else{
          console.log('没有新消息')
        }

      }
    })
  },2000)
}


function stopTimer() {
  if (timer) {
    clearInterval(timer)
  }
}



let warningEle=document.getElementsByClassName('warning')[0]
function renderWarning(times){
  if(times>0){
    let warninghtml='有'+times+'条新消息'
    $('.warning').html(warninghtml)
    warningEle.style.display='block'
  }
}



warningEle.onclick=function(){
  $('.chat-content').scrollTop($('.chat-content').prop('scrollHeight'))
  warningEle.style.display='none'
  getOriginData()
}