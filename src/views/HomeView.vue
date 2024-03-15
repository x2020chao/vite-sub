<template>
  <div @click="jump">home-view</div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const jump = () => {
  router.push('/about')
}
</script>
