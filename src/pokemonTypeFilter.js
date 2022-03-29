import React, { useState, useEffect } from "react";
import "./pokemonTypeFilter.css";

export function PokemonFilter({ allPokemons, setAllPokemons }) {
  const [allTypes, setAllTypes] = useState([]);

  const getAllPokemonTypes = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/type/`);
    const data = await res.json();

    async function createPokemonType() {
      const allTypesArray = [];
      for (let i = 0; i < data.results.length; i++) {
        allTypesArray.push(data.results[i].name);
      }
      await setAllTypes(allTypesArray);
    }

    await createPokemonType();
  };

  useEffect(() => {
    getAllPokemonTypes();
  }, []);

  const handlePokemonFiltering = () => {
    const selectedValue = document.querySelector("select").value;
    const newList = allPokemons.filter(
      (pokemonType) => pokemonType.types[0].type.name == selectedValue
    );
    setAllPokemons(newList);
  };

  return (
    <div className="filterWrapper">
      <label>Types </label>
      <select name="" id="" onChange={() => handlePokemonFiltering()}>
        {allTypes.map((type, index) => (
          <option key={index}>{type}</option>
        ))}
      </select>
    </div>
  );
}
