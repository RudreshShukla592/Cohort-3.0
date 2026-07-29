import { useContext } from "react";
import { MyShop } from "../context/RecipeContext";
import { Minus, Plus } from "lucide-react";

function RecipeCard({ recipe, isInCart }) {
  let { setcartItems, addItem, minusItem, removeFromCart } = useContext(MyShop);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
      {/* Image */}

      <div className="relative h-60 overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.recipeName}
          className="w-full h-full object-cover hover:scale-110 transition duration-500"
        />

        <span className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full font-semibold">
          ${recipe.price}
        </span>
      </div>

      {/* Body */}

      <div className="p-5 flex flex-col gap-4">
        {/* Title */}

        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{recipe.recipeName}</h2>

          <span className="text-yellow-500 font-semibold">
            ⭐ {recipe.rating}
          </span>
        </div>

        {/* Description */}

        <p className="text-gray-500">{recipe.description}</p>

        {/* Footer */}

        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-semibold">{recipe.chefName}</h4>

            <p className="text-sm text-gray-500">⏱ {recipe.prepTime}</p>
          </div>

          {isInCart ? (
            <div className="flex items-center gap-3 bg-orange-500 rounded-lg px-2 py-1">
              <button
                onClick={() => {
                  if (recipe.quantity < 2) removeFromCart(recipe.id);
                  minusItem(recipe.id);
                }}
                className="p-1 rounded-md hover:bg-orange-600 transition"
              >
                <Minus size={18} className="text-white" />
              </button>

              <span className="text-white font-semibold text-lg">
                {isInCart.quantity}
              </span>

              <button
                onClick={() => addItem(isInCart.id)}
                className="p-1 rounded-md hover:bg-orange-600 transition"
              >
                <Plus size={18} className="text-white" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setcartItems((prev) => [...prev, recipe])}
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg transition font-medium"
            >
              Add To Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
