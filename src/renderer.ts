// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const ipcRenderer = require("electron").ipcRenderer;

let selectTable: number = 0;

layui.use(['table', 'element'], function () {
    let $ = layui.jquery
    let table = layui.table;
    let element = layui.element;

    ipcRenderer.on("start-table", (event, data, tables) => {
        for (let key in data) {
            let tableInfo = data[key];
            table.render({
                elem: '#test'
                , height: 300
                , title: '用户表'
                , cols: [tableInfo.cols]
                , data: tableInfo.datas
                , limit: 999999
            });
            break;
        }

        let tableIndex = 0;
        for (let table of tables) {
            element.tabAdd('mo-table-all', {
                title: table
                , content: ''
                , id: tableIndex + ""
            });
            tableIndex++;
        }

        element.tabChange('mo-table-all', "0");
        element.on('tab(mo-table-all)', function (elem) {
            //location.hash = 'test=' + $(this).attr('lay-id');
            selectTable = Number($(this).attr('lay-id'));
            let count = 0;
            for (let key in data) {
                let tableInfo = data[key];
                if (count === selectTable) {
                    table.render({
                        elem: '#test'
                        , height: 300
                        , title: '用户表'
                        , cols: [tableInfo.cols]
                        , data: tableInfo.datas
                        , limit: 999999
                    });
                    break;
                }
                count++;
            }
        });
    });

    $('.layui-btn').click(function () {
        let inputVal = $('.layui-input').val();
        table.reload('test', {
            where: {
                query: inputVal
            }
        });
    });

    window["x"].spreadsheet.locale('zh-cn');
    let spreadsheet = window["x"].spreadsheet("#xspreadsheet", {
        view: {
            height: () => 300,
            width: () => 400,
        },
    });

    spreadsheet.loadData({
        freeze: "A1",
        styles: [],
        merges: [],
        rows: [{
            cells: [
                { "text": "asd" },
                { "text": "2" }
            ]
        }],
        cols: { len: 26 },
        validations: [],
        autofilter: [],
    });

    spreadsheet.change(data => {
        console.log(data);
    });

    spreadsheet.validate();
});
