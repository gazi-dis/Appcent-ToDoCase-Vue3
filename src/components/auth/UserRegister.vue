<template>
  <form v-on:submit.prevent="handleRegister">
    <div class="mb-3">
      <label for="name" class="form-label">Ad</label>
      <input
        type="text"
        class="form-control"
        id="name"
        v-model="form.name"
        required
      />
    </div>
    <div class="mb-3">
      <label for="surName" class="form-label">Soy Ad</label>
      <input
        type="text"
        class="form-control"
        id="surName"
        v-model="form.surName"
        required
      />
    </div>
    <div class="mb-3">
      <label for="userName" class="form-label">Kullanıcı Adı</label>
      <input
        type="text"
        class="form-control"
        id="userName"
        v-model="form.userName"
        required
      />
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">E Mail</label>
      <input
        type="email"
        class="form-control"
        id="email"
        v-model="form.email"
        required
      />
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Şifre</label>
      <input
        type="password"
        v-model="form.password"
        class="form-control"
        id="password"
        required
      />
    </div>
    <div class="mb-3 form-group">
      <div v-if="message" class="alert alert-danger" role="alert">
        {{ message }}
      </div>
    </div>
    <button class="btn bg-custom-purple text-white float-end">Kayıt Ol</button>
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
        name: "",
        surName: "",
        userName: "",
        email: "",
        password: "",
      },
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  methods: {
    handleRegister() {
      this.message = "";
      this.successful = false;
      this.loading = true;
      this.$store.dispatch("auth/register", this.form).then(
        (data) => {
          this.$toast.success(data.message);
          this.successful = true;
          this.loading = false;
          this.$emit("clicked", true);
        },
        (error) => {
          this.$toast.error(error.response.data.message);
          this.successful = false;
          this.loading = false;
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