/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = document.getElementById("aqi-city-input").value;
    var index = document.getElementById("aqi-value-input").value;
    if (!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)) {
        alert("城市名必须为中英文字符");
        return;
    }
    if (!index.match(/^\d+$/)) {
        alert("空气质量指数必须为整数！");
        return;
    }
    //城市对应指数
    aqiData[city] = index;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var table = document.getElementById('aqi-table');
    table.innerHTML = "";
    //创建单元格 遍历对象根据里面的内容有几个就创建几个单元格 city是属性名，aqiData是属性值
    for (var city in aqiData) {
        if (table.children.length === 0) {
            table.innerHTML = "<tr> <td>城市</td> <td>空气质量</td> <td>操作</td> </tr>";
        }
        var tr = document.createElement("tr");
        var td = document.createElement('td');
        var td1 = document.createElement('td');
        td.innerHTML = city;
        td1.innerHTML = aqiData[city];
        tr.appendChild(td);
        tr.appendChild(td1);
    }
    //创建删除单元格
    var td2 = document.createElement('td');
    td2.innerHTML = "<button class='del-btn'>删除</button>";
    tr.appendChild(td2);
    table.appendChild(tr);
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
    // do sth.
    //获取所有的button,添加事件
    /* var buttons = document.querySelectorAll('button');
     for (var i = 0; i < buttons.length; i++) {
         buttons[i].onclick = function () {
             table.removeChild(this.parentNode.parentNode)
         }
     }*/
    var city = tr.children[0].innerHTML;    //获取第一个子元素的值
    delete aqiData[city];
    //更新表格显示
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var addbtn = document.getElementById("add-btn");
    addbtn.onclick = addBtnHandle;
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    var table = document.getElementById("aqi-table");
    var arrBtnDel = table.getElementsByClassName("del-btn");
    //addEventListener(event,function,useCapture)指定元素添加事件
    table.addEventListener("click", function (e) {
        if (e.target && e.target.nodeName === "button") {
            delBtnHandle(e.target);   //删除目标节点
        }
    })
}

init();