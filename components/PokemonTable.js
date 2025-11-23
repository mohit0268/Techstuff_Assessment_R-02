import React from 'react';

const PokemonTable = ({ pokemonList, onPokemonClick }) => {
  return (
    <table
      border="1"
      cellPadding="8"
      borderColor='white'
      style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', borderColor:'white' }}
    >
      <thead>
        <tr>
          <th>Sr. Number</th>
          <th>Poke Name</th>
        </tr>
      </thead>
      <tbody>
        {pokemonList.length === 0 ? (
          <tr>
            <td colSpan="2" style={{ textAlign: 'center' }}>
              No Pokémon found.
            </td>
          </tr>
        ) : (
          pokemonList.map((pokemon, index) => (
            <tr key={pokemon.name} style={{ cursor: onPokemonClick ? 'pointer' : 'default' }}>
              <td>{index + 1}</td>
              <td
                onClick={() => onPokemonClick && onPokemonClick(pokemon.name)}
                style={{ color: onPokemonClick ? '#0070f3' : 'black', textTransform: 'capitalize' }}
              >
                {pokemon.name}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default PokemonTable;
