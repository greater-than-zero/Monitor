<template>
  <div>
    <el-row>
      <el-col :span="5">
        <el-checkbox label="tableName" border size="medium"></el-checkbox>
      </el-col>
      <el-col :span="19">
        <div style="margin-left: 30px;">
          <el-input placeholder="tableName" v-model="input"></el-input>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: ""
    };
  },
  props: {
    tableName: String
  },
  methods: {
    handleIconClick: function() {}
  }
};
</script>