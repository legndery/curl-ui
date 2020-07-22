<template>
  <div
    class="modal"
    v-show="value"
  >
    <div class="container">
      <div class="md-title">PKS Authentication</div>
      <p>Disclaimer: No encryption and stuff so yeah, use it at your own discretion</p>
      <md-field class="fetch-url-input">
        <label>LDAP Username</label>
        <md-input v-model="username"></md-input>
      </md-field>
      <md-field class="fetch-url-input">
        <label>Password</label>
        <md-input v-model="password"></md-input>
      </md-field>
      <md-field class="fetch-url-input">
        <label>Password</label>
        <md-input v-model="env"></md-input>
      </md-field>
      <md-button
        class="md-primary"
        @click="loginWithPKS"
      >Login</md-button>
      <md-button
        @click.prevent="close"
        class="mt-3 border-b border-teal font-semibold"
      >Close</md-button>
      <p>{{ authResponse }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Modal',
  data: function () {
    return {
      username: "",
      password: "",
      env: "dck8soptpreprod001"
    }
  },
  props: {
    value: {
      required: true
    }
  },
  computed: {
    ...mapGetters(['authResponse']),
  },
  methods: {
    loginWithPKS: function () {
      this.setPksCreds({ username: this.username, password: this.password, env: this.env });
      this.executeAuthRequest()
    },
    close() {
      this.$emit("input", !this.value);
    },
    ...mapActions(['executeAuthRequest', 'setPksCreds'])
  },
};
</script>


<style lang="css" scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.container {
  width: 400px;
  /* height: 400px; */
  margin: auto;
  margin-top: 20%;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
}
</style>