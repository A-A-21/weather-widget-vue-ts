export interface IApiResponseGeo {
  country: string;
  lat: number;
  'local_names': object;
  lon: number;
  name: string;
  state: string;
}

interface IWeather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

interface IMain {
  'feels_like': number;
  humidity: number;
  pressure: number;
  temp: number;
  'temp_max': number;
  'temp_min': number;
}

export interface IWeatherInfo {
  'feels_like': number;
  wind: number;
  descriptions: string;
  degree: number;
  visibility: number;
}

interface IWind {
  deg: number;
  gust: number;
  speed: number;
}

export interface IApiResponseWeather {
  value: IApiResponseWeather;
  base: string;
  clouds: object;
  cod: number;
  coord: object;
  dt: number;
  id: number;
  main: IMain;
  name: string;
  sys: object;
  timezone: number;
  visibility: number;
  weather: IWeather[];
  wind: IWind;
}
