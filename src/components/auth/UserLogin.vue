<template>
  <form v-on:submit.prevent="handleLogin">
    <!-- Email input -->
    <div class="mb-3">
      <label for="userName" class="form-label">Kullanıcı Adı</label>
      <input
        type="text"
        class="form-control"
        id="userName"
        v-model="form.userName"
      />
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Şifre</label>
      <input
        type="password"
        v-model="form.password"
        class="form-control"
        id="password"
      />
    </div>
    <div class="mb-3 form-group">
      <div v-if="message" class="alert alert-danger" role="alert">
        {{ message }}
      </div>
    </div>
    <button class="btn bg-custom-purple text-white float-end" aria-label="Close">Giriş Yap</button>
  </form>
  <div v-if="loading" class="spinner-border text-success" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</template>

<script>

export default {
  components: {},
  setup() {
    return {
      loading: false,
      form: {
        userName: localStorage.getItem('last_userName'),
        password: "",
      },
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    lastUserName(){
      return localStorage.getItem('last_userName');
    }
  },

  methods: {
    handleLogin() {
      this.$emit('close');
      this.loading = true;
      this.$store.dispatch("auth/login", this.form).then(
        () => {
          this.$emit("clicked", true);
        },
        (error) => {
          this.loading = false;
          this.$toast.error(error.response.data.message);
          this.$emit("clicked", true);
        }
      );
    },
  },
};
</script>

<style>
.bg-custom-purple {
  background-color: #545067;
}
</style>