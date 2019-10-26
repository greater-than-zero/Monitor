<template>
  <div class="mainItem">
    <el-checkbox :label="tableName" border size="medium" @change="onCheckBoxhange"></el-checkbox>
    <el-input class="itemInput" :placeholder="tableName" v-model="input" :disabled="isDisabledInput"></el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      isDisabledInput: true
    };
  },
  props: {
    tableName: String
  },
  methods: {
    onCheckBoxhange(value) {
      if (value) {
        this.isDisabledInput = false;
      } else {
        this.isDisabledInput = true;
      }
    }
  }
};
</script>

<style>
.mainItem {
  display: flex;
  flex-direction: row;
}

.itemInput {
  margin-left: 5px;
}
</style>