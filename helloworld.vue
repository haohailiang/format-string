<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    click() {}
  }
}
</script>

<template>
  <button @click="click">Count is: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
