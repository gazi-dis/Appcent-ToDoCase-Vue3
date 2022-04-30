<template>
  <nav class="navbar navbar-expand-lg navbar-dark navbar-todo py-3">
    <div class="container">
      <a class="navbar-brand" href="#"><b>Appcent ToDo Case <i class="fa-solid fa-clipboard-check fa-lg"></i></b></a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="ms-auto" v-if="!currentUser">
          <button
            class="btn btn-outline-light auth-tag px-4"
            @click="openLoginCard()"
          >
            Giriş Yap
          </button>
          <button
            class="ms-3 btn register-button text-white auth-tag px-4"
             @click="openRegisterCard()"
          >
            <b>Kayıt Ol</b>
          </button>
        </div>
        <span class="ms-auto text-white" v-if="currentUser"
          >Hoş geldin, {{ currentUser.user.name }}</span
        >
        <button
          v-if="currentUser"
          @click="logOut"
          class="ms-auto btn bg-custom-blue auth-tag text-white"
        >
          <b>Çıkış Yap</b>
        </button>
      </div>
    </div>
  </nav>
  <div 
    class="modal fade"
    id="loginModal"
    tabindex="-1"
    aria-labelledby="loginModal"
    aria-hidden="true"
    v-if="!currentUser"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="loginModalLabel">Giriş Yap</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <user-login @clicked="loginStatus" />
        </div>
      </div>
    </div>
  </div>
  <div
    class="modal fade"
    id="registerModal"
    tabindex="-1"
    aria-labelledby="registerModal"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="registerModal">Kayıt Ol</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <user-register @clicked="registerStatus" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserLogin from "../auth/UserLogin.vue";
import UserRegister from "../auth/UserRegister.vue";
export default {
  setup() {
    const loginModal = true;
    const registerModal = true;
    return {
      loginModal,
      registerModal,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  components: {
    UserLogin,
    UserRegister,
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
    },
    registerStatus(status) {
      this.registerModal = !status;
      this.loginModal = status;
    },
    loginStatus(status) {
      this.loginModal = !status;
    },
    openLoginCard(){
      this.$emit("clicked", "login");
    },
    openRegisterCard(){
      this.$emit("clicked", "register");
    }
  },
};
</script>

<style>
* {
  text-transform: none !important;
}

.auth-tag {
  border-radius: 25px;
}
.navbar-todo {
  background-color: #1e2c40;
}
.register-button {
  background-color: #ff7901;
}

.bg-custom-blue{
  background-color: #35c0f3;
}
</style>