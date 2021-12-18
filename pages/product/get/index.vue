<template>
  <div class="card-container">
    <h1 v-if="data.length < 1">No post available</h1>
    <Card v-for="(item, index) in data" :key="index" :data="item" />
  </div>
</template>

<script>
export default {
  async asyncData({ isDev, $axios, route, store, env, params, query, req, res, redirect, error }) {
    const data = await $axios.get('/api/post')
    return { data: data.data }
  },
}
</script>

<style lang="scss" scoped>
.card-container {
  min-height: calc(100vh - 64px);
  background-color: rgba(243, 244, 246, 1);
  padding: 64px;
  display: flex;
}
</style>
