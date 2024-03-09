"use client";

import { useGetCountryInfoQuery, useGetGenderInfoQuery, useGetNameInfoQuery } from '@/redux/services';
import dynamic from 'next/dynamic';
import { useState, useMemo } from 'react';
const LoadingIndicator = dynamic(() => import("./Loading"), { ssr: false });



const GuessResult = ({ age, gender, country }: { age: number; gender: string; country: string }) => (
  <div>
    <p>Age: {age}</p>
    <p>Gender: {gender}</p>
    <p>Country: {country}</p>
  </div>
);

const GuessInfo = () => {
  const [name, setName] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const nameQuery = useGetNameInfoQuery(name, { skip: !submitted });
  const genderQuery = useGetGenderInfoQuery(name, { skip: !submitted });
  const countryQuery = useGetCountryInfoQuery(name, { skip: !submitted });

  const age = useMemo(() => nameQuery.data?.age || 0, [nameQuery.data]);
  const gender = useMemo(() => genderQuery.data?.gender || '', [genderQuery.data]);
  const country = useMemo(() => countryQuery.data?.country[0]?.country_id || '', [countryQuery.data]);
  const isLoading = nameQuery.isLoading || genderQuery.isLoading || countryQuery.isLoading;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <h1>Guess Age, Gender, and Country by Name</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <button type="submit">Guess</button>
      </form>
      {isLoading && <LoadingIndicator />}
      {submitted && !isLoading && <GuessResult age={age} gender={gender} country={country} />}
    </div>
  );
};

export default GuessInfo;
