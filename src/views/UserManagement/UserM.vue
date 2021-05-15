<template>
<div>
  <h1>用户管理</h1>
  <el-button type="primary" @click="getUserList">获取所有用户</el-button>
</div>
</template>

<script>
import {getAllUser} from '@/api/users'
export default {
  methods: {
    getUserList() {
      getAllUser().then(res=>{
        if (res) {
          console.log(res)
        }
      }).catch(err=>{
        console.log('------------')
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
