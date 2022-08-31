<template>
  <div>
    <div>
      <div>
        <button @click="dianji">Hello点击</button>
        <Hello></Hello>
      </div>

      <div class="row">
        <div class="col-xs-2 col-xs-offset-2">
          <div class="list-group">
            <!-- 原始html中我们使用a标签实现页面的跳转 -->
            <!-- <a class="list-group-item active" href="./about.html">About</a> -->
            <!-- <a class="list-group-item" href="./home.html">Home</a> -->

            <!-- Vue中借助router-link标签实现路由的切换 -->
            <router-link
              class="list-group-item"
              active-class="active"
              to="/about"
            >
              About
            </router-link>
            <router-link
              class="list-group-item"
              active-class="active"
              to="/home"
            >
              Home
            </router-link>
          </div>
        </div>
        <div class="col-xs-6">
          <div class="panel">
            <div class="panel-body">
              <!-- 指定组件的呈现位置 -->
              <router-view></router-view>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <Count class="ss" />
      <hr />
      <Person />
    </div>
  </div>
</template>

<script>
import Count from "./components/Count";
import Person from "./components/Person";
import Hello from "./components/Hello";
export default {
  name: "App",
  components: { Count, Person, Hello },
  mounted() {
    // console.log('App',this)
  },
  methods: {
    dianji(ev) {
      console.log(`-----hello---dianji-------`);
    },
  },
};
</script>
<style lang="scss" scoped>
// ::v-deep .ss {
//   color: blue;
// }
.ass {
  ::v-deep .ss {
    color: blue;
  }
}
</style>
