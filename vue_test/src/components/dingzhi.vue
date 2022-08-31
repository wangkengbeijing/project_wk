<template>
  <div>
    <p>vue 高级特性</p>
    <hr />

    <!-- 自定义 v-model -->
    <p>{{ name }}</p>
    <CustomModel v-model="name" />
    <!-- 等同于 -->
    <!-- <CustomModel :value="name"  @change1="name = $event"></CustomModel> -->
  </div>
</template>

<script>
import CustomModel from "./CustomModel.vue";
export default {
  data() {
    return {
      name: "小米",
    };
  },
  components: {
    CustomModel,
  },
};
</script>

<style lang="cass" scoped></style>
