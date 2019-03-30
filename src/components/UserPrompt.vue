<template>
  <div class="user-prompt">
    <label class="user-prompt__label">
      Enter name
    </label>
    <input
      class="user-prompt__input"
      v-model="userName"
      type="text"
      :maxLength="10"
      @keypress="handleKeypress">
  </div>
</template>

<script>
  export default {
    name: 'UserPrompt',

    data() {
      return {
        userName: '',
      };
    },

    methods: {
      handleKeypress(e) {
        if (e.key === 'Enter') {
          this.$emit('nameEntered', this.userName);
          this.userName = '';
        }
      },
    },
  };
</script>

<style lang="scss">
  .user-prompt {
  }
</style>
