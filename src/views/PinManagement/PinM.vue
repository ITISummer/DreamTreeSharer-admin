<template>
  <div>
    <h1>梦卡管理</h1>
    <el-button type="primary" @click="getPinList">获取所有梦卡</el-button>

    <el-table :data="tableData"
              style="width: 100%"
              :cell-style="rowStyle"
              :header-cell-style="headStyle"
    >
      <el-table-column
        prop="userUsername"
        label="作者"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="pinboardId"
        label="梦卡Id"
        width="300"
      >
      </el-table-column>
      <el-table-column
        prop="pinboardTitle"
        label="标题"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="pinboardContent"
        label="内容"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="pinboardBgimgUrl"
        label="背景图"
        width="150"
      >
        <template slot-scope="scope">
          <el-image fit="cover" style="width: 100px; height: 100px" :src="scope.row.pinboardBgimgUrl"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="pinboardCreateTime"
        :formatter="timeFormatter"
        label="创建时间"
        width="160"
      >
      </el-table-column>
      <el-table-column
        prop="pinboardType"
        label="类型"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="pinboardSharable"
        :formatter="booleanFormatter"
        label="是否共享"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="likeNum"
        label="点赞量"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="favoriteNum"
        label="收藏量"
        width="100"
      >
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="100">
        　　　　
        <template slot-scope="scope">
          　　　　　　
          <el-button type="danger" @click="del(scope.row.pinboardId)">删除</el-button>
          　　　　
        </template>
        　　
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { formatTime, formatBoolean, formatTableRow, formatTableHeader } from '@/utils/formatters'

export default {
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    getPinList() {
      this.getRequest('/get-all-pin').then(res => {
        this.tableData = res.object
      }).catch(err => {
        console.log(err)
      })
    },
    booleanFormatter(row, column, value) {
      return formatBoolean(row, column, value)
    },
    timeFormatter(row, column, value) {
      return formatTime(row, column, value)
    },
    del(value) {
      alert(value)
    },
    rowStyle() {
      return formatTableRow()
    },
    headStyle() {
      return formatTableHeader()
    }

  }
}
</script>

<style scoped lang="scss">

</style>
