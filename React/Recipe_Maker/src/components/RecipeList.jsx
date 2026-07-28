import React from 'react'
import RecipeCard from './RecipeCard'


const RecipeList = ({ recipes = defaultRecipes }) => {
  return (
    <section className='w-full'>
      <div className='mb-5 flex items-end justify-between gap-4'>
        <div>
          <p className='text-sm font-semibold uppercase tracking-[0.24em] text-[#9d4300]'>Featured recipes</p>
          <h2 className='mt-2 text-3xl font-semibold text-[#24150e]'>Card preview</h2>
        </div>
        <p className='max-w-md text-sm leading-6 text-[#745543]'>
          A reusable recipe card layout with image, chef, description, and price.
        </p>
      </div>

      <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.name} recipe={recipe} />
        ))}
      </div>
    </section>
  )
}

export default RecipeList