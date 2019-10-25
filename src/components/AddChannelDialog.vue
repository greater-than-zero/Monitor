<template>
  <el-dialog title="添加渠道" :visible.sync="dialogIsShow" width="50%" center>
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="映射渠道名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="映射渠道目录">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClickCanel">取 消</el-button>
      <el-button type="primary" @click="onClickOK">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "AddChannelDialog",
  data: function() {
    return {
      dialogIsShow: false,
      form: {
        name: "",
        desc: ""
      }
    };
  },

  methods: {
    onClickCanel: function() {
      this.dialogIsShow = false;
    },
    onClickOK: function() {
      this.dialogIsShow = false;
      this.$emit("click", this.form);
    },
    show() {
      this.dialogIsShow = true;
    }
  }
};
</script>

<style scoped>
</style>
