import { useState } from "react";
import Navbar from "../components/Navbar";
import RecipeForm from "../components/RecipeForm";
import RecipeGrid from "../components/RecipeGrid";
import CartDrawer from "../components/CartDrawer";

function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <Navbar onCartClick={() => setIsCartOpen(true)} />

      <main className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8">
        {/* Left Side */}
        <RecipeForm />

        {/* Right Side */}
        <RecipeGrid />
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
}

export default Home;