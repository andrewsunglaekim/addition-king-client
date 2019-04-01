<template>
  <div class="leaderboard">
    <header class="leaderboard__header">Level {{ answerRange }} - Leaderboard</header>
    <table class="leaderboard__table">
      <tr class="leaderboard__table-header">
        <th>Name</th>
        <th>Seconds</th>
        <th>Total Correct</th>
      </tr>
      <tr
        v-for="(score, i) in scores"
        class="leaderboard__score"
        :key="i">
        <td class="leaderboard__score-name">{{ score.username }}</td>
        <td class="leaderboard__score-time">{{ score.numseconds}}</td>
        <td class="leaderboard__score-correct">{{ score.numcorrect}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: '',

    props: {
      scores: {
        type: Array,
        required: true,
      },
      answerRange: {
        type: Number,
        required: true,
      },
    },
  };
</script>

<style lang="scss">
  .leaderboard {
    width: 100%;
    padding: 2rem;

    &__header {
      text-align: center;
    }

    &__table {
      width: 100%;
    }

    &__table-header, &__score {
      display: flex;

      & > th, td {
        flex: 1;
      }
    }

    &__score-name {
      text-align: right;
    }
  }
</style>
