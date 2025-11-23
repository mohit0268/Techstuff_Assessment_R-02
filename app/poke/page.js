"use client";
import React, { useState, useEffect } from "react";
import PokemonTable from "@/components/pokemonTable";

const Poke = () => {
  return (
    <>
      <h1>Pokemon page</h1>
      <PokemonTable />
    </>
  );
};

export default Poke;
