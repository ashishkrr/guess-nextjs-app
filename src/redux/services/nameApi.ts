import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AgeInfo } from './interfaces/data-objects';

export const nameApi = createApi({
  reducerPath: 'nameApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.agify.io' }),
  endpoints: (builder) => ({
    getNameInfo: builder.query<AgeInfo, string>({
      query: (name) => `/?name=${name}`,
    }),
  }),
  refetchOnMountOrArgChange: false,
  refetchOnReconnect: false,
  refetchOnFocus: false,
});

export const { useGetNameInfoQuery } = nameApi;
