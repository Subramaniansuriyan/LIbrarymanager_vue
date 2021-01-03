import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AddUser from '../views/AddUser';
import SignIn from '../views/SignIn';
import AddBook from '../views/AddBook';
import AllBooks from '../views/AllBooks';
import EditBook from '../views/EditBook';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/add_user',
    name: 'Add User',
    component: AddUser
  },
  {
    path: '/sign_in',
    name: 'Sign In',
    component: SignIn
  },
  {
    path: '/add_book',
    name: 'Add Book',
    component: AddBook
  },
  {
    path: '/edit/:book_id',
    name: 'Edit Book',
    component: EditBook
  },
  {
    path: '/all_books',
    name: 'All Books',
    component: AllBooks
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
