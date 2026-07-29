import { useContext } from "react";
import { useForm } from "react-hook-form";
import { MyShop } from "../context/RecipeContext";

function RecipeForm() {
  let { setRecipesArr,  setAllRecipes } = useContext(MyShop);

  let {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  let handleFormData = (data) => {
    setRecipesArr((prev) => [
      ...prev,
      { ...data, quantity: 1, id: crypto.randomUUID() },
    ]);
     setAllRecipes((prev) => [
      ...prev,
      { ...data, quantity: 1, id: crypto.randomUUID() },
    ]);
    reset();
  };

  return (
    <aside className="w-full lg:w-[35%]">
      <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-28">
        <h2 className="text-3xl font-bold mb-2">Add New Recipe</h2>

        <p className="text-gray-500 mb-6">
          Share your delicious recipe with everyone.
        </p>

        <form onSubmit={handleSubmit(handleFormData)} className="space-y-4">
          {/* Recipe Name */}

          <div>
            <label className="block mb-2 font-medium">Recipe Name</label>

            <input
              type="text"
              name="recipeName"
              placeholder="Recipe Name"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-orange-500"
              {...register("recipeName", {
                required: "Recipe Name is required",
              })}
            />
          </div>

          {errors.recipeName && (
            <p className="text-red-700">{errors.recipeName.message}</p>
          )}

          {/* Chef Name */}

          <div>
            <label className="block mb-2 font-medium">Chef Name</label>

            <input
              type="text"
              name="chefName"
              placeholder="Chef Name"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-orange-500"
              {...register("chefName", {
                required: "Chef Name is required",
              })}
            />
          </div>

          {errors.chefName && (
            <p className="text-red-700">{errors.chefName.message}</p>
          )}

          {/* Price + Time */}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">Price</label>

              <input
                type="number"
                name="price"
                placeholder="Price"
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-orange-500"
                {...register("price", {
                  required: "price is required",
                })}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Prep Time</label>

              <input
                type="text"
                name="prepTime"
                placeholder="30 mins"
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-orange-500"
                {...register("prepTime", {
                  required: "prepTime is required",
                })}
              />
            </div>
          </div>

          {/* Image */}

          <div>
            <label className="block mb-2 font-medium">Image URL</label>

            <input
              type="text"
              name="image"
              placeholder="Paste Image URL"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-orange-500"
              {...register("image", {
                required: "image is required",
              })}
            />
          </div>
          {errors.image && (
            <p className="text-red-700">{errors.image.message}</p>
          )}

          {/* Description */}

          <div>
            <label className="block mb-2 font-medium">Description</label>

            <textarea
              rows="4"
              name="description"
              placeholder="Description..."
              className="w-full border rounded-lg p-3 outline-none resize-none focus:ring-2 focus:ring-orange-500"
              {...register("description", {
                required: "description is required",
              })}
            />
          </div>
          {errors.description && (
            <p className="text-red-700">{errors.description.message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
          >
            Create Recipe
          </button>
        </form>
      </div>
    </aside>
  );
}

export default RecipeForm;
