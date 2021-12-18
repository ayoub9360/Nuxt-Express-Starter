<template>
  <div class="card-container">
    <p>{{ data.title }}</p>
    <p>{{ data.price }}</p>
    <p>{{ data.description }}</p>
  </div>
</template>

<script>
export default {
  async asyncData({ isDev, $axios, route, store, env, params, query, req, res, redirect, error }) {
    const data = await $axios.get('/api/post/' + params.id)
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
