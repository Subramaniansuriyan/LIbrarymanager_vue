<template>
  <v-card
    height="100%"
    width="256"
    class="mx-auto"
  >
    <v-navigation-drawer permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Library Management
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
      <router-link to="/" tag="div">
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>

        <router-link to="/all_books" tag="div">
            <v-list-item link>
            <v-list-item-icon>
                <v-icon>mdi-alphabetical</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>All Books</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
        </router-link>

        <router-link to="/add_user" tag="div">
            <v-list-item link>
            <v-list-item-icon>
                <v-icon>mdi-account-plus</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>Add User</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
        </router-link>

        <router-link to="/sign_in" tag="div" v-if="!is_loggedin">
            <v-list-item link>
            <v-list-item-icon>
                <v-icon>mdi-login</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>Sign In</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
        </router-link>

        <router-link to="/add_book" tag="div">
            <v-list-item link>
            <v-list-item-icon>
                <v-icon>mdi-plus</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>Add Book</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
        </router-link>

         <v-list-item link v-if="is_loggedin" @click="log_out()">
            <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>Sign Out</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
        
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    data () {
      return {
        right: null,
        show:this.$store.state.Is_logged_in,
      }
    },
    computed: {
      ...mapGetters({
        is_loggedin: 'Is_logged_in',
    }),
  },
  methods :{
    log_out() {
      localStorage.removeItem("token");
      this.$router.push('/sign_in');
      this.$store.commit("set_loginstatus",false);
    }
  },
  mounted (){
      if (localStorage.getItem('token')){
          this.$store.commit("set_loginstatus",true);
        }
      else{
        this.$store.commit("set_loginstatus",false);
      }
  }
  }
</script>
