<template>
  <div>
    <button @click="dianji">Hello点击</button>
  </div>
</template>

<script>
export default {
  name: "Hello",
  data() {
    return {};
  },
  computed: {},
  methods: {
    dianji(ev) {
      console.log(`-----hello---dianji-------`);
    },
  },
};
</script>
