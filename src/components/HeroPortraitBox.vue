<template>
  <a :href="heroProfile" target="_blank">
    <span class="hero-portrait" :class="setHeroClass">
      <span v-if="hero.seasonal" :class="{'small-seasonal-leaf': hero.seasonal}"></span>
    </span>
    <span>{{ hero.name }}</span>
  </a>
</template>
<script>
  export default {
    name: 'heroPortraitBox',
    props: {
      hero: {},
      heroProfile: {},
      setHeroClass: {},
    },
  };
</script>
