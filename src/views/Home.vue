<template>
  <div class="home">
    <el-container>
      <el-aside width="230px">
        <NavMenu></NavMenu>
      </el-aside>
      <el-container>
        <el-header height="50px">
          <HomeHeader></HomeHeader>
		</el-header>
		<el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import NavMenu from '@/components/NavMenu.vue'
import HomeHeader from '@/components/HomeHeader.vue'

export default {
  name: 'home',
  components: {
    NavMenu,
	HomeHeader
  }
}
</script>

<style scoped>
.home {
  height: 100%;
}

.el-container {
  height: 100%;
  background-color: rgba(0,0,0,0.02);
}

.el-aside {

}

.el-header {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
  background-color: white;
}

.el-main {
  margin: 15px 15px;
  background-color: white;
  border-radius: 2px;
}
</style>
