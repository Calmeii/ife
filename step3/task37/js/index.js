var login_box = document.getElementsByClassName('login-box')[0];
var mask = document.getElementsByClassName('mask')[0];
var confirm = document.getElementById('login-confirm');

function addEvent(ele, event, handler) {
  if (ele.addEventListener) {
    ele.addEventListener(event, handler);
  }
  else if (ele.attachEvent) {
    ele.attachEvent("on"+event, handler);
  }
  else {
    ele["on"+event] = handler;
  }
}

function loginAppear() {
  login_box.style.left="";
  login_box.style.top="";
  mask.className = "mask mask-appear";
  login_box.className = "login-box box-appear";
}
function loginDisappear() {
  mask.className = "mask mask-disappear";
  login_box.className = "login-box, box-disappear";
}
var disX, disY;
function loginMove(event) {
      var pageX = event.clientX;
      var pageY = event.clientY;
      login_box.style.left = pageX - disX > 225 ? pageX-disX : 225;
      login_box.style.top = pageY - disY > 125 ? pageY - disY : 125;
}
function loginUp(event) {
  document.removeEventListener('mousemove', loginMove);
  document.removeEventListener('mouseup', loginUp);
}
function loginDown(event) {
    var pageX = event.clientX;
    var pageY = event.clientY;
    disX = pageX - login_box.offsetLeft;
    disY = pageY - login_box.offsetTop;
    addEvent(document, "mousemove",loginMove);
    addEvent(document, "mouseup", loginUp);
}
function initEvent() {
  var lb = document.getElementById("login-button");
  addEvent(lb, "click", loginAppear);
  addEvent(mask, "click", loginDisappear);
  addEvent(confirm, "click", loginDisappear);
  addEvent(document.getElementById('login-header'), "mousedown", loginDown);
}
window.onload = function() {
  initEvent();
};