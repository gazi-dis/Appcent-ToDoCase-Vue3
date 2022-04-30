<template>
  <navbar-component @clicked="openAuthCards" />
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6">
        <div v-if="login" class="card card-shadow card-border-radiuss mb-5">
          <div class="card-header bg-custom-purple text-white text-center">
            <b>Giriş Yap</b>
          </div>
          <div class="card-body">
            <user-login />
          </div>
        </div>
        <div v-if="register" class="card card-shadow card-border-radiuss mb-5">
          <div class="card-header bg-custom-purple text-white text-center">
            <b>Kayıt Ol</b>
          </div>
          <div class="card-body">
            <user-register @clicked="registerSuccess" />
          </div>
        </div>
        <div class="mb-3">
          <new-todo-component @clicked="onClickChild" />
        </div>
      </div>
      <div class="col-md-6">
        <todos-component :todo="todo" />
      </div>
    </div>
  </div>
  <div class="fixed-bottom">
    <footer-component />
  </div>
</template>

<script>
import NavbarComponent from "../layout/NavbarComponent.vue";
import FooterComponent from "../layout/FooterComponent.vue";
import NewTodoComponent from "../todo/NewTodoComponent.vue";
import TodosComponent from "../todo/TodosComponent.vue";
import UserLogin from "../auth/UserLogin.vue";
import UserRegister from "../auth/UserRegister.vue";
export default {
  components: {
    NavbarComponent,
    FooterComponent,
    NewTodoComponent,
    TodosComponent,
    UserLogin,
    UserRegister,
  },
  watch: {
    "$store.state.auth.status.loggedIn": function () {
      var isLogin = this.$store.state.auth.status.loggedIn;
      if (isLogin) {
        this.login = false;
      }
    },
  },
  methods: {
    onClickChild(todoComing) {
      this.todo = todoComing;
      this.isActive = true;
    },
    openAuthCards(type) {
      if (type == "login") {
        this.register = false;
        this.login = true;
      } else if (type == "register") {
        this.login = false;
        this.register = true;
      }
    },
    registerSuccess(success) {
      if (success == true) {
        this.register = false;
        this.login = true;
      }
    },
  },
  data() {
    return {
      todo: String,
      isActive: false,
      login: false,
      register: false,
    };
  },
};
</script>

<style>
.card-border-radiuss {
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}

.card-shadow {
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
    rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
    rgba(0, 0, 0, 0.09) 0px 32px 16px;
}

.bg-custom-purple {
  background-color: #545067;
}

.bg-custom-dark-blue {
  background-color: #1e2c40;
}
</style>