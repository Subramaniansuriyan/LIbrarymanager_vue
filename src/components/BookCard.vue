<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      :src="book.book_image_url"
      height="200px"
    ></v-img>

    <v-card-title>
      {{book.title}}
    </v-card-title>

    <v-card-subtitle>
      {{book.author}}
    </v-card-subtitle>

    <v-card-actions>
      <router-link :to="{ name: 'Edit Book', params: { book_id: book.id } }" tag="div" >
      <v-btn
        color="orange lighten-2"
        text
      >
        Edit
      </v-btn>
      </router-link>
      <v-btn
        color="red lighten-2"
        text
        v-if="book.is_available"
        @click="lend(book.id)"
      >
        Lend
      </v-btn>
       <v-btn
        color="red lighten-2"
        text
        v-if="!book.is_available"
      >
        NOT AVAILABLE
      </v-btn>

      <v-btn
        color="red lighten-2"
        text
        @click="delete_book(book.id)"
      >
        Delete
      </v-btn>


    </v-card-actions>
  
  </v-card>
</template>

<script>
  import axios from 'axios';
  export default {
    data: () => ({
      show: false,
    }),
    props: ["book"],
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
    },
    mounted (){
      console.log(this.book,1)
    }
  }
</script>