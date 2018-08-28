<template>
  <div class="real-app">
    <input
      type="text"
      class="add-input"
      :autofocus="true"
      placeholder="接下来要做什么?"
      v-model="inputValue"
      @keyup.enter="addTodo">
    <item v-for="(todo,index) in filteredTodos" :todo="todo" :key="index" @del="deleteTodoItem"></item>
    <tabs :filter="filter" :todos="todos" @toggle="toggle" @clearAll="clearAll"></tabs>
  </div>
</template>
<script>
import item from "./item.vue";
import tabs from "./tabs.vue";
let id = 0;
export default {
  data() {
    return {
      todo: {
        id: 0,
        content: "this is todo",
        completed: false
      },
      todos: [],
      filter: "all",
      inputValue: ""
    };
  },
  methods: {
    addTodo() {
      if(this.inputValue){
        this.todos.unshift({
          id: id++,
          content: this.inputValue,
          completed: false
        });
        this.inputValue = "";
      }
    },
    deleteTodoItem(id){
      this.todos.splice(this.todos.findIndex(todo =>{
        todo.id = id
      }),1)
    },
    toggle(state){
      this.filter = state;
    },
    clearAll(){
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  },
  computed:{
    filteredTodos(){
      if(this.filter === 'all'){
        return this.todos
      }
      const completed = this.filter === 'completed';
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  components: {
    item,
    tabs
  }
};
</script>
<style lang="stylus" scoped>
.real-app {
  width: 600px;
  margin: 0 auto;
  box-shadow: 0 0 5px #666;
}

.add-input {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 36px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}
</style>
