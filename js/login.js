const btn=document.getElementById('btnLogin')
const email=document.getElementById('email')
const password=document.getElementById('password')
const msg=document.getElementById('error')


function login(){

  let request=new XMLHttpRequest()
  request.onreadystatechange=function(){
    if(this.readyState===4 && this.status===200){
      window.open('dashboard.html','_self')
      msg.innerHTML=""
    }else{
      msg.innerHTML='Invalid connection. try again!'
    }
  }
  request.open('POST','http://localhost:64364/api/users/login',true)
  request.setRequestHeader('Content-Type','application/x-www-form-urlencoded' )
  request.send('email='+email.value +'&password='+password.value)
}