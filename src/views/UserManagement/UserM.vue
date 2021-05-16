<template>
  <div>
    <h1>用户管理</h1>
    <el-button type="primary" @click="getUserList">获取所有用户</el-button>

    <el-table :data="tableData"
              style="width: 100%"
              :cell-style="rowStyle"
              :header-cell-style="headStyle"
    >
      <el-table-column
        prop="userId"
        label="用户Id"
        width="300"
      >
      </el-table-column>
      <el-table-column
        prop="userUsername"
        label="用户名"
        width="100"
      >
      </el-table-column>
      <el-table-column label="用户头像" width="100" prop="userAvatarUrl">
        <template slot-scope="scope" property="userAvatarUrl">
          <el-avatar size="large" :src="'http://qrne6et6u.hn-bkt.clouddn.com/'+scope.row.userAvatarUrl"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column
        prop="userPhone"
        label="用户手机号"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="userEmail"
        label="用户邮箱"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="userCreateTime"
        :formatter="timeFormatter"
        label="用户注册时间"
        width="160"
      >
      </el-table-column>
      <el-table-column
        prop="userSex"
        label="用户性别"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="userBirthday"
        label="用户生日"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="userDescription"
        label="用户描述"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="userEnabled"
        :formatter="booleanFormatter"
        label="用户是否被禁用"
        width="120"
      >
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="100">
        　　　　
        <template slot-scope="scope">
          　　　　　　
          <el-button type="danger" @click="del(scope.row.userId)">更新</el-button>
          　　　　
        </template>
        　　
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { formatBoolean, formatTime, formatTableHeader, formatTableRow } from '@/utils/formatters'

export default {
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    getUserList() {
      this.getRequest('/get-all-user').then(res => {
        if (res) {
          this.tableData = res.object
          console.log(res)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    booleanFormatter(row, column, value) {
      return formatBoolean(row, column, !value)
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
