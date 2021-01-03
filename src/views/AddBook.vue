<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    class="form__wrapper"
  >
    <v-text-field
      v-model="name"
      :rules="nameRules"
      label="Book Name"
      required
    ></v-text-field>

    <v-select
      v-model="category"
      :items="categories"
      item-text="name"
      item-value="id"
      :rules="[v => !!v || 'Category is required']"
      label="Category"
      required
    ></v-select>

    <v-text-field
      v-model="author"
      label="Author Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="publisher"
      label="Publisher Name"
      required
    ></v-text-field>

    <v-file-input
    accept="image/*"
    label="upload image"
    v-model="image"

  ></v-file-input>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Submit
    </v-btn>
  </v-form>
</template>

<script>
  import axios from 'axios';
  export default {
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Book Name is required',
      ],
      category: null,
      author: null,
      publisher: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      categories: [],
      checkbox: false,
      image:null
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
        this.add_book()
      },
      Categories () {
        axios.get('v1/library/category_list')
        .then(response => {
             if ( response.status === 200 ) {
                  console.log(response.data);
                  this.categories = response.data;
               }
        })
        .catch(error => {
          console.log(error);
      })
      },
      add_book(){
        let formData = new FormData();
        formData.append('book_image', this.image);
        formData.append('title', this.name);
        formData.append('description', this.name);
        formData.append('author', this.author);
        formData.append('publisher', this.publisher);
        formData.append('categories', this.category);
        axios.post('v1/library/add_book', formData,{
          headers:{
             'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
            if ( response.status === 201 ) {
                alert("Book added successfully");
                this.name='';
                this.author='';
                this.publisher='';
                this.category=''
            }
        })
        .catch(error => {
          console.log(error);
          if ( error.response.status === 403 ) {
                alert("You do not have permission to perform this action.");
            }
      })
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
    mounted() {
      this.Categories();
    }
  }
</script>

<style scoped>
.form__wrapper{
    width: 620px;
    margin: auto;
}
</style>
