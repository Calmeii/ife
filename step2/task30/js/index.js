
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
function getCharLength(str) {
  var ret = 0;
  for (var i = 0; i < str.length; i++) {
    var ch = str.charCodeAt(i);
    if (ch >= 0 && ch <= 128) {
      ret += 1;
    }
    else {
      ret += 2;
    }
  }
  return ret;
}

// type(num, char, email), up:字符上限, down: 字符下限
function Input(id, type, down, up) {
  this.id = id;
  this.type = type;
  this.up = up;
  this.down = down;
  this.status = false;
  this.domInput = document.getElementById("i"+id);
  this.domHint = document.getElementById("h"+id);
}

Input.prototype = {
  setHint: function(type, str) {
    switch (type) {
      case "normal":
        return "必填,长度为"+this.down+"~"+this.up;
      case "wrong":
        return str;
      case "accept":
        this.status = true;
        return str;
    }
  },
  mouseIn: function() {
    this.domHint.className = "hint hint-normal";
    this.domHint.innerHTML = this.setHint("normal");
  },
  mouseOut: function() {
    var value = this.domInput.value;
    value = value.trim();
    var len = getCharLength(value);
    if (len < this.down || len > this.up) {
      this.domHint.className = "hint hint-wrong";
      this.domHint.innerHTML = this.setHint("wrong", "长度不够");
      return ;
    }
    switch (this.type) {
      case "num":
        if (/^\d*$/.test(value)) {
          this.domHint.className = "hint hint-accept";
          this.domHint.innerHTML = this.setHint("accept", "验证成功");
        }
        else {
          this.domHint.className = "hint hint-wrong";
          this.domHint.innerHTML = this.setHint("wrong", "格式错误");
        }
        break;
      case "char":
        var re = /^[a-zA-Z_]\w*$/;
        if (this.id == 2 || this.id == 3) {
          re = /^[a-zA-Z_0-9]\w*$/;
        }
        if (re.test(value)) {
          if (this.id == 3) {
            if (value != inputList[1].domInput.value) {
              this.domHint.className = "hint hint-wrong";
              this.domHint.innerHTML = this.setHint("accept", "密码不一致");
              return ;
            }
          }
          this.domHint.className = "hint hint-accept";
          this.domHint.innerHTML = this.setHint("accept", "验证成功");
        }
        else {
          this.domHint.className = "hint hint-wrong";
          this.domHint.innerHTML = this.setHint("wrong", "格式错误");
        }
        break;
      case "email":
        if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
          this.domHint.className = "hint hint-accept";
          this.domHint.innerHTML = this.setHint("accept", "验证成功");
        }
        else {
          this.domHint.className = "hint hint-wrong";
          this.domHint.innerHTML = this.setHint("wrong", "格式错误");
        }
    }

  }
};

var inputList = [];
function initInput() {
  inputList.push(new Input(1,'char',4,13));
  inputList.push(new Input(2,'char',6,13));
  inputList.push(new Input(3,'char',6,13));
  inputList.push(new Input(4,'email',7,20));
  inputList.push(new Input(5,'num',5,11));
}

function initEvent() {
  var self = this;
  for (var i = 0; i < inputList.length; i++) {
    (function(i) {
      addEvent(inputList[i].domInput, 'focus', function(event) {
        inputList[i].mouseIn();
      });
      addEvent(inputList[i].domInput, 'blur', function(event) {
        inputList[i].mouseOut();
      });
    })(i)
  }
  addEvent(document.getElementById('button'), 'click', function(event) {
    for (var i = 0; i < inputList.length; i++) {
      if (inputList[i].status == false) {
        alert("提交失败");
        return ;
      }
    }
    alert("提交成功");
  })
}

window.onload = function () {
  initInput();
  initEvent();
};
























