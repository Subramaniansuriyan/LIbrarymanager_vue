<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    class="form__wrapper"
  >
    <v-text-field
      v-model="username"
      :rules="usernameRules"
      label="username"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      type="password"
      label="password"
      required
    ></v-text-field>


    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Sign In
    </v-btn>
  </v-form>
</template>

<script>
  import axios from 'axios';
  export default {
    data: () => ({
      valid: true,
      username: '',
      usernameRules: [
        v => !!v || 'username is required',
      ],
     password: '',
      passwordRules: [
        v => !!v || 'password is required'
      ],
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
        this.sign_in()
      },
      sign_in () {
        axios.post('v1/library/sign_in', {
             username: this.username,
             password: this.password
         })
        .then(response => {
            if ( response.status === 200 ) {
                localStorage.setItem('token', response.data.token);
                this.$store.commit("set_loginstatus",true);
                this.$router.push('/');
            }
        })
        .catch(error => {
          if (error.response.status === 400){
            if (error.response.data.password){
              alert(error.response.data.password)
            }
            if (error.response.data.username){
              alert(error.response.data.username)
            }
          }
      })
      }
    },
  }
</script>

<style scoped>
.form__wrapper{
    width: 550px;
    margin: 100px auto;
}
</style>
