import React from "react";

const NutritionFacts = ({ nutritions }) => {
  return (
    <div className="w-full border border-gray-300 rounded-md p-6 bg-white shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Nutritional Facts
      </h1>
      <p className="text-sm text-gray-600 mb-2">Serving size = 1 scoop (33g)</p>
      <p className="text-xs italic text-gray-500 mb-4">
        Approx. Values Per Serving
      </p>
      <div className="w-full space-y-2">
        {nutritions?.map((nutrition, idx) => {
          return (
            <div key={`nutrition-${idx}`} className="flex justify-between ">
              <span>{nutrition?.label}</span>
              <span className="font-semibold">
                {nutrition?.value.toFixed(2)}{" "}
                {nutrition?.unit?.value.toLowerCase()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NutritionFacts;
