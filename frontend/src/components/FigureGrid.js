import React from "react";
import FigureCard from "./FigureCard";

const FigureGrid = ({ figurines }) => {
  console.log("FigureGrid received figurines:", figurines);
  
  if (!figurines || figurines.length === 0) {
    return <p>No figurines available</p>;
  }

  return (
    <div className="figure-grid">
      {figurines.map((figurine) => (
        <FigureCard key={figurine.id} figurine={figurine} />
      ))}
    </div>
  );
};

export default FigureGrid;