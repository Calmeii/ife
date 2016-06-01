/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

function addEventHandler(ele, event, handler) {
  if (ele.addEventListener) {
    ele.addEventListener(event, handler, false);
  } else if (ele.attachEvent) {
    ele.attachEvent("on"+event, handler);
  } else {
    ele["on"+event] = handler;
  }
}
// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};
// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: '北京',
  nowGraTime: "day"
};

/**
 * 渲染图表
 */
function renderChart() {
  var color = "", text = "";
  for (var item in chartData) {
    color = Math.floor(Math.random()*0xFFFFFF).toString(16);
    text += '<div title="'+item+":"+chartData[item]+'" style="height:'+chartData[item]+'px; background-color:#'+color+';"></div>';
  }
  var pos = document.getElementsByClassName('aqi-chart-wrap')[0];
  pos.innerHTML = text;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化
  if (pageState.nowGraTime == this.value) {
    return ;
  } else {
    pageState.nowGraTime = this.value;
  }
  // 设置对应数据
  initAqiChartData();

  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化
  var opt = document.getElementById('city-select');
  if (pageState.nowSelectCity == this.value) {
    return ;
  } else {
    pageState.nowSelectCity = this.value;
  }
  // 设置对应数据
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var radioList = document.getElementsByTagName('input');
  for (var i = 0; i < radioList.length; i++) {
    addEventHandler(radioList.item(i), 'click', graTimeChange);
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var citySelect = document.getElementById('city-select');
  var cityList = '';
  for (var i in aqiSourceData) {
    cityList += '<option>' + i +'</option>';
  }
  citySelect.innerHTML = cityList;

  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  addEventHandler(citySelect, 'change', citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  chartData = {};
  var selectData = aqiSourceData[pageState.nowSelectCity];
  if (pageState.nowGraTime == 'day') {
    chartData = selectData;
  } else if (pageState.nowGraTime == 'week') {
    var days = 0, weeks = 0, weekTotal = 0;
    for (var item in selectData) {
      days++;
      weekTotal += selectData[item];
      if (days % 7 == 0) {
        weeks += 1;
        chartData['第'+weeks+'周'] = Math.floor(weekTotal/7);
        weekTotal = 0;
      }
    }
    if (days % 7 != 0) {
      weeks += 1;
      chartData['第'+weeks+'周'] = Math.floor(weekTotal/(days%7));
    }

  } else {
    var days = 0, monthes = 0, monthTotal = 0;
    for (var item in selectData) {
      days++;
      monthTotal += selectData[item];
      if ((new Date(item)).getMonth() != monthes) {
        monthes += 1;
        chartData['第'+monthes+'月'] = Math.floor(monthTotal/days);
        monthTotal = 0;
        days = 0;
      }
    }
    if (days != 0) {
      monthes += 1;
      chartData['第'+monthes+'月'] = Math.floor(monthTotal/days);
    }
  }

  // 处理好的数据存到 chartData 中
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  renderChart();
}

init();
