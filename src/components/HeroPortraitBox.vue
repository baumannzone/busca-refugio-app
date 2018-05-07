<template>
  <div class="hero">
    <a :href="d3heroProfileLink" target="_blank">
    <span class="hero-portrait" :class="setHeroClass">
      <span v-if="hero.seasonal" :class="{'small-seasonal-leaf': hero.seasonal}"></span>
    </span>
    </a>
    <a :href="d3heroProfileLink" target="_blank">
      <span>{{ hero.name }}</span>
    </a>
    <small class="level" :class="isHardcore">{{ hero.level }}</small>
  </div>
</template>
<script>
  export default {
    name: 'heroPortraitBox',
    props: {
      hero: {
        required: true,
        type: Object,
      },
      tagWeb: {
        type: String,
      },
    },
    methods: {
      setHeroGender( gender ) {
        return gender === 0 ? 'male' : 'female';
      },
    },
    computed: {
      setHeroClass() {
        const slug = this.hero.classSlug;
        const gender = this.setHeroGender( this.hero.gender );
        return `${slug}-${gender}`;
      },
      isHardcore() {
        return this.hero.hardcore ? 'isHardcore' : '';
      },
      d3heroProfileLink() {
        const tag = this.tagWeb;
        const { id } = this.hero;
        return `https://eu.diablo3.com/es/profile/${tag}/hero/${id}`;
      },
    },
  };
</script>

<style lang="stylus">
  .hero
    .level
      margin-left 5px
      font-weight bold
      &.isHardcore
        color orangered

</style>
