
function addEvent(ele, event, handler) {
  if (ele.addEventListener) {
    ele.addEventListener(event, handler, false);
  }
  else if (ele.attachEvent) {
    ele.attachEvent("on"+event, handler);
  }
  else {
    ele["on"+event] = handler;
  }
}



window.onload = function()
{

  var buttonList = document.getElementsByTagName('button');
  var pos = document.getElementById('queue');
  var input = document.getElementsByTagName('input')[0];
  
  var queue = {
    arr : [],

    isEmpty : function() {
      return this.arr.length == 0;
    },
    
    validate : function(now) {
      if (now == "") return false;
      
      if (isNaN(now)) {
        alert("必须为数字");
        return false;
      }
      return true;
    },
    
    leftPush : function() {
      var now = input.value.trim();
      if (this.validate(now) == false) {
        return ;
      }
      this.arr.unshift(now);
      this.render();
    },
    rightPush : function() {
      var now = input.value.trim();
      if (this.validate(now) == false) {
        return ;
      }
      this.arr.push(now);
      this.render();
    },
    leftOut : function() {
      if (this.isEmpty()) {
        alert('空空如也~~');
        return ;
      }
      var now = this.arr.shift();
      alert(now);
      this.render();
    },
    rightOut : function() {
      if (this.isEmpty()) {
        alert('空空如也~~');
        return ;
      }
      var now = this.arr.pop();
      alert(now);
      this.render();
    },
    render : function() {
      var text = "";
      for (var i in  this.arr) {
        text += "<div id = "+i+">"+this.arr[i]+"</div>";
      }
      pos.innerHTML = text;11
      
    },
    deleteId : function(id) {
      this.arr.splice(id, 1);
      this.render();
    }
  };
  function addDivDelEvent() {
    addEvent(pos, 'click', function(e) {
      console.log(e.target.id);
      queue.deleteId(e.target.id);
    })
  }
  addEvent(buttonList[0], 'click', function(){
    queue.leftPush();
  });
  addEvent(buttonList[1], 'click', function(){
    queue.rightPush();
  });
  addEvent(buttonList[2], 'click', function(){
    queue.leftOut();
  });
  addEvent(buttonList[3], 'click', function(){
    queue.rightOut();
  });
  addDivDelEvent();
};






















