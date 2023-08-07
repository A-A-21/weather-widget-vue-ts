<template>
  <div class="home-view">
    <div>{{ userLocation }}</div>
    <div v-if="errorMsg" class="error">{{ errorMsg }}</div>
    <WeatherCard v-else-if="viewWeather" v-for="(city, index) in cities" :key="getUniqKey(city)"
                 @setViewWeather="setViewWeather" @setError="setError"
                 :index="index"
                 :city="city"></WeatherCard>
    <MainSettings v-else @setCities="setCities" :cities="cities" @setViewWeather="setViewWeather"
    ></MainSettings>
  </div>
</template>

<script lang="ts" setup>

import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import WeatherCard from '@/components/WeatherCard.vue';
import getUniqKey from '@/helpers/getUniqKey';
import { getItemLocalStorage, setItemLocalStorage } from '@/helpers/localStorage';
import MainSettings from '@/components/MainSettings.vue';

const router = useRouter();

const errorMsg = ref<string | null>(null);
const cities = ref<string[] | []>(getItemLocalStorage('cities'));
const viewWeather = ref<boolean>(false);

function setError(msg: string): void {
  errorMsg.value = msg;
}

function setViewWeather(): void {
  viewWeather.value = !viewWeather.value;
}

function setCities(newCities: string[]): void {
  cities.value = newCities;
  setItemLocalStorage('cities', newCities);
}

const userLocation = ref<object | null>(null);
const getUserLocation = () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        userLocation.value = {
          latitude,
          longitude,
        };
      },
      (error) => {
        console.error('Error getting user location:', error);
      },
    );
  } else {
    console.error('Geolocation is not available in this browser.');
  }
};

function checkCities() {
  if (cities.value && cities.value.length) {
    viewWeather.value = true;
  } else {
    getUserLocation();
  }
}

onMounted(() => {
  checkCities();
});
</script>
<style lang="scss" scoped>
.home-view {
  display: flex;
  gap: 10px;
  flex-direction: column;
}
</style>
