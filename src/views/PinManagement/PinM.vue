<!--      <el-table-column-->
<!--        prop="pinboardType"-->
<!--        label="类型"-->
<!--        width="100"-->
<!--      >-->
<!--      </el-table-column>-->
<template>
  <div>
    <h1>梦卡管理</h1>
    <el-button type="primary" @click="getPinList" :disabled="!this.enableBtn">获取所有梦卡</el-button>

    <el-table :data="tableData"
              style="width: 100%"
              :cell-style="rowStyle"
              :header-cell-style="headStyle"
    >
      <el-table-column
        prop="userUsername"
        label="作者"
        width="100"/>
      <el-table-column
        prop="pinboardId"
        label="梦卡Id"
        width="300"/>
      <el-table-column
        prop="pinboardTitle"
        label="标题"
        width="150"/>
      <el-table-column
        prop="pinboardContent"
        label="内容"
        width="150"/>
      <el-table-column
        prop="pinboardBgimgUrl"
        label="背景图"
        width="150">
        <template slot-scope="scope">
          <el-image fit="cover" style="width: 100px; height: 100px" :src="scope.row.pinboardBgimgUrl"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="pinboardCreateTime"
        :formatter="timeFormatter"
        label="创建时间"
        width="160"/>
      <el-table-column
        prop="pinboardSharable"
        :formatter="booleanFormatter"
        label="是否共享"
        width="100"/>
      <el-table-column
        prop="likeNum"
        label="点赞量"
        width="100"/>
      <el-table-column
        prop="favoriteNum"
        label="收藏量"
        width="100"/>
      <el-table-column label="操作" align="center" min-width="100" fixed="right">
        <template slot-scope="scope">
          <el-button type="danger" @click="del(scope.row.pinboardId)">删除</el-button>
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
import { formatTime, formatBoolean, formatTableRow, formatTableHeader } from '@/utils/formatters'

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
      this.getUserList()
    },
    /**
     * when change current page
     */
    currentChange(currentPage) {
      this.pages.currentPage = currentPage
      this.getUserList()
    },
    /**
     * get pinboard list
     */
    getPinList() {
      this.getRequest(`/get-all-pin/${this.pages.currentPage}/${this.pages.size}`).then(res => {
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
     * boolean value formatter
     */
    booleanFormatter(row, column, value) {
      return formatBoolean(row, column, value)
    },
    /**
     * time string formatter
     */
    timeFormatter(row, column, value) {
      return formatTime(row, column, value)
    },
    /**
     * delete operation
     */
    del(value) {
      alert(value)
      this.$confirm('此操作将永久删除该愿望卡即相关信息，是否继续？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '删除',
        type: 'warning'
      }).then(() => {
        this.deleteRequest(`delete-a-pin/${value}`).then(res=>{
          if (res) {
            this.getPinList();
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
     * format table row style
     */
    rowStyle() {
      return formatTableRow()
    },
    /**
     * format table head style
     */
    headStyle() {
      return formatTableHeader()
    }

  }
}
</script>
