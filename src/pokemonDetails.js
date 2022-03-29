import React from "react";

export const PokemonDetails = ({ height, weight }) => {
  return (
    <div className="detailsWrapper">
      <div className="height">Height: {height}</div>
      <div className="weight">Weight: {weight}</div>
    </div>
  );
};
