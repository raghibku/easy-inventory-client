import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const Products = () => {
    const reOrderPoint = 30;
    const navigate = useNavigate();
    const [modalId, setModalId] = useState(null);
    
    const { data: clothes = [], refetch } = useQuery({
        queryKey: ['clothes'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/allInventoryItems');
            return res.data;
        }
    })
    
    const [totalCost, settotalCost] = useState(0);
    useEffect(()=>{
        fetch('http://localhost:5000/totalCost')
        .then(res=>res.json())
        .then(data=>settotalCost(data))
    },[clothes])

    const openModal = (id) =>{
        setModalId(id);
        document.getElementById('my_modal_5').showModal();
    }

    const handleOrder = (e) =>{
        e.preventDefault();
        const form = e.target;
        const orderQuantity = form.orderQuantity.value;
        console.log(orderQuantity);
        const newOrder = { orderQuantity}
        axios.patch(`http://localhost:5000/orderItem/${modalId}`, newOrder)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Item Ordered`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    
                }
            })
    }

    const handleRemove = id => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove Item!"
        }).then((result) => {
            if (result.isConfirmed) {

                axios.delete(`http://localhost:5000/deleteItem/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "The item has been removed.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }


    return (
        <div>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead className='text-center'>
                        <tr>
                            <th>Product Name</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Cost/Unit</th>
                            <th>Edit</th>
                            <th>Remove</th>
                            <th>Order</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            clothes ?
                                clothes.map(cloth => {
                                    return (
                                        <tr key={cloth._id}>
                                            <td>
                                                <h1 className='text-xl font-bold'>{cloth.name}</h1>
                                            </td>
                                            <td>
                                                <h1 className='text-xl font-semibold'>{cloth.description}</h1>
                                            </td>
                                            <td>
                                                <h1 className='text-xl font-semibold'>{cloth.quantity}</h1>
                                            </td>
                                            <td>
                                                <h1 className='text-xl font-semibold'>{cloth.cost}</h1>
                                            </td>

                                            <td>
                                                <button onClick={() => navigate(`/updateItem/${cloth._id}`)} className='btn btn-primary'>Edit</button>
                                            </td>
                                            <td>
                                                <button onClick={() => { handleRemove(cloth._id) }} className='btn btn-secondary'>Remove</button>
                                            </td>
                                            {
                                                cloth.quantity < reOrderPoint ?
                                                    <td>
                                                        <button
                                                            onClick={() =>{openModal(cloth._id)} }
                                                            className='btn btn-ghost'>Order</button>
                                                    </td> :
                                                    <td></td>
                                            }
                                        </tr>
                                    )
                                }) : <tr><td><span className="loading loading-spinner text-primary"></span></td></tr>
                        }
                    </tbody>

                </table>
                {
                    totalCost? <h1 className='text-2xl text-center text-primary'>Total Value: {totalCost} $</h1>:<></>
                }
            </div>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Make Your Order</h3>
                    <p className="py-4">Enter the quantity you want to order</p>
                    <form onSubmit={handleOrder}>
                        <input className='p-2' type="number" name="orderQuantity" id="" />
                        <button type="submit" className='btn btn-primary btn-sm'>Submit</button>
                    </form>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    )
}

export default Products