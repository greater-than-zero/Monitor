<template>
  <el-dialog title="添加渠道" :visible.sync="dialogIsShow" width="50%" center>
    <el-form ref="form" :model="form" label-width="130px">
      <el-form-item label="映射表格功能名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="表格名">
        <el-input v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="子表列表">
        <div v-for="table of tables" :key="table">
          <AddTableInfoItem ref="AddTableInfoItem" :tableName="table"></AddTableInfoItem>
          <div style="margin-bottom:5px"></div>
        </div>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClickCanel">取 消</el-button>
      <el-button type="primary" @click="onClickOK">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import AddTableInfoItem from "@/components/AddTableInfoItem";

export default {
  name: "AddChannelDialog",
  components: {
    AddTableInfoItem
  },
  data: function() {
    return {
      dialogIsShow: false,
      form: {
        name: "",
        desc: "",
        childs: []
      },
      tables: ["sdad", "sdad1", "sdad2", "sdad2"]
    };
  },

  methods: {
    onClickCanel: function() {
      this.dialogIsShow = false;
    },
    onClickOK: function() {
      let childList = [];
      for (let item of this.$refs.AddTableInfoItem) {
        childList.push({
          tableName: item.tableName,
          isSelect: item.isDisabledInput
        });
      }

      this.form.childs = childList;
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
