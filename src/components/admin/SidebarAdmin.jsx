import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard } from 'lucide-react'
import { FolderKanban , LogOut} from 'lucide-react';
import { ChartColumnStacked ,ShoppingBasket , ShoppingCartMinus  } from 'lucide-react';


const SidebarAdmin = () => {
    return (
        <div className=' bg-gray-800 w-64 text-gray-100 flex flex-col h-screen'>

            <div className='h-24 bg-gray-900 flex items-center justify-center text-2xl font-bold'>
                Admin Panel
            </div>


            <nav className=' flex-1 px-4 py-4 space-y-2'>
                <NavLink 
                to={'/admin'}
                end
                className={({isActive}) =>
                    isActive
                        ? 'bg-gray-900 text-white px-4 py-2 flex items-center rounded-md'
                        : 'text-gray-300 px-4 py-2  hover:bg-gray-700 hover:text-white rounded flex items-center'
                }>
                    <LayoutDashboard  className='mr-2'/>
                    Dashbord
                </NavLink>

                <NavLink 
                to={'manage'}
                className={({isActive}) =>
                    isActive
                        ? 'bg-gray-900 text-white px-4 py-2 flex items-center rounded-md'
                        : 'text-gray-300 px-4 py-2  hover:bg-gray-700 hover:text-white rounded flex items-center'
                }>
                    <FolderKanban   className='mr-2'/>
                    Manage
                </NavLink>

                <NavLink 
                to={'category'} 
                className={({isActive}) =>
                    isActive
                        ? 'bg-gray-900 text-white px-4 py-2 flex items-center rounded-md'
                        : 'text-gray-300 px-4 py-2  hover:bg-gray-700 hover:text-white rounded flex items-center'
                }>
                    <ChartColumnStacked    className='mr-2'/>
                    Category
                </NavLink>

                <NavLink 
                to={'product'}
                className={({isActive}) =>
                    isActive
                        ? 'bg-gray-900 text-white px-4 py-2 flex items-center rounded-md'
                        : 'text-gray-300 px-4 py-2  hover:bg-gray-700 hover:text-white rounded flex items-center'
                }>
                    <ShoppingBasket className='mr-2'/>
                    Product
                </NavLink>

                <NavLink 
                to={'order'}
                className={({isActive}) =>
                    isActive
                        ? 'bg-gray-900 text-white px-4 py-2 flex items-center rounded-md'
                        : 'text-gray-300 px-4 py-2  hover:bg-gray-700 hover:text-white rounded flex items-center'
                }>
                    <ShoppingCartMinus className='mr-2'/>
                    Orders
                </NavLink>

                
            </nav>


            <div>
                <NavLink 
                
                className={({isActive}) =>
                    isActive
                        ? 'bg-gray-900 text-white px-4 py-2 flex items-center rounded-md'
                        : 'text-gray-300 px-4 py-2  hover:bg-gray-700 hover:text-white rounded flex items-center'
                }>
                    <LogOut  className='mr-2'/>
                    Logout
                </NavLink>
            </div>


        </div>
    )
}

export default SidebarAdmin