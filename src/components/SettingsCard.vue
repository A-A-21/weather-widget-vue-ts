<template>
  <div class="settings-card" v-if="city">
    <div class="settings-card__first">
      <button @dragstart="emits('handleDragStart', index)"
              @dragover="emits('handleDragOver', $event)"
              @dragenter="emits('handleDragEnter', index)"
              @drop="emits('handleDrop', $event)"
              @dragend="emits('handleDragEnd')">
        <img src="@/assets/icons8-гамбургер-30.png" alt="dnd"/>
      </button>
      <div>{{ city }}</div>
    </div>
    <button @click="removeCityEvent(city)"><img
      src="@/assets/icons8-полная-корзина-24.png" alt="delete"/>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  city: String,
  index: Number,
});

const emits = defineEmits([
  'removeCityHandler', 'handleDragStart', 'handleDragOver', 'handleDragLeave', 'handleDrop', 'handleDragEnd',
]);

function removeCityEvent(city: string): void {
  emits('removeCityHandler', city);
}

</script>

<style scoped lang="scss">
.settings-card {
  display: flex;
  gap: 10px;
  height: 40px;
  align-items: center;
  background-color: lightgrey;
  border-radius: 5px;
  justify-content: space-between;
  padding: 0 5px;

  &__first {
    display: flex;
    align-items: center;
    gap: 10px;

    button {
      width: 20px;
      height: 20px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  button {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
