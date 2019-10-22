layui.use(['table', 'element', 'form'], function () {
    let $ = layui.jquery;
    let form = layui.form;
    form.render();
    form.on('switch(codeFlex)', function (data) {
        let x = $("#test");
        if (this.checked) {
            x.hide();
        }
        else {
            x.show();
        }
    });
});
//# sourceMappingURL=main_view.js.map