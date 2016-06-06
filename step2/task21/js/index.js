
function addEvent(ele, event, fun) {
  if (ele.addEventListener) {
    ele.addEventListener(event, fun);
  }
  else if (ele.attachEvent) {
    ele.attachEvent("on"+event, fun);
  }
  else {
    ele["on"+event] = fun;
  }
}

function tagHandler(input, button) {
  this.input = document.getElementById(input);
  this.button = document.getElementById(button);
  this.container = document.getElementById(input+'-container');

  if (this.button) {
    this.init('button');
  }
  else {
    this.init('tag');
  }
}

tagHandler.prototype = {
  getVal: function() {
    switch (this.input.id) {
      case 'tag' :
        var val = this.input.value.split(/\s|,|,/)[0];
        return val;
      case 'hobby' :
        var val = this.input.value.split(/,|,|\t|\s|\n/);
        return val;
      default :
        return ;
    }
  },
  render: function(val) {
    if (val == "") return ;
    var child = document.createElement('span');
    child.textContent = val;
    this.container.appendChild(child);
  },
  del: function(ele) {
    this.container.removeChild(ele);
  },
  length: function() {
    return this.container.childNodes.length;
  },
  exist: function(val) {
    var children = this.container.childNodes;
    for (var i = 0; i < children.length; i++) {
      if (children[i].textContent.localeCompare(val) == 0) {
        return true;
      }
    }
    return false;
  },
  init: function(type) {
    var self = this;
    addEvent(this.container, 'mouseover', function(event) {
      if (event.target.nodeName.toLowerCase() == 'span') {
        event.target.textContent = '点击删除'+event.target.textContent;
        event.target.classList.toggle('focus');
      }
    });
    addEvent(this.container, 'mouseout', function(event) {
      if (event.target.nodeName.toLowerCase() == 'span') {
        event.target.textContent = event.target.textContent.replace('点击删除','');
        event.target.classList.toggle('focus');
      }
    });
    addEvent(this.container, 'click', function(event) {
      if (event.target.nodeName.toLowerCase() == 'span') {
        self.container.removeChild(event.target);
      }
    });
    switch(type) {
      case 'tag':
        addEvent(this.input, 'keyup', function(event) {
          if (/(,|,|\s)$/.test(self.input.value) || event.keyCode==13) {
            var val = self.getVal().trim();
            if (!self.exist(val)) {
              self.render(val);
            }
          }
          if (self.length() > 10) {
            self.del(self.container.childNodes[0]);
          }
        });
        break;
      case 'button':
        addEvent(this.button, 'click', function(event) {
          var valList = self.getVal();
          for (var i = 0; i < valList.length; i++) {
            var val = valList[i].trim();
            if (!self.exist(val)) {
              self.render(val);
            }
          }
          if (self.length() > 10) {
            self.del(self.container.childNodes[0]);
          }
        });
        break;
    }
  }

};

window.onload = function() {
  var tag = new tagHandler('tag');
  var hobby = new tagHandler('hobby', 'confirm');
};















