<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    class="form__wrapper"
  >
    <v-text-field
      v-model="username"
      :rules="nameRules"
      label="Username"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
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
      Create
    </v-btn>
  </v-form>
</template>

<script>
  import axios from 'axios';
  export default {
    data: () => ({
      valid: true,
      username: '',
      nameRules: [
        v => !!v || 'Username is required'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
     password: '',
      passwordRules: [
        v => !!v || 'password is required'
      ],
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
        this.sign_up()
      },
      sign_up() {
        axios.post('v1/library/create',{
          username: this.username,
          email: this.email,
          password: this.password
        })
        .then(response => {
            if ( response.status === 201 ) {
              alert("please login with the user created");
              this.username = "";
              this.email="";
              this.password=""
            }
        })
        .catch(error => {
          console.log(error);
          if ( error.response.status === 403 ) {
                alert("You do not have permission to perform this action.");
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
