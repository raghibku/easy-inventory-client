import axios from 'axios';
import React from 'react'
import Swal from 'sweetalert2'

const AddItem = () => {
  const handleAddItem = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const description = form.description.value;
    const quantity = form.quantity.value;
    const cost = form.cost.value;

    const addedItem = {
      name, description, quantity, cost
    }
    axios.post('https://easy-server-nruxrjqzc-raghibs-projects.vercel.app/allInventoryItems', addedItem)
      .then(res => {
        console.log(res)
        if (res.data.insertedId) {
          Swal.fire({
            title: "Added!",
            text: "The item has been added to inventory.",
            icon: "success"
          });
        }
      })

    console.log(addedItem)
  }
  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='text-2xl md:text-3xl lg:text-4xl text-center py-4 font-serif font-bold'>Add Item</h1>

      <form className='flex flex-col justify-around items-center' onSubmit={handleAddItem}>

        <div className='flex flex-col justify-between items-center'>
          <div className='flex justify-between items-center gap-2'>
            <h1 className='text-xl font-semibold w-[120px]'>Name</h1>
            <input className='border p-2 my-2 border-black rounded-md w-60' type="text" name="name" placeholder='Name' />
          </div>
          <div className='flex justify-between items-center gap-2'>
            <h1 className='text-xl font-semibold w-[120px] items-'>Quantity</h1><input className='border p-2 my-2 border-black rounded-md w-60' type="number" name="quantity" placeholder='quantity' />
          </div>
          <div className='flex justify-between items-center gap-2'>
            <h1 className='text-xl font-semibold w-[120px]'>Cost</h1><input className='border p-2 my-2 border-black rounded-md w-60' type="number" name="cost" placeholder='cost' />
          </div>
          <div className='flex justify-between items-center gap-2'>
            <h1 className='text-xl font-semibold w-[120px]'>Description</h1>
            <textarea className='border p-2 my-2 border-black rounded-md w-60' type="text" name="description" rows='4' placeholder='description' />
          </div>

          <button className='px-4 py-2 bg-green-600 text-white rounded-md ' type="submit">Add Item</button>

        </div>


      </form>
    </div>
  )
}

export default AddItem