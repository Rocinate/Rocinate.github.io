window.onload = function() {
  //变量声明
  var touch,starty,endy,top = 0,changedtop = 0,signal;
  var start = document.getElementById("WelcomeButtom");  
  var height = document.documentElement.clientHeight;
  var width = document.documentElement.clientWidth;
  var question = document.getElementsByClassName('question');
  var choice = question[0].getElementsByTagName('p');
  var things = document.getElementById('things');
  console.log(things.clientHeight,things.scrollTop,things.scrollHeight);
  style = document.getElementById('dynamic');
  body = document.body;
  t=0;

  //事件绑定
  start.onclick = function() {
    if(t==0 && (things.scrollTop == 0 || things.clientHeight + things.scrollTop > things.scrollHeight))
    {signal = '-';
    changedynamic(top,signal);
    top = top - 100;
    body.style.top = top+ "vh";}
  }


  body.ontouchstart = function(e) {
    touch = e.targetTouches[0];
    starty = touch.pageY;
  }

  //给选项添加正确和错误的动画
  for(var i = 0; i<choice.length ; i++) {
    if( i == 2) {choice[i].setAttribute("true","1")} else {choice[i].setAttribute("true","0")}
    choice[i].onclick = function() {
      var that = this;
      console.log(that.getAttribute('true'));
      if(that.getAttribute('true') == 1) {
        that.classList.add('rightanimation');
        that.style.background = "green";
        for(var j = 0;j<choice.length;j++) {
          choice[j].onclick = null;
        }
        setTimeout(function(){
          that.classList.remove('rightanimation');
        },1000)
      }
      else {
        that.classList.add('wronganimation');
        setTimeout(function() {
          that.classList.remove('wronganimation');
        },1000)
      }
    }
  }

  //判断用户的触摸操作方向
  body.ontouchend = function(e) {
    if(t==0 && (things.scrollTop == 0 || things.clientHeight + things.scrollTop > things.scrollHeight-10 ))
    {touch = e.changedTouches[0];
    endy = touch.pageY;
    if(endy - starty < -200) {
      if( top<=0 && top>=-200 ) {
        signal = '-';
        changedynamic(top,signal);
        top = top - 100;
        body.style.top = top+ "vh";
      }
      } else if(endy - starty > 200) {
        if(top>=-300 && top<= -100) {
        signal = '+';
        changedynamic(top,signal);
        top = top + 100;
        body.style.top = top+ "vh";
      }
    }
  }}
}


//动态改变keyframes的值，通过对body添加animation的类，达到动画效果
function changedynamic(top,signal) {
  body.classList.add('animation');
  t=1;//判断动画是否完成的值
  if(signal == '-') {
    changedtop = top - 100;
  }
  else {
    changedtop = top + 100;
  }
  setTimeout(function() {
    body.classList.remove('animation');
    t=0;
  },1000);
  style.innerHTML = '@keyframes slide {from {top: '+ top +'vh;}to {top: ' + changedtop + 'vh;}};';
}

//答案判断和收集
