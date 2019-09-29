// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
layui.use('table', function () {
    var table = layui.table;
    table.render({
        elem: '#test',
        height: 300,
        title: '用户表',
        page: true //开启分页
        ,
        totalRow: true //开启合计行
        ,
        cols: [[
                ,
                { field: 'id', title: 'ID', width: 80, sort: true, totalRowText: '合计：' },
                { field: 'username', title: '用户名', width: 80 },
                { field: 'experience', title: '积分', width: 90, sort: true, totalRow: true },
                { field: 'sex', title: '性别', width: 80, sort: true },
                { field: 'score', title: '评分', width: 80, sort: true, totalRow: true },
                { field: 'city', title: '城市', width: 150 },
                { field: 'sign', title: '签名', width: 200 },
                { field: 'classify', title: '职业', width: 100 },
                { field: 'wealth', title: '财富', width: 135, sort: true, totalRow: true },
                { fixed: 'right', width: 165, align: 'center', toolbar: '#barDemo' }
            ]],
        data: [{ id: 111 }, { id: 222 }]
    });
    table.relode("#test", {
        data: [{ id: 111 }, { id: 222 }, { id: 4444 }]
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