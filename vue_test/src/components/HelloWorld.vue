<template>
  <div class="hello">
    <input type="checkbox" :checked="checked_1" @change="change" />
    <h1>这是组件里面的内容</h1>

    <button @click="close">关闭组件</button>

    <!-- v-model
还有一种数据的交互方式是使用 v-model， 这种方法专门是 input 组件， 这只不过是 一种语法糖的形式：
input 组件上面本身有一个 onInput 事件。每当素输入框内容发生发生的时候，就会触发这个事件，然后把 input 的值 通过 $emit 传递出去。 -->
    <!-- 下面两个表达 实现同样的效果 -->
    <!-- <input v-model='val'>
<input :value='val' @input="val = $event.target.value"/>

这里需要注意的是 v-model 默认情况下只会接受 value 属性和响应 input 事件。 因为 v-model 本身是基于 input 框定制的， 
value 是 input 内部定制的绑定值的属性， input 方法是内部定制的当值改变出发的事件。

 -->
  </div>
</template>

<script>
import {Song} from './Song.js'
export default {
  name: "HelloWorld",
  model: {
    prop: "checked_1",
    event: "onchange", // onchange 事件
  },
  props: {
    checked_1: {
      type: Boolean,
      required: true,
    },
    type: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      type: 0,
    };
  },

  methods: {
    close(event) {
      console.log(`----------------------->>>  close: `);
    },
    change(event) {
      console.log(`----------------------->>>  type: `, this.type);
      let a = { type: this.type, checked: event.target.checked };
      this.$emit("onchange", a);
      let song = new Song({
        id:1,
        mid:function(aa,bb){
          
        }
      })
      this.aaa.call(this, '1','2');
      // let aa = this.aaa.call(this);
      // console.log(`------------->>  aa: `, aa);
    },

    bbb(aa,bb) {

      
    },

    aaa() {
      console.log(`------------->>  aaa: `);

      return (aa,bb) => {
        console.log(`------------->>  a: `);
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.hello {
}
</style>
