<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            User Name
          </th>
          <th class="text-left">
            Email
          </th>
          <th>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in user"
          :key="item.id"
        >
          <td>{{ item.username }}</td>
          <td>{{ item.email }}</td>
          <td>
            <v-btn
                color="red lighten-2"
                text @click="delete_user(item.id)"
            >
                Delete
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
    props: ["user"],
    methods : {
      delete_user (user_id) {
        axios.delete(`v1/library/delete/${user_id}`)
        .then(response => {
             if ( response.status === 200 ) {
                  console.log(response.data);
                  this.$emit('delete')
               }
        })
        .catch(error => {
          console.log(error);
      })
      },
    }
  }
</script>

