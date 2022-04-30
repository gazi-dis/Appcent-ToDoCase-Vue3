<template>
  <div class="card card-shadow card-border-radiuss">
    <div class="card-header bg-custom-orange text-white text-center">
      <b>Yapılacak İşler</b>
    </div>
    <div class="card-body">
      <div v-if="ToDos.length == 0">
        <div class="card-body">
          <h5 class="card-title placeholder-glow">
            <span class="placeholder col-5"></span>
          </h5>
        </div>
        <div class="card-header mb-3" style="background-color: #f9fafb">
          <p class="card-text placeholder-glow">
            <span class="placeholder col-8"></span>
            <span class="placeholder col-4"></span>
            <span class="placeholder col-4"></span>
          </p>
        </div>
        <div class="card-body">
          <h5 class="card-title placeholder-glow">
            <span class="placeholder col-7"></span>
          </h5>
        </div>
        <div class="card-header mb-3" style="background-color: #f9fafb">
          <p class="card-text placeholder-glow">
            <span class="placeholder col-5"></span>
            <span class="placeholder col-4"></span>
            <span class="placeholder col-4"></span>
          </p>
        </div>
      </div>
      <div v-if="ToDos.length > 0">
        <ul>
          <div
            v-for="(todo, index) in ToDos"
            :key="index"
            style="
              padding: 10px 24px;
              border-radius: 6px;
              margin-bottom: 12px;
              border: 2px solid hsla(0, 0%, 0%, 0.35);
            "
            class="row"
          >
            <div class="col-sm-8">
              <input
                class="custom-input no-border"
                v-model="todo.title"
                v-on:keyup.enter="updateTodo(todo.id, todo.title)"
                type="text"
                name="todo"
                id="todo"
                placeholder="Görev Açıklaması"
                :style="todo.isDone ? 'text-decoration:line-through;' : ''"
              />
            </div>
            <div class="col-sm-2 form-switch">
              <input
                @click="doneTodo(todo.id, todo)"
                :checked="todo.isDone"
                class="form-check-input"
                type="checkbox"
                id="isDone"
              />
            </div>
            <div class="col-sm-2">
              <a @click="deleteTodo(todo.id, index)"
                ><i class="far fa-trash-alt" style="color: red"></i
              ></a>
            </div>
          </div>
        </ul>
      </div>
    </div>
    <div v-if="ToDos.length > 0" class="text-muted text-center card-footer">
      Toplam {{ ToDos.length }} adet yapılacak görev var
    </div>
    <div v-if="ToDos.length == 0" class="text-muted text-center card-footer">
      Yapılacak herhangi bir görev yok
    </div>
  </div>
</template>

<style>
.card-border-radiuss {
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}

.bg-custom-orange {
  background-color: #ff7901;
}

.card-shadow {
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
    rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
    rgba(0, 0, 0, 0.09) 0px 32px 16px;
}
.custom-input {
  border: 0;
  box-shadow: none;
}
</style>

<script>
import ToDoService from "../../services/todo.service";
export default {
  components: {},
  props: ["todo"],
  watch: {
    todo: function () {
      this.getTodos();
    },
    sessionStatus: function (newValue) {
      if (newValue == "no") {
        this.ToDos.splice(0);
      } else {
        this.getTodos();
      }
    },
    "$store.state.auth.status.loggedIn": function () {
      var isLogin = this.$store.state.auth.status.loggedIn;
      if(isLogin){
        this.getTodos();
      }else{
        this.ToDos.splice(0);
      }
    },
  },
  data() {
    return {
      ToDos: [],
      sessionStatus: "no",
    };
  },
  mounted() {
    this.getTodos();
  },
  methods: {
    sessionCheck() {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user && user.token) {
        this.sessionStatus = "yes";
        return true;
      } else {
        return false;
      }
    },
    getTodos() {
      if (this.sessionCheck() == true) {
        ToDoService.getTodosByUserId().then((result) => {
          this.ToDos = result;
        });
      }
    },
    deleteTodo(id, listIndex) {
      if (this.sessionCheck() == true) {
        ToDoService.deleteTodoById(id).then((result) => {
          this.ToDos.splice(listIndex, 1);
          this.$toast.success(result);
        });
      }
    },
    doneTodo(id, todo) {
      if (this.sessionCheck() == true) {
        ToDoService.doneChangeTodoById(id).then((result) => {
          this.$toast.success(result);
          todo.isDone = !todo.isDone;
        });
      }
    },
    updateTodo(id, todo) {
      if (this.sessionCheck() == true) {
        ToDoService.updateTodo(id, todo).then((result) => {
          this.$toast.info(result);
        });
      }
    },
  },
};
</script>