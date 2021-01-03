<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    class="form__wrapper"
  >
    <v-text-field
      v-model="info.title"
      :rules="nameRules"
      label="Book Name"
      required
    ></v-text-field>

    <v-select
      v-model="info.categories"
      :items="categories"
      item-text="name"
      item-value="id"
      :rules="[v => !!v || 'Category is required']"
      label="Category"
      required
    ></v-select>

    <v-text-field
      v-model="info.author"
      label="Author Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="info.publisher"
      label="Publisher Name"
      required
    ></v-text-field>

     <v-file-input
    accept="image/*"
    label="upload image"
    v-model="info.book_image"

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
      valid: null,
      
      nameRules: [
        v => !!v || 'Book Name is required',
      ],
      
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      categories: [],
      checkbox: false,
      info:{
        title: '',
        description: null,
        categories: null,
        author: null,
        publisher: null,
        book_image:null
      }
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
        this.edit_book()
      },
      clean(obj) {
        let formData = new FormData();
        for (var propName in obj) {
          console.log(propName,obj[propName])
          if (obj[propName] === null || obj[propName] === undefined) {
            delete obj[propName];
          }
          else{
            formData.append(propName,obj[propName])
          }
        }
        return formData
      },
      get_book () {
        axios.get(`v1/library/get_book/${this.$route.params.book_id}`)
        .then(response => {
             if ( response.status === 200 ) {
                  console.log(response.data);
                  delete response.data.book_image;
                  this.info = response.data;
               }
        })
        .catch(error => {
          console.log(error);
      })
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
      edit_book(){
        console.log(this.clean(this.info))
        axios.put(`v1/library/edit_book/${this.$route.params.book_id}`,this.clean(this.info),{
          headers:{
             'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
            if ( response.status === 200 ) {
                alert("Book edited successfully");
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
      this.get_book();
    }
  }
</script>

<style scoped>
.form__wrapper{
    width: 620px;
    margin: auto;
}
</style>
