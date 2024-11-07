'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import LoadingCircularProgress from '@/components/LoadingCircularProgress';
import { Character } from '@/lib/type/character';

const fetchCharacters = async () => {
  const res = await fetch('https://rickandmortyapi.com/api/character');
  if (!res.ok) {
    throw new Error('Data could not be retrieved from the API');
  }
  return res.json();
};

export default function Home() {
  const {
    data: charactersData,
    isLoading,
    error,
  } = useQuery(['characters'], fetchCharacters);

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [genderFilter, setGenderFilter] = useState<string>('all');

  if (isLoading) {
    return <LoadingCircularProgress />;
  }

  if (error instanceof Error) return <div>Error: {error.message}</div>;

  const characters = charactersData?.results || [];

  const filteredCharacters = characters.filter((character: Character) => {
    const matchesStatus =
      statusFilter === 'all' || character.status.toLowerCase() === statusFilter;
    const matchesGender =
      genderFilter === 'all' || character.gender.toLowerCase() === genderFilter;
    return matchesStatus && matchesGender;
  });

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-green-500 via-blue-500  to-red-500 rounded-lg shadow-xl w-full mx-auto">
      <h1 className="text-4xl font-extrabold text-white text-center mb-8 drop-shadow-lg">
        Character List
      </h1>

      <div className="flex justify-center gap-8 mb-8">
        <div className="flex flex-col items-center">
          <label
            htmlFor="status"
            className="text-white text-lg font-semibold mb-2"
          >
            Status
          </label>
          <select
            id="status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-3 rounded-md border-2 border-gray-300 bg-white shadow-md text-lg focus:ring-2 focus:ring-pink-500 cursor-pointer"
          >
            <option value="all">All</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>

        <div className="flex flex-col items-center">
          <label
            htmlFor="gender"
            className="text-white text-lg font-semibold mb-2"
          >
            Gender
          </label>
          <select
            id="gender"
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="p-3 rounded-md border-2 border-gray-300 bg-white shadow-md text-lg focus:ring-2 focus:ring-pink-500 cursor-pointer"
          >
            <option value="all">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
      </div>

      {filteredCharacters.length === 0 ? (
        <p className="text-white text-center  font-semibold mt-12 max-sm:text-sm text-2xl">
          No characters match the selected filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {filteredCharacters.map((character: Character) => (
            <div
              key={character.id}
              className="bg-white border-2 border-gray-300 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
            >
              <h3 className="text-lg font-semibold text-center text-pink-600 mb-4">
                {character.name}
              </h3>
              <img
                src={
                  typeof character.image === 'string'
                    ? character.image
                    : character.image.src
                }
                alt={character.name}
                className="rounded-md mb-4 w-full h-56 object-cover"
              />
              <div className="flex justify-between text-lg">
                <p
                  className={`px-4 py-2 rounded-md ${
                    character.status.toLowerCase() === 'alive'
                      ? 'bg-green-400'
                      : character.status.toLowerCase() === 'dead'
                      ? 'bg-red-400'
                      : 'bg-gray-300'
                  } text-white`}
                >
                  {character.status.charAt(0).toUpperCase() +
                    character.status.slice(1)}
                </p>
                <p
                  className={`px-4 py-2 rounded-md ${
                    character.gender.toLowerCase() === 'male'
                      ? 'bg-blue-400'
                      : character.gender.toLowerCase() === 'female'
                      ? 'bg-pink-400'
                      : 'bg-gray-300'
                  } text-white`}
                >
                  {character.gender.charAt(0).toUpperCase() +
                    character.gender.slice(1)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
