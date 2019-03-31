<template>
  <div class="navigator">
    <button
      v-if="!isNavigating"
      class="navigator-button"
      @click="initiateNav">Change level
    </button>
    <div
      v-else
      class="navigator_nav">
      <label class="navigator__label">Enter level</label>
      <input
        class="navigator__input"
        type="text"
        v-model="answerRange"
        @keypress="handleKeypress">
    </div>
  </div>
</template>

<script>
  export default {
    name: '',

    data() {
      return {
        answerRange: '',
        isNavigating: false,
      };
    },

    methods: {
      initiateNav() {
        this.isNavigating = true;
        console.log('initiated switchgign snav');
      },
      handleKeypress(e) {
        const allowedKeyCodes = [8, 9, 27, 13, 37, 38, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
        if (allowedKeyCodes.includes(e.keyCode)) {
          if (e.keyCode === 13) {
            this.handleEnter();
          }
          return true;
        }
        e.preventDefault();
        return null;
      },
      handleEnter() {
        this.$router.push({
          name: 'Main',
          params: {
            answerRange: this.answerRange,
          },
        });
        this.$emit('routeChanged');
        this.isNavigating = false;
      },
    },
  };
</script>

<style lang="scss">
  .navigator {
  }
</style>
