const routerSync = (store, router) => {
  router.beforeEach((to, from, next) => {
    console.log('changing route');
    store.commit('routeChange', { to, from });
    if (parseInt(to.params.answerRange) > 5000000000000) {
      console.log('is over');
      to.params.answerRange = 5000000000000;
    }
    console.log(to.params.answerRange);
    next();
  });
};

export default routerSync;
