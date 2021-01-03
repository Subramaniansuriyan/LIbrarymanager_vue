<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Book Name
          </th>
          <th class="text-left">
            Author
          </th>
          <th class="text-left">
          </th>
          <th class="text-left">
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in books"
          :key="item.id"
        >
          <td>{{ item.title }}</td>
          <td>{{ item.author }}</td>
          <td>
              <router-link :to="{ name: 'Edit Book', params: { book_id: item.id } }" tag="div" >
                <v-btn
                    color="orange lighten-2"
                    text
                >
                    Edit
                </v-btn>
              </router-link>
          </td>
           <td>
              <v-btn
                color="red lighten-2"
                text @click="delete_book(item.id)"
            >
                Delete
            </v-btn>
            <v-btn
                color="orange lighten-2"
                text
                v-if="item.is_available"
                @click="lend(item.id)"
            >
                Lend
            </v-btn>
            <v-btn
                color="orange lighten-2"
                text
                v-if="!item.is_available"
            >
                NOT AVAILABLE
            </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
  import axios from 'axios';
  export default {
    data () {
      return {
        
      }
    },
    props:["books"],
    methods : {
      delete_book (book_id) {
        axios.delete(`v1/library/delete_book/${book_id}`)
        .then(response => {
             if ( response.status === 200 ) {
                  console.log(response.data);
                  this.$emit('delete')
               }
        })
        .catch(error => {
          console.log(error);
          if ( error.response.status === 403 ) {
                alert("You do not have permission to perform this action.");
            }
      })
      },
      lend (book_id) {
        axios.post('v1/library/lend_book',{
          book_id: book_id,
        })
      .then(response => {
            if ( response.status === 200 ) {
              alert("book lended successfully");
              this.$emit('delete')
            }
        })
        .catch(error => {
          console.log(error);
      })
      }
    }
  }
</script>

