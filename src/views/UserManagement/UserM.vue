<!--      <el-table-column-->
<!--        prop="userSex"-->
<!--        label="用户性别"-->
<!--        width="100"-->
<!--      >-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="userBirthday"-->
<!--        label="用户生日"-->
<!--        width="100"-->
<!--      >-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="userDescription"-->
<!--        label="用户描述"-->
<!--        width="180"-->
<!--      >-->
<!--      </el-table-column>-->
<template>
  <div>
    <h1>用户管理</h1>
    <el-button type="primary" @click="getUserList" :disabled="!this.enableBtn">获取所有用户</el-button>

    <el-table :data="tableData"
              style="width: 100%"
              :cell-style="rowStyle"
              :header-cell-style="headStyle"
    >
      <el-table-column
        prop="userId"
        label="用户Id"
        width="300"
      />
      <el-table-column
        prop="userUsername"
        label="用户名"
        width="100"
      />
      <el-table-column label="用户头像" width="100" prop="userAvatarUrl">
        <template slot-scope="scope" property="userAvatarUrl">
          <el-avatar size="large" :src="'http://qt72k9qhl.hb-bkt.clouddn.com/'+scope.row.userAvatarUrl"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column
        prop="userPhone"
        label="用户手机号"
        width="150"
      />
      <el-table-column
        prop="userEmail"
        label="用户邮箱"
        width="150"
      />
      <el-table-column
        prop="userCreateTime"
        :formatter="timeFormatter"
        label="用户注册时间"
        width="160"
      />
      <el-table-column
        prop="userEnabled"
        :formatter="booleanFormatter"
        label="用户是否启用"
        width="120"
      >
        <template slot-scope="scope">
          <select v-model="scope.row.userEnabled">
            <option value="true" label="是"></option>
            <option value="false" label="否"></option>
          </select>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="100" fixed="right">
        <template slot-scope="scope">
          <el-button type="danger" @click="update(scope.row.userId,scope.row.userEnabled)">更新</el-button>
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
import { formatBoolean, formatTime, formatTableHeader, formatTableRow } from '@/utils/formatters'

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
     * get user list
     */
    getUserList() {
      this.getRequest(`/get-all-user/${this.pages.currentPage}/${this.pages.size}`).then(res => {
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
      return formatBoolean(row, column, !value)
    },
    /**
     * time formatter
     */
    timeFormatter(row, column, value) {
      return formatTime(row, column, value)
    },
    /**
     * update operation
     */
    update(userId, enable) {
      this.putRequest(`/disable-a-user/${userId}/${enable}`).then(res => {}).catch(err => {
        console.log(err)
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
