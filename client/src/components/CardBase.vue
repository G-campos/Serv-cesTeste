<template>
  <q-card class="fit" :style="{backgroundImage: bgColor}">
    <q-card-section>
      <slot></slot>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'CardBase',
  props: {
    bgColor: {
      default: 'linear-gradient(to left, rgba(112, 54, 119, 1) 0%, rgba(241, 121, 27, 1) 100%)'
      // linear-gradient(to right, rgba(112, 54, 119, 1) 0%, rgba(241, 121, 27, 1) 100%)
    }
  }
}
</script>
