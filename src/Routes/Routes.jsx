import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import Home from '../components/Pages/Home'
import AddItem from '../components/Pages/AddItem'
import UpdateItem from '../components/Pages/UpdateItem'

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/addItem',
                element: <AddItem />
            },
            {
                path: '/updateItem/:id',
                element: <UpdateItem />,
                loader: ({params})=>fetch(`https://easy-server-nruxrjqzc-raghibs-projects.vercel.app/singleInventoryItem/${params.id}`)
            }
        ]
    }
])