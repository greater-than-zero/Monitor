<template>
  <div class="home">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>所有渠道</span>
        <el-button size="mini" style="float: right;" type="primary" @click="addChannel()">新增渠道</el-button>
      </div>

      <el-table :data="channelData" style="width: 100%">
        <el-table-column label="ID" width="180" fixed>
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.$index }}</span>
          </template>
        </el-table-column>
        <el-table-column label="映射渠道名" width="180">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">{{ scope.row.name }}</div>
          </template>
        </el-table-column>

        <el-table-column label="映射渠道目录" width="180">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">/{{ scope.row.path }}</el-tag>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>所有表格</span>
        <el-button size="mini" style="float: right;" type="primary" @click="addTable()">新增表格</el-button>
      </div>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="ID" width="180" fixed>
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.$index }}</span>
          </template>
        </el-table-column>
        <el-table-column label="映射表格功能名" width="180">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">{{ scope.row.name }}</div>
          </template>
        </el-table-column>

        <el-table-column label="表格名" width="180">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium" type="danger">{{ scope.row.path }}</el-tag>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="子表情况" width="180">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <div v-for="child of scope.row.childs" :key="child">
                <div v-if="child.isSelect">
                  <el-tag size="medium" type="danger">已导出：{{ child.tableName }}</el-tag>
                </div>
                <div v-else>
                  <el-tag size="medium" type="success">未导出：{{ child.tableName }}</el-tag>
                </div>
                <div style="margin-bottom:5px"></div>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>数据监视</span>
        <el-button
          size="mini"
          style="float: right;"
          type="primary"
          @click="handleEdit(scope.$index, scope.row)"
        >新建数据监视</el-button>
      </div>
      <ve-line :data="chartData"></ve-line>
      <ve-histogram :data="chartData"></ve-histogram>
      <ve-ring :data="chartData"></ve-ring>
    </el-card>
    <AddChannelDialog ref="AddChannelDialog" v-on:click="onAddChannel"></AddChannelDialog>
    <AddTableDialog ref="AddTableDialog" v-on:click="onAddTable"></AddTableDialog>
  </div>
</template>

<script>
import AddChannelDialog from "@/components/AddChannelDialog";
import AddTableDialog from "@/components/AddTableDialog";

export default {
  name: "about",
  components: {
    AddChannelDialog,
    AddTableDialog
  },

  data() {
    return {
      tableData: [],
      channelData: [],

      chartData: {
        columns: ["日期", "访问用户", "下单用户", "下单率"],
        rows: [
          { 日期: "1/1", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "1/2", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: "1/3", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: "1/4", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: "1/5", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: "1/6", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
        ]
      }
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    addChannel() {
      this.$refs.AddChannelDialog.show();
    },
    onAddChannel(form) {
      this.channelData.push({
        name: form.name,
        path: form.desc
      });
    },
    addTable() {
      this.$refs.AddTableDialog.show();
    },
    onAddTable(form) {
      this.tableData.push({
        name: form.name,
        path: form.desc,
        childs: form.childs
      });
    }
  }
};
</script>