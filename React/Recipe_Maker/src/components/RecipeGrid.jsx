
import { useContext } from "react";
import RecipeCard from "./RecipeCard";
import { MyShop } from "../context/RecipeContext";

function RecipeGrid() {

  let {recipesArr} = useContext(MyShop)

  return (
    <section className="w-full lg:w-[65%]">

      {/* Heading */}

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold">
            Discover Recipes
          </h1>

          <p className="text-gray-500 mt-2">
            Top curated recipes for your next meal.
          </p>
        </div>

      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {recipesArr.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
          />
        ))}

      </div>

    </section>
  );
}

export default RecipeGrid;