<template>
  <div class="home">
    <v-subheader>Books</v-subheader>
    <BookTable :books="books" @delete="all_books()"/>
    <v-divider class="divider"></v-divider>
    <v-subheader>Users</v-subheader>
    <UserTable :user="user" @delete="all_user()"/>
  </div>
</template>

<script>
// @ is an alias to /src
import BookTable from '@/components/BookTable.vue';
import UserTable from '@/components/UserTable.vue';
import axios from 'axios';

export default {
  name: 'Home',
  data: () => ({
    books:[],
    user:[]
  }),
  components: {
    BookTable,
    UserTable,
  },
  methods: {
        all_books () {
        axios.get('v1/library/all_books')
        .then(response => {
             if ( response.status === 200 ) {
                  console.log(response.data);
                  this.books = response.data;
               }
        })
        .catch(error => {
          console.log(error);
      })
      },
      all_user () {
        axios.get('v1/library/all')
        .then(response => {
             if ( response.status === 200 ) {
                  console.log(response.data);
                  this.user = response.data;
               }
        })
        .catch(error => {
          console.log(error);
      })
      },
  },
  mounted() {
      this.all_books();
      this.all_user();
    }
}
</script>

<style scoped>
.divider{
  margin-top: 40px;
}
</style>
