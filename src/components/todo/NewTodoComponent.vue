<template>
  <div class="card card-shadow card-border-radiuss">
    <div class="card-header text-white text-center bg-custom-bluee">
      <b>Yeni Görev Ekle</b>
    </div>
    <div class="card-body">
      <form action="">
        <label class="form-label">Görev Açıklaması</label>
        <input
          v-model="todo"
          type="text"
          class="form-control"
          name="todo"
          id="todo"
          placeholder="Görev Açıklaması"
        />
        <button
          type="button"
          class="btn bg-custom-bluee text-white float-end mt-3"
          @click="add()"
        >
          Ekle
        </button>
      </form>
    </div>
  </div>
</template>

<style>
.new-todo-card {
  margin-top: 25%;
}

.card-border-radiuss {
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}

.bg-custom-blue {
  background-color: #35c0f3;
}

.bg-custom-dark-blue {
  background-color: #1e2c40;
}

.bg-custom-orange {
  background-color: #ff7901;
}

.bg-custom-bluee {
  background-color: #45bfd7;
}

.bg-custom-purple {
  background-color: #545067;
}

.card-shadow {
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
    rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
    rgba(0, 0, 0, 0.09) 0px 32px 16px;
}
</style>

<script>
import ToDoService from "../../services/todo.service";
export default {
  components: {},
  methods: {
    sessionCheck() {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user && user.token) {
        return true;
      } else {
        return false;
      }
    },
    add() {
      if (this.sessionCheck()==true) {
        ToDoService.addTodo(this.todo).then((result) => {
          this.$emit("clicked", this.todo);
          this.$toast.info(result);
        });
      }else{
        this.$toast.error("Görev ekleyebilmek için lütfen giriş yapınız");
      }
    },
  },
  data() {
    return {};
  },
};
</script>
