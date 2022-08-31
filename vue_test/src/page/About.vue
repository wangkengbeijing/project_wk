<template>
  <div>
    <!--    <h1>我是About的内容 position: static;</h1>
    <p>
      设置 position: static;
      的元素不会以任何特殊方式定位；它是始终根据页面的正常流进行定位：
    </p>
    <div class="static">这个 div 元素设置 position: static;</div>
 -->
    <div class="static">这个 div 元素设置 position: static;</div>
    <div class="relative">
      <!--  <div class="content"></div>
      <div class="content_static"></div>
      <div class="content_relative"></div> -->
      <div class="content_relative">relative</div>
      <div class="content_static">static</div>
      <div class="content_absolute">absolute</div>
      <div class="content_fixed">fixed</div>
      <button @click="onSubmit">点击</button>
    </div>

    <div style="width: 200px; height: 200px; background-color: green">
      <div class="style_r">1</div>
      <div style="width: 100px; height: 100px; background-color: #ccf">2</div>
    </div>
  </div>
</template>

$myColor: red;
<script>
export default {
  name: "About",
  methods: {
    testAwait() {
      return new Promise((resolve, reject) => {
        // let sino = parseInt(Math.random() * 6 + 1);
        
        setTimeout(() => {
          resolve("---------------");
        }, 3000);
      }).catch((e) => {});
    },
    async helloAsync() {
      let n = await testAwait();
      console.log("----------helloAsync---------");
      // console.log(n);
    },
    onSubmit() {
      console.log("-------------------");
      this.helloAsync();
    },
  },
};
</script>
<style lang="scss" scoped>

.static {
  position: static;
  border: 3px solid #73ad21;
}

.style_r {
  width: 50px;
  height: 50px;
  background-color: #cff;
  margin-left: 10px;
  margin-top: 10px;
  padding: 10px;
  border: 10px solid red;
  position: relative;
}
.container {
  background-color: #868686;
  width: 100%;
  height: 300px;
  position: static;
}

/* elative定位相对于最近的父元素（无论父元素如何定位），
absolute定位相对于最近的不是static定位的父元素进行定位。 */
.relative {
  background-color: aqua;
  width: 100%;
  height: 300px;
  position: relative;
}
.content {
  background-color: yellow;
  width: 100px;
  height: 100px;
  position: static;
  left: 10px; /* 这个left没有起作用 */
}
.content_static {
  background-color: red;
  width: 100px;
  height: 50px;
  position: static;
  color: white;
  text-align: center;

  left: 10px; /* 这个left没有起作用 */
}
.content_relative {
  background-color: blue;
  width: 100px;
  height: 50px;
  color: white;
  text-align: center;
  position: relative;
  left: 10px;
  top: 10px;
}
/* 绝对定位，相对第一个不是static定位的父元素定位，若其父层都是static，则相对body进行定位，元素悬浮，脱离正常文本且其在正常文本流中的位置不存在。 */
.content_absolute {
  background-color: #73ad21;
  width: 100px;
  height: 50px;
  position: absolute;
  color: white;
  text-align: center;
  right: 10px;
  top: 10px;
}
.content_fixed {
  background-color: darksalmon;
  width: 100px;
  height: 50px;
  position: fixed;
  text-align: center;
  color: white;
  left: 10px;
  top: 10px;
}
</style>
