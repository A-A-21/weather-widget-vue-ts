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
      <div>
        <span>Add Location</span>
        <span v-if="error" class="main-settings__error">Incorrect data</span>
      </div>
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

const newCity = ref<string>('');
const error = ref<boolean>(false);
const dragIndex = ref<number | null>(null);

const emits = defineEmits(['setViewWeather', 'setCities']);

function handleDragStart(index: number): void {
  dragIndex.value = index;
}

function handleDragOver(event: DragEvent): void {
  event.preventDefault();
}

function handleDragEnter(index: number): void {
  if (dragIndex.value !== index && dragIndex.value !== null) {
    const newCities: string[] = [...props.cities];
    const draggedItem = newCities.splice(dragIndex.value, 1)[0];

    newCities.splice(index, 0, draggedItem);
    dragIndex.value = index;
    emits('setCities', newCities);
  }
}

function handleDrop(event: DragEvent): void {
  event.preventDefault();
}

function handleDragEnd(): void {
  dragIndex.value = null;
}

async function isValidCity(city: string): Promise<boolean> {
  try {
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=5cb0432d478dac0bfabaaae53d6b5e94`);
    const data = await response.json();
    return !!data.length;
  } catch (e) {
    console.error(e);
    return false;
  }
}

async function saveHandler(): Promise<void> {
  const isValid = await isValidCity(newCity.value);
  if (isValid) {
    const newCities: string[] = [...props.cities];
    newCities.push(newCity.value);
    emits('setCities', newCities);
    newCity.value = '';
  } else {
    error.value = true;
    setTimeout((): void => {
      error.value = false;
    }, 2000);
  }
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
      gap: 10px;
    }
  }

  &__error {
    color: red;
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
