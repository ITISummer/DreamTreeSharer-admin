<!--
[elementui+vuejs如何添加表格操作按钮](https://blog.csdn.net/QQ_Empire/article/details/83375071)

-->
<template>
  <div>
    <h1>评论管理</h1>
    <el-button type="primary" @click="getCommentList" :disabled="!this.enableBtn">获取所有评论</el-button>

    <el-table :data="tableData"
              style="width: 100%"
              :cell-style="rowStyle"
              :header-cell-style="headStyle"
    >
      <el-table-column
        prop="commentAuthor"
        label="评论者"
        width="100"
      />
      <el-table-column
        prop="pinAuthor"
        label="梦卡作者"
        width="100"
      />
      <el-table-column
        prop="pinboardTitle"
        label="标题"
        width="100"
      />
      <el-table-column
        prop="pinboardContent"
        label="内容"
        width="180"
      />
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
        width="180"
      />
      <el-table-column
        prop="upCreateTime"
        :formatter="timeFormatter"
        label="评论时间"
        width="160"
      />
      <el-table-column
        prop="likeNum"
        label="评论受赞量"
        width="100"
      />
      <el-table-column label="操作" align="center" min-width="100" fixed="right">
        <template slot-scope="scope">
          <el-button type="danger" @click="del(scope.row.commentId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="display: flex;justify-content: flex-end">
      <el-pagination
        background
        @current-change="currentChange"
        @size-change="sizeChange"
        layout='sizes, prev, pager, next, ->, total'
        :page-size="this.pages.size"
        :total="this.pages.total"/>
    </div>
  </div>
</template>

<script>
import { formatTime, formatTableRow, formatTableHeader } from '@/utils/formatters'

export default {
  data() {
    return {
      tableData: [],
      enableBtn: true,
      pages: {
        total: 0,
        currentPage: 1, // default current page value
        size: 10 // default display count
      }
    }
  },
  methods: {
    sizeChange(pageSize) {
      this.pages.size = pageSize
      this.getCommentList()
    },
    /**
     * when change current page
     */
    currentChange(currentPage) {
      this.pages.currentPage = currentPage
      this.getCommentList()
    },
    /**
     * get comment list
     */
    getCommentList() {
      this.getRequest(`/get-all-comment/${this.pages.currentPage}/${this.pages.size}`).then(res => {
        if (res) {
          console.log(res)
          this.pages.total = res.object.total
          this.tableData = res.object.records
          this.enableBtn = false
        }
      }).catch(err => {
        console.log(err)
      })
    },
    /**
     * format time style
     */
    timeFormatter(row, col, value) {
      return formatTime(row, col, value)
    },
    /**
     * delete operation
     */
    del(value) {
      alert(value)

      this.$confirm('此操作将永久删除该评论，是否继续？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '删除',
        type: 'warning'
      }).then(() => {
        this.deleteRequest(`delete-a-comment/${value}`).then(res=>{
          if (res) {
            this.getCommentList();
          }
        }).catch(err=>{

        })
      }).catch(err=>{
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      })
    },
    /**
     * format row style
     */
    rowStyle() {
      return formatTableRow()
    },
    /**
     * format head style
     */
    headStyle() {
      return formatTableHeader()
    }
  }
}
</script>
