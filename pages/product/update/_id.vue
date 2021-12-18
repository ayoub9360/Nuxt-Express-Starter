<template>
  <div class="container">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css" rel="stylesheet" />

    <div v-if="success" class="completed">
      <p>{{ success }}</p>
      <nuxt-link class="text-blue-500 hover:text-blue-800" to="/product/get">List of posts</nuxt-link>
    </div>

    <form v-if="!success" class="w-full max-w-sm" @submit.prevent="editPost">
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
            Title
          </label>
        </div>
        <div class="md:w-2/3">
          <input
            id="inline-full-name"
            v-model="form.title"
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            value="Jane Doe"
            placeholder="Title"
          />
        </div>
      </div>

      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
            Description
          </label>
        </div>
        <div class="md:w-2/3">
          <input
            id="inline-password"
            v-model="form.description"
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            placeholder="Description"
          />
        </div>
      </div>

      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
            Image Url
          </label>
        </div>
        <div class="md:w-2/3">
          <input
            id="inline-password"
            v-model="form.imageUrl"
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            placeholder="Image Url"
          />
        </div>
      </div>

      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
            price
          </label>
        </div>
        <div class="md:w-2/3">
          <input
            id="inline-password"
            v-model="form.price"
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="number"
            placeholder="Price"
          />
        </div>
      </div>

      <p v-if="error" class="text-red-600">{{ error }}</p>

      <div class="md:flex md:items-center">
        <div class="md:w-1/3"></div>
        <div class="md:w-2/3">
          <button
            class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Envoyer
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, route, store, env, params, query, req, res, redirect, error }) {
    const data = await $axios
      .get('api/post/' + params.id)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
    return { data }
  },
  data() {
    return {
      form: {
        title: null,
        description: null,
        imageUrl: null,
        price: 0,
      },
      error: null,
      success: null,
    }
  },
  mounted() {
    this.form = this.data
  },
  methods: {
    editPost() {
      this.$axios
        .put('api/post/' + this.$route.params.id, {
          title: this.form.title,
          description: this.form.description,
          imageUrl: this.form.imageUrl,
          price: this.form.price,
        })
        .then((response) => {
          this.success = 'Post updated'
        })
        .catch((error) => {
          this.error = error.response.data.message
        })
    },
  },
}
</script>

<style lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  min-width: 100%;
}
</style>
