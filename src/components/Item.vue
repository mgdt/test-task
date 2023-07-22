<script setup>
const props = defineProps({
  id: Number,
  name: String,
});
const emits = defineEmits(["itemClick"]);
</script>

<template>
  <div @click="$emit('itemClick', props.id)" class="item">{{ props.name }}</div>
</template>

<style scoped>
.item {
  width: 100px;
  height: 50px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
