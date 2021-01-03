<template>
<v-app>
  <v-navigation-drawer app disable-resize-watcher>
    <Sidebar/>
  </v-navigation-drawer>
  <!-- Sizes your content based upon application components -->
  <v-main>

    <!-- Provides the application the proper gutter -->
    <v-banner>{{currentRouteName}}</v-banner>
    <v-container fluid>

      <!-- If using vue-router -->
      <router-view></router-view>
    </v-container>
  </v-main>

  <v-footer app>
    <!-- -->
  </v-footer>
</v-app>
</template>

<script>
import Sidebar from './components/Sidebar';

export default {
  name: 'App',
  components: {
    Sidebar,
  },
  computed: {
    currentRouteName() {
        return this.$route.name;
    }
  },
  data: () => ({
    //
  }),
};
</script>
