// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const ipcRenderer = require("electron").ipcRenderer;
layui.use('table', function () {
    let table = layui.table;
    ipcRenderer.on("start-table", (event, cols, data) => {
        console.log(cols, data);
        table.render({
            elem: '#test',
            height: 300,
            title: '用户表',
            cols: [cols],
            data: data
        });
    });
});
layui.use('element', function () {
    var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
    //监听导航点击
    element.on('nav(demo)', function (elem) {
        layui.layer.msg(elem.text());
    });
});
//# sourceMappingURL=renderer.js.map