<!-- This file is a part of a tutorial and I use it as a refrence -->
<template>
  <div class="container">
    <h1>Latest Posts</h1>
    <div class="create-post">
      <label for="create-post">Write a post:</label>
      <input type="text" v-model="text" placeholder="Write the text here" id="create-post">
      <button v-on:click="createPost">Save</button>
    </div>

    <hr>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="post-container">
      <div class="post"
      v-for="(post, index) in posts"
      v-bind:item="post"
      v-bind:index="index"
      v-bind:key="post._id"
      v-on:dblclick="deletePost(post._id)"
      >
        <div class="created-at">
          {{ `${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}` }}
        </div>
        <p class="text">{{ post.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from '../PostService';

export default {
  name: 'PostComponent',
  data() {
    return {
      posts: [],
      error: '',
      text: ''
    }
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.text);
      this.posts = await PostService.getPosts();
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    }
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch (err) {
      this.error = err.message;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

div {
  &.container {
    max-width: 800px;
    margin: 0 auto;
  }

  &.post {
    position: relative;
    border: 1px solid green;
    background-color: lightblue;
    padding: 10px 10px 30px 10px;
    margin-bottom: 15px;
  }

  &.created-at {
    position: absolute;
    top: 0;
    left: 0;
    padding: 5px 15px 5px 15px;
    background-color: darkgreen;
    color: white;
    font-size: 13px;
  }
}

p {
  &.error {
    border: 1px solid red;
    background-color: pink;
    padding: 10px;
    margin-bottom: 15px;
  }

  &.text {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 0;
  }

}

</style>
