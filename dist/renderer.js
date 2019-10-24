// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var Vue = require("vue");
var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    }
});
//# sourceMappingURL=renderer.js.map