import React from 'react'
import Products from './Products'

const Home = () => {
  return (
    <div>
      <h1 className='text-2xl md:text-3xl lg:text-4xl text-center py-4 font-serif font-bold'>Inventory Items</h1>
      <Products/>
    </div>
  )
}

export default Home