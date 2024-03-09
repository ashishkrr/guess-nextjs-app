import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GenderInfo } from './interfaces/data-objects';

export const genderApi = createApi({
  reducerPath: 'genderApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.genderize.io' }),
  endpoints: (builder) => ({
    getGenderInfo: builder.query<GenderInfo, string>({
      query: (name) => `/?name=${name}`,
    }),
  }),
  refetchOnMountOrArgChange: false,
  refetchOnReconnect: false,
  refetchOnFocus: false,
});

export const { useGetGenderInfoQuery } = genderApi;
