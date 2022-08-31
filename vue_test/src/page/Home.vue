<template>
  <div>
    <h1>我是Home的内容</h1>
    <nav>
      <ul>
        <li><a href="/html/">HTML</a></li>
        <li><a href="/css/">CSS</a></li>
        <li><a href="/js/">JavaScript</a></li>
        <li><a href="/jquery/">jQuery</a></li>
      </ul>
    </nav>
    <div @click="dianji">点击</div>

    <!-- 第二种写法 v-model -->
    <!-- <HelloWorld :value="showFlag" @onchange="showFlag = $event"></HelloWorld> -->
    <HelloWorld
      :value="showFlag1"
      :type="1"
      @onchange="showChange"
    ></HelloWorld>
    <HelloWorld
      :type="2"
      :value="showFlag2"
      @onchange="showChange"
    ></HelloWorld>
    <!-- <HelloWorld v-model="showFlag" @onchange="showChange" ></HelloWorld>
    <HelloWorld v-model="showFlag" @onchange="showChange"></HelloWorld> -->
    <div v-show="showFlag">如果选择框打勾我就会显示。</div>

    <button @click="showFlag = true">打开组件</button>
  </div>
</template>

<script>
import HelloWorld from "../components/HelloWorld.vue";
export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data() {
    return {
      showFlag1: false,
      showFlag2: false,
    };
  },
  methods: {
    showChange(v) {
      let{
        type,
        checked,
      } = v;
      if (type == 1) {
        this.showFlag1 = checked;
        console.log( `----------------------->>>  this.showFlag1 = v: `,this.showFlag1 );
      } else if (type == 2) {

        this.showFlag2 = checked
        console.log(`----------------------->>>  checked: `, this.this.showFlag2);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
/* 定义变量与值 */
$bgcolor: #73ad21;
$textcolor: red;
$fontsize: 18px;
h1 {
  $textcolor: green; // 只在 h1 里头有用，局部作用域
  background-color: $bgcolor;
  color: $textcolor;
  font-size: $fontsize;
}
h2 {
  background-color: $bgcolor;
  color: $textcolor;
  font-size: $fontsize;
}

nav > {
  //子选择器
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
}
nav {
  + li {
    //兄弟选择器
    display: block;
  }
}

nav {
  //后代选择器
  a {
    display: block;
    padding: 3px 6px;
    text-decoration: none;
  }
}
</style>
