<template>
    <div>
        <v-text-field label="Search Books" v-model="search" @keyup="all_books()" class="search_box"></v-text-field>
        <div class="books__wrapper">
            <BookCard v-for="i in books" :key="i.id" :book="i" @delete="all_books()"/>
        </div>
    </div>
</template>

<script>
import BookCard from '../components/BookCard';
import axios from 'axios';

export default {
    data: () => ({
        books:[],
        search:''
    }),
    components: {
        BookCard,
    },
    methods: {
        all_books () {
        console.log(this.search)
        axios.get('v1/library/search',{
            params:{
                search:this.search
            }
        })
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
    },
    mounted() {
      this.all_books();
    }
}
</script>

<style scoped>
.books__wrapper{
    display: grid;
    grid-template-columns: auto auto auto;
    grid-gap: 10px;
    width: 100%;
}
.search_box{
    width: 50%;
    margin-left: auto;
}
</style>
