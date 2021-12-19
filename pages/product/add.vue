<template>
  <div class="container">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css" rel="stylesheet" />

    <div v-if="success" class="completed">
      <p>{{ success }}</p>
      <nuxt-link class="text-blue-500 hover:text-blue-800" to="/product/get">List of posts</nuxt-link>
    </div>

    <form v-if="!success" class="w-full max-w-sm" @submit.prevent="addPost">
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
  methods: {
    addPost() {
      this.error = null

      // check if all fields are filled
      if (!this.form.title || !this.form.description || !this.form.imageUrl || !this.form.price)
        return (this.error = 'Please fill all fields')

      // Send post request with axios
      this.$axios
        .post('/api/post', {
          title: this.form.title,
          description: this.form.description,
          imageUrl: this.form.imageUrl,
          price: this.form.price,
          userId: '61ba29e4d706f81f8da8589d',
        })
        .then((response) => {
          this.success = 'Post added successfully'
        })
        .catch(() => {
          this.error = 'A problem occured, please try check your information and try again later'
        })
    },
  },
}
</script>

<style lang="scss">
.container {
  min-height: calc(100vh - 64px);
  background-color: rgba(243, 244, 246, 1);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
