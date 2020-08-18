let btnEle = document.getElementsByClassName('login-button')[0]
let inputEle = document.getElementsByClassName('login-input')[0]


// console.log(nickName)

btnEle.onclick = function () {
    
  let nickName = inputEle.value
  
  if(nickName){
    // console.log(nickName)
    $.ajax({
      type: 'post',
      url: 'http://localhost:3000/chat/login',
      data:{
        nickName
      },
      success:(result)=>{
        if (result.status === 'success') {
          location.href = '/chat'
        }
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }

 
}