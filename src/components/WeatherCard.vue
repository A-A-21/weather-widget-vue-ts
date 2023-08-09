<template>
  <div class="weather-card">
    <button v-if="index === 0" @click="emits('setViewWeather')" class="settings">
      <img
        src="@/assets/icons8-привод-64.png"
        alt="settings"/>
    </button>
    <div class="weather-card__main">
      <div>{{ place }}</div>
      <div class="weather-card__details">
        <div>{{ weatherInfo.degree }}° C</div>
        <div>Feels like: {{ weatherInfo.feels_like }}</div>
        <div>Wind: {{ weatherInfo.wind }} m/s</div>
        <div>
          visibility: {{ getFormatedVisibility() }}
        </div>
      </div>
    </div>
    <div class="weather-card__icon">
      <img :src="iconSrc" alt="iconCode"/>
      <div class="weather-card__details">{{ weatherInfo.descriptions }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {
  ref, onMounted, defineProps, defineEmits,
} from 'vue';
import { IApiResponseGeo, IApiResponseWeather, IWeatherInfo } from '@/types/Weather';

const props = defineProps({
  city: String,
  index: Number,
});

const emits = defineEmits(['setError', 'setViewWeather']);

const place = ref<string>('');
const iconSrc = ref<string>('');
const weatherInfo = ref<IWeatherInfo>({
  feels_like: 0,
  wind: 0,
  descriptions: '',
  degree: 0,
  visibility: 0,
});

function getFormatedVisibility() {
  if (weatherInfo.value.visibility > 1000) {
    const range = (weatherInfo.value.visibility / 1000).toFixed(1);
    return `${range} km`;
  }
  return `${weatherInfo.value.visibility} m`;
}

async function getCitiesGeocode(): Promise<IApiResponseGeo | undefined> {
  try {
    const geocodeResponse: Response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${props.city}&limit=1&appid=5cb0432d478dac0bfabaaae53d6b5e94`);
    const [data]: IApiResponseGeo[] = await geocodeResponse.json();
    return data;
  } catch (e) {
    console.error(e);
    emits('setError', e);
    return Promise.reject(e);
  }
}

async function getWeather({
  lat,
  lon,
}: IApiResponseGeo): Promise<IApiResponseWeather | undefined> {
  try {
    const weatherResponse: Response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5cb0432d478dac0bfabaaae53d6b5e94&units=metric`);
    const data: IApiResponseWeather = await weatherResponse.json();
    console.log(data);
    return data;
  } catch (e) {
    console.error(e);
    emits('setError', e);
    return Promise.reject(e);
  }
}

async function initWeather(): Promise<void> {
  try {
    const geoData: IApiResponseGeo | undefined = await getCitiesGeocode();
    if (!geoData) return;

    const weatherData: IApiResponseWeather | undefined = await getWeather(geoData);
    if (!weatherData) return;

    iconSrc.value = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
    place.value = `${geoData.name}, ${geoData.country}`;

    weatherInfo.value = {
      feels_like: weatherData.main.feels_like,
      wind: weatherData.wind.speed,
      descriptions: weatherData.weather[0].description,
      degree: weatherData.main.temp,
      visibility: weatherData.visibility,
    };
  } catch (e) {
    console.error(e);
  }
}

onMounted(() => {
  initWeather();
});
</script>

<style scoped lang="scss">
.weather-card {
  border: 1px solid blue;
  border-radius: 5px;
  width: 248px;
  background-color: deepskyblue;
  position: relative;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 10px;

  &__details {
    font-size: 12px;
  }

  button {
    position: absolute;
    right: 3px;
    top: 3px;
    width: 20px;
    height: 20px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
