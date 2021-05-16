<!--
[elementui+vuejs如何添加表格操作按钮](https://blog.csdn.net/QQ_Empire/article/details/83375071)

-->
<template>
  <div>
    <h1>评论管理</h1>
    <el-button type="primary" @click="getCommentList">获取所有评论</el-button>

    <el-table :data="tableData"
              style="width: 100%"
              :cell-style="rowStyle"
              :header-cell-style="headStyle"
    >
      <el-table-column
        prop="commentAuthor"
        label="评论作者"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="pinAuthor"
        label="梦卡作者"
        width="150"
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
        prop="comment"
        label="评论内容"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="upCreateTime"
        :formatter="timeFormatter"
        label="评论时间"
        width="160"
      >
      </el-table-column>
      <el-table-column
        prop="likeNum"
        label="评论受赞量"
        width="100"
      >
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="100">
        　　　　
        <template slot-scope="scope">
          　　　　　　
          <el-button type="danger" @click="del(scope.row.commentAuthor)">删除</el-button>
          　　　　
        </template>
        　　
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { formatTime, formatTableRow, formatTableHeader } from '@/utils/formatters'

export default {
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    getCommentList() {
      this.getRequest('/get-all-comment').then(res => {
        this.tableData = res.object
      }).catch(err => {
        console.log(err)
      })
    },
    timeFormatter(row, col, value) {
      return formatTime(row, col, value)
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
