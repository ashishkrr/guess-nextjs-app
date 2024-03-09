import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CountryInfo } from './interfaces/data-objects';

export const countryApi = createApi({
  reducerPath: 'countryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.nationalize.io' }),
  endpoints: (builder) => ({
    getCountryInfo: builder.query<CountryInfo, string>({
      query: (name) => `/?name=${name}`,
      transformResponse: (response: CountryInfo, meta: any, arg: string) => {
        if (!response || !response.country || response.country.length === 0) {
          return { count: 0, name: arg, country: [] };
        }
      
        const countryWithHighestProbability = response.country.reduce((prev, current) => {
          return (prev.probability > current.probability) ? prev : current;
        });
      
        return { count: response.count, name: response.name, country: [countryWithHighestProbability] };
      }
    }),
  }),
  refetchOnMountOrArgChange: false,
  refetchOnReconnect: false,
  refetchOnFocus: false,
});

export const { useGetCountryInfoQuery } = countryApi;
