import axios from 'axios';
import React from 'react'
import { useLoaderData } from 'react-router-dom'
import Swal from 'sweetalert2'

const UpdateItem = () => {
    const item = useLoaderData();
    const { _id, name, description, quantity, cost } = item

    const handleUpdateItem = (e) => {
        e.preventDefault();
        const form = e.target;
        const item_name = form.name.value;
        const item_description = form.description.value;
        const item_quantity = form.quantity.value;
        const item_cost = form.cost.value;

        const updatedItem = {
            item_name, item_description, item_quantity, item_cost
        }
        console.log(updatedItem)
        axios.patch(`http://localhost:5000/updateItem/${_id}`, updatedItem)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Item Updated`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-3xl my-8'>Update Item</h1>

            <form className='flex flex-col justify-around items-center' onSubmit={handleUpdateItem}>

                <div className='flex flex-col justify-around items-center'>
                    <div className='flex jsutify-center items-center gap-2'>
                        Name
                        <input className='border p-2 my-2 border-black rounded-md w-60' type="text" name="name" defaultValue={name} placeholder='Name' />
                    </div>
                    <div className='flex jsutify-center items-center gap-2'>
                        Quantity:<input className='border p-2 my-2 border-black rounded-md w-60' type="number" name="quantity" defaultValue={quantity} placeholder='quantity' />
                    </div>
                    <div className='flex jsutify-center items-center gap-2'>
                        Cost:<input className='border p-2 my-2 border-black rounded-md w-60' type="number" name="cost" defaultValue={cost} placeholder='cost' />
                    </div>
                    <div className='flex jsutify-center items-center gap-2'>
                        Description:<textarea className='border p-2 my-2 border-black rounded-md w-full' type="text" name="description" defaultValue={description} rows='4' placeholder='description' />
                    </div>

                    <button className='px-4 py-2 bg-green-600 text-white rounded-md' type="submit">Update Item</button>

                </div>


            </form>
        </div>
    )
}

export default UpdateItem