<template>
  <div class="quiz">
    <div class="quiz-num1"></div>
    <div class="quiz-operator"> +</div>
    <div class="quiz-num2"></div>
    <div class="quiz-equal">=</div>
    <input
      type="text"
      class="quiz-input">
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'Quiz',

    computed: {
      ...mapState({
        maxNum: state => state.currentRoute.to.params.maxNum,
      }),
    },

    mounted() {
      console.log(this);
      console.log(this.maxNum);
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style
  scoped
  lang="scss">
</style>
