<template>
  <div class="main-settings">
    <div class="main-settings__nav">
      <div>Settings</div>
      <button @click="emits('setViewWeather')"><img src="../assets/icons8-крестик-78.png"
                                                    alt="back"/>
      </button>
    </div>
    <div class="main-settings__cards">
      <SettingsCard :draggable="true" v-for="(city, index) in cities"
                    :key="getUniqKey(city)" @handleDragStart="handleDragStart"
                    @handleDragOver="handleDragOver"
                    @handleDragEnter="handleDragEnter"
                    @handleDrop="handleDrop"
                    @handleDragEnd="handleDragEnd" @removeCityHandler="removeCityHandler"
                    :city="city"
                    :index="index"></SettingsCard>
    </div>
    <div class="main-settings__foot">
      <div>Add Location</div>
      <div class="main-settings__foot-form">
        <input v-model="newCity" placeholder="Search"/>
        <button @click="saveHandler"><img src="../assets/icons8-введите-ключ-32.png" alt="enter"/>
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineEmits, defineProps } from 'vue';
import SettingsCard from '@/components/SettingsCard.vue';
import getUniqKey from '@/helpers/getUniqKey';

const props = defineProps({
  cities: {
    type: Array as () => string[],
    required: true,
  },
});
const emits = defineEmits(['setViewWeather', 'setCities']);

const newCity = ref<string>('');

const dragIndex = ref<number | null>(null);

const handleDragStart = (index: number): void => {
  dragIndex.value = index;
};

const handleDragOver = (event: DragEvent): void => {
  event.preventDefault();
};

const handleDragEnter = (index: number): void => {
  if (dragIndex.value !== index && dragIndex.value !== null) {
    const newCities: string[] = [...props.cities];
    const draggedItem = newCities.splice(dragIndex.value, 1)[0];

    newCities.splice(index, 0, draggedItem);
    dragIndex.value = index;
    emits('setCities', newCities);
  }
};

const handleDrop = (event: DragEvent): void => {
  event.preventDefault();
};

const handleDragEnd = (): void => {
  dragIndex.value = null;
};

function saveHandler(): void {
  const newCities: string[] = [...props.cities];
  newCities.push(newCity.value);
  emits('setCities', newCities);
  newCity.value = '';
}

function removeCityHandler(city: string): void {
  const newCities: string[] = props.cities.filter((oneCity: string) => oneCity !== city);
  emits('setCities', newCities);
}

</script>
<style lang="scss" scoped>
.main-settings {
  display: flex;
  flex-direction: column;
  width: 250px;
  gap: 10px;

  &__cards {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &__nav {
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      width: 30px;
      height: 30px;

      img {
        height: 100%;
        width: 100%;
      }
    }

  }

  &__foot {
    display: flex;
    flex-direction: column;

    div {
      display: flex;
    }
  }

  &__foot-form {
    display: flex;
    justify-content: space-between;
    align-items: center;

    input {
      height: 20px;
      width: 220px;
      border: 1px solid lightgrey;
    }

    input:focus {
      border: 1px solid deepskyblue;
    }

    button {
      width: 20px;
      height: 20px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
