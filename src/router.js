import Vue from 'vue';
import Router from 'vue-router';
import Quiz from '@/components/Quiz.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/:maxNum',
      name: 'Quiz',
      component: Quiz,
    },
  ],
});
