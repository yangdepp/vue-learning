<template>
  <div id="app">
    <div id="cover">
       <Header></Header>
       <Todo></Todo>
       <Footer></Footer>
    </div>
  </div>
</template>
<script>
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import Todo from './views/todo/todo.vue'
export default {
  data () {
    return {
    }
  },
  components: {
    Header,
    Footer,
    Todo
  }
}
</script>
<style lang="stylus" scoped>
    #app {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
    #cover {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: #ccc;
        opacity: .8;
    }
</style>
