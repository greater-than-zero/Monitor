// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const ipcRenderer = require("electron").ipcRenderer;
let selectTable = 0;
let spreadsheet = null;
let styles = [
    { bgcolor: "#a7d08c" },
    { bgcolor: "#fed964" },
    { bgcolor: "#f4b184" },
    { bgcolor: "#8596b0" },
];
let initTable = function (table) {
    let tableData = table;
    spreadsheet = window["x"].spreadsheet("#xspreadsheet", {
        view: {
            height: () => 600,
        },
        row: {
            len: tableData.datas.length,
        },
    });
    spreadsheet.change(data => {
        console.log(data);
    });
    setTableData(table);
};
let setTableData = function (table) {
    spreadsheet.loadData({
        freeze: "B5",
        styles: styles,
        merges: [],
        rows: table.datas,
        cols: { len: 26 },
        validations: [],
        autofilter: {},
    });
    spreadsheet.validate();
};
layui.use(['table', 'element', 'layer'], function () {
    let $ = layui.jquery;
    let table = layui.table;
    let element = layui.element;
    let layer = layui.layer;
    window["x"].spreadsheet.locale('zh-cn');
    ipcRenderer.on("start-table", (event, data, tables, tables2) => {
        for (let key in data) {
            let tableData = tables2[key];
            initTable(tableData);
            break;
        }
        let tableIndex = 0;
        for (let table of tables) {
            element.tabAdd('mo-table-all', {
                title: table,
                content: '',
                id: tableIndex + ""
            });
            tableIndex++;
        }
        element.tabChange('mo-table-all', "0");
        element.on('tab(mo-table-all)', function (elem) {
            //location.hash = 'test=' + $(this).attr('lay-id');
            selectTable = Number($(this).attr('lay-id'));
            let count = 0;
            for (let key in data) {
                let tableData = tables2[key];
                if (count === selectTable) {
                    setTableData(tableData);
                    break;
                }
                count++;
            }
        });
        element.on('nav(menu-tree)', function (elem) {
            var othis = $(this), href = othis.data('href');
        });
    });
    $('.layui-btn').click(function () {
    });
});
window.addEventListener("DOMContentLoaded", () => {
    ipcRenderer.send("start-table", "aaa");
});
ipcRenderer.on("start-table222", (data) => {
    console.log(data);
});
//# sourceMappingURL=renderer.js.map