

function TreeNode(obj) {
  this.parent = obj.parent;
  this.children = obj.children || [];
  this.title = obj.title || "";
  this.domElement = obj.domElement;
  this.domElement.TreeNode = this;
}

TreeNode.prototype = {
  //arrow:是否更新箭头,visible:是否改变可见状态。
  render: function(arrow, visible, highlight) {
    if (arrow) {
      if (this.isFolded()) {
          this.domElement.getElementsByClassName('arrow')[0].className = "arrow arrow-right";
      }
      else {
        if (this.isLeaf()) {
          this.domElement.getElementsByClassName('arrow')[0].className = "arrow arrow-empty";
        }
        else {
          this.domElement.getElementsByClassName('arrow')[0].className = "arrow arrow-down";
        }
      }
    }
    if (visible) {
      if (this.domElement.classList.contains('node-hidden')) {
        this.domElement.classList.remove('node-hidden');
        this.domElement.classList.add('node-visible');
      }
      else {
        this.domElement.classList.remove('node-visible');
        this.domElement.classList.add('node-hidden');
      }
    }
    if (highlight) {
      var now = this.domElement.getElementsByClassName('node-title')[0];
      now.classList.add('highlight');
    }
    else {
      var now = this.domElement.getElementsByClassName('node-title')[0];
      now.classList.remove('highlight');
    }
  },
  isLeaf: function () {
    return this.children.length == 0;
  },
  isFolded: function() {
    if (this.isLeaf()) return false;
    return this.children[0].domElement.classList.contains("node-hidden");
  },
  newEle: function (name) {
    return document.createElement(name);
  },
  //增加一个新的dom node节点
  newDomNode: function(title) {
    var n_node = this.newEle('div')
    n_node.className = "node node-visible";

    var n_header = this.newEle('label');
    n_header.className = "node-header";

    var n_arrow = this.newEle('div');
    n_arrow.className = "arrow arrow-empty";

    var n_title = this.newEle('span');
    n_title.className = "node-title";
    n_title.innerHTML = title;

    var n_add = this.newEle('span');
    n_add.className = "icon-add";
    n_add.innerHTML = "+";

    var n_del = this.newEle('span');
    n_del.className = "icon-del";
    n_del.innerHTML = "x";

    n_node.appendChild(n_header);
    n_header.appendChild(n_arrow);
    n_header.appendChild(n_title);
    n_header.appendChild(n_add);
    n_header.appendChild(n_del);

    return n_node;
  },
  addChild: function(title) {
    if (title == null) return this;
    if (title == "") {
      alert('不能为空');
    }
    var n_node = this.newDomNode(title);
    this.domElement.appendChild(n_node);
    this.children.push(new TreeNode({parent:this, children:[], title:title, domElement:n_node}));
    this.render(true, false, false);
    return this.children[this.children.length-1];
  },
  removeNode: function() {
    for (var i = 0; i < this.children.length; i++) {
      this.children[i].removeNode();
    }
    this.parent.domElement.removeChild(this.domElement);
    for (i = 0; i < this.parent.children.length; i++) {
      if (this.parent.children[i] == this) {
        this.parent.children.splice(i,1);
      }
    }
  },
  toggleFold: function() {
    for (var i = 0; i < this.children.length; i++) {
      this.children[i].render(false, true, false);
    }
    this.render(true, false, false);
  },
  search: function(u, key) {
    for (var i = 0; i < u.children.length; i++) {
      this.search(u.children[i], key);
    }
    if (u.title == key) {
      u.render(false, false, true);
    }
    else {
      u.render(false, false, false);
    }
  }
};

function initData(root) {
  root.addChild('艾欧尼亚').addChild('亚索');
  root.children[0].addChild('lee sin');
  root.children[0].addChild('贾克斯');
  root.children[0].children[1].addChild('龙虾');
  root.addChild('德玛西亚').addChild('盖伦');
  root.children[1].addChild('拉克丝');
}

function initEvent(root) {
  var self = this;

  addEvent(root.domElement, 'click', function(event) {
    var tar = event.target;
    var dom = event.target;

    while (!dom.classList.contains('node')) {
      dom = dom.parentNode;
    }

    var parent = dom.TreeNode;

    if (tar.classList.contains('arrow') || tar.classList.contains('node-title')) {
      if (!parent.isLeaf()) {
        parent.toggleFold();
      }
    }
    else if (tar.classList.contains('icon-add')) {
      parent.addChild(prompt('请输入节点内容'));
    }
    else if (tar.classList.contains('icon-del')) {
      var now = parent.parent;
      parent.removeNode();
      now.render(true, false, false);
    }
  });

  addEvent(document.getElementById('search-start'), 'click', function(event) {
    var key = document.getElementById('search-content').value;
    key = key.trim();
    if (key == "") return ;
    root.search(root, key);
  })
}

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

window.onload = function() {
  var root = new TreeNode({ parent:null,children:[],title:'league of legend',
                            domElement:document.getElementsByClassName('node')[0] });

  initData(root);
  initEvent(root);
};



























