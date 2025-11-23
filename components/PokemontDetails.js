import React, { useEffect, useState } from 'react';

const PokemonDetails = ({ pokemonName }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTypeIndex, setActiveTypeIndex] = useState(0);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      setLoading(true);
      setError(null);
      setPokemonData(null);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) throw new Error('Failed to fetch Pokémon data');
        const data = await response.json();
        setPokemonData(data);
        setActiveTypeIndex(0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [pokemonName]);

  if (loading) return <p>Loading details...</p>;
  if (error) return {error};
  if (!pokemonData) return null;

  const types = pokemonData.types.map((type) => type.type.name);

  // Data for the active tab type
  const activeType = types[activeTypeIndex];
 

  return (
    <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
      <div>
        <h3 style={{ textTransform: 'capitalize' }}>{pokemonName} Details</h3>
        <p>
          <strong>Height:</strong> {pokemonData.height}
        </p>
        <p>
          <strong>Weight:</strong> {pokemonData.weight}
        </p>
        <p>
          <strong>Total Moves:</strong> {pokemonData.moves.length}
        </p>
        <p>
          <strong>Game Indices Count:</strong> {pokemonData.game_indices.length}
        </p>
      </div>

      <div>
        <h4>Types</h4>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {types.map((typeName, idx) => (
            <button
              key={typeName}
              onClick={() => setActiveTypeIndex(idx)}
              style={{
                backgroundColor: idx === activeTypeIndex ? '#0070f3' : '#eee',
                color: idx === activeTypeIndex ? '#fff' : '#000',
                border: 'none',
                marginBottom: '5px',
                padding: '8px',
                cursor: 'pointer',
                textTransform: 'capitalize',
              }}
            >
              {typeName}
            </button>
          ))}
        </div>

        <div style={{ marginTop: '15px' }}>
          <p>
            <strong>Active Type:</strong> {activeType}
          </p>
          <p>Game Indices count: {pokemonData.game_indices.length}</p>
          <p>Total moves count: {pokemonData.moves.length}</p>
          
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
