const routerSync = (store, router) => {
  router.beforeEach((to, from, next) => {
    console.log('changing route');
    store.commit('routeChange', { to, from });
    next();
  });
};

export default routerSync;
