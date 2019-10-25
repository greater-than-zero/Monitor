<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="tipsblock">
          <i class="el-icon-warning"></i>
          分段式生成：开启之后根据设定的值来决定多少个文件合并成一个数据文件，文件与文件之间的分割符可自定义，
          此功能主要用于减少碎文件过多的问题！
        </div>
      </div>

      <el-row>
        <el-col :span="2">
          <span>分段式生成</span>
        </el-col>
        <el-col :span="22">
          <el-switch
            style="display: block"
            v-model="value4"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="switchChange"
          ></el-switch>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="box-card" v-show="showGroup">
      <el-row>
        <el-col :span="6">
          <span>生成时，每个数据文件合并表格数</span>
        </el-col>
        <el-col :span="18">
          <el-input-number
            v-model="num8"
            controls-position="right"
            @change="handleChange"
            :min="1"
            :max="10"
          ></el-input-number>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <span>生成数据文件的数据块分隔符</span>
        </el-col>
        <el-col :span="18">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="box-card">
      <el-row>
        <el-col :span="6">
          <span>选择需要生成的分支</span>
        </el-col>
        <el-col :span="18">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <span>选择需要生成的格式</span>
        </el-col>
        <el-col :span="18">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-button type="success" round>开始生成</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  data() {
    return {
      value3: true,
      value4: true,
      num8: 1,
      options: [
        {
          value: "选项1",
          label: "主干"
        },
        {
          value: "选项2",
          label: "渠道1"
        }
      ],
      value: "",
      showGroup: true,
      textarea: ""
    };
  },

  methods: {
    handleChange(value) {
      console.log(value);
    },
    handleOpen() {},
    handleClose() {},
    switchChange(value) {
      this.showGroup = value;
    }
  }
};
</script>

<style scoped>
.tipsblock {
  color: #409eff;
  border-radius: 3px;
  text-align: left;
  padding-left: 30px;
  padding-right: 30px;
  line-height: 30px;
  vertical-align: top;
}

.tipsText {
  line-height: 30px;
  text-align: left;
  padding-left: 10px;
}

.productSwitch {
  line-height: 80px;
  padding-top: 5px;
  width: 40px;
}

.el-main {
  text-align: inherit;
}
</style>
