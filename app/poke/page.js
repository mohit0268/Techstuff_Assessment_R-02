"use client";

import React, { useState, useEffect } from "react";
import PokemonTable from "@/components/pokemonTable";
import PokemonDetails from "@/components/pokemontDetails";

const PAGE_LIMIT = 20;

const Poke = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const totalPages = Math.ceil(totalCount / PAGE_LIMIT);

  useEffect(() => {
    const fetchPokemonList = async () => {
      setLoading(true);
      setError(null);
      setSelectedPokemon(null); // reset selection on page change

      try {
        const offset = (currentPage - 1) * PAGE_LIMIT;
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${PAGE_LIMIT}`
        );
        if (!res.ok) throw new Error("Failed to fetch Pokémon list");
        const data = await res.json();
        setPokemonList(data.results);
        setTotalCount(data.count);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, [currentPage]);

  const handlePokemonClick = (name) => {
    setSelectedPokemon(name);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Pokémon Table</h1>

      {error && <p style={{ color: "red" }}>Error loading list: {error}</p>}

      {loading ? (
        <p>Loading Pokémon list...</p>
      ) : (
        <>
          <PokemonTable
            pokemonList={pokemonList}
            onPokemonClick={handlePokemonClick}
          />

          <div style={{ marginTop: "15px" }}>
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              style={{ marginRight: "10px" }}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              style={{ marginLeft: "10px" }}
            >
              Next
            </button>
          </div>

          {selectedPokemon && (
            <div style={{ marginTop: "30px" }}>
              <PokemonDetails pokemonName={selectedPokemon} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Poke;
