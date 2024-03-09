export interface AgeInfo {
  count: number;
  name: string;
  age: number;
}

export interface GenderInfo {
  count: number;
  name: string;
  gender: string;
}

export interface CountryInfo {
  count: number;
  name: string;
  country: {
    country_id: string;
    probability: number;
  }[];
}
