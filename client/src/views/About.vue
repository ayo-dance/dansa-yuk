<template>
  <div class="about">
    <h1>This is an about page</h1>

    <WinnerBoard/>
  </div>
</template>

<script>
import WinnerBoard from '@/components/WinnerBoard.vue'

export default {
  name: 'about',
  components: {
    WinnerBoard,
  }
}
</script>