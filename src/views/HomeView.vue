<template>
  <div class="home-view">
    <div v-if="errorMsg" class="error">{{ errorMsg }}</div>
    <div class="home-view__cards" v-else-if="viewWeather">
      <WeatherCard v-if="!cities.length && currentCity" :city="currentCity"
                   @setViewWeather="setViewWeather"
                   @setError="setError"
                   :index="0"></WeatherCard>
      <WeatherCard v-else v-for="(city, index) in cities" :key="getUniqKey(city)"
                   @setViewWeather="setViewWeather" @setError="setError"
                   :index="index"
                   :city="city"></WeatherCard>
    </div>
    <MainSettings v-else @setCities="setCities" :cities="cities" @setViewWeather="setViewWeather"
    ></MainSettings>
  </div>
</template>

<script lang="ts" setup>

import { onMounted, ref, watch } from 'vue';
import WeatherCard from '@/components/WeatherCard.vue';
import getUniqKey from '@/helpers/getUniqKey';
import { getItemLocalStorage, setItemLocalStorage } from '@/helpers/localStorage';
import MainSettings from '@/components/MainSettings.vue';

const errorMsg = ref<string | null>(null);
const cities = ref<string[] | []>(getItemLocalStorage('cities'));
const viewWeather = ref<boolean>(false);
const userLocation = ref<{ lat: number, lon: number } | null>(null);
const currentCity = ref<string | null>(null);

async function initCityNameByCoordinates(): Promise<void> {
  try {
    if (userLocation.value) {
      const {
        lat,
        lon,
      } = userLocation.value;
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
      const data = await response.json();
      currentCity.value = data.address.city || data.address.locality || data.address.town || data.address.village || '';
      viewWeather.value = true;
    }
  } catch (e) {
    console.error(e);
  }
}

watch(userLocation, async (): Promise<void> => {
  await initCityNameByCoordinates();
});

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

function getUserLocation(): void {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position): void => {
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        userLocation.value = {
          lat: latitude,
          lon: longitude,
        };
      },
      (error) => {
        console.error('Error getting user location:', error);
      },
    );
  } else {
    console.error('Geolocation is not available in this browser.');
  }
}

async function checkCities(): Promise<void> {
  if (cities.value && cities.value.length) {
    viewWeather.value = true;
  } else {
    viewWeather.value = true;
    getUserLocation();
  }
}

onMounted(async (): Promise<void> => {
  await checkCities();
});

</script>
<style lang="scss" scoped>
.home-view__cards {
  display: flex;
  gap: 10px;
  flex-direction: column;
}
</style>
