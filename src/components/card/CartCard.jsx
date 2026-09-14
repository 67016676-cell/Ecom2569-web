import React from 'react'
import { Trash, Minus, Plus } from 'lucide-react';
import useEcomstore from '../../store/ecom-store';
import { Link } from "react-router-dom";
import {numberFormat} from '../../utils/number'

const CartCard = () => {
//JavaScript
const carts = useEcomstore((state) => state.carts)
const actionUpdateQuantity = useEcomstore((state) => state.actionUpdateQuantity)
const actionRemoveProduct = useEcomstore((state) => state.actionRemoveProduct)
const getTotalPrice = useEcomstore((state) => state.getTotalPrice)
console.log(carts)
return ( <div className='bg-gray-50 rounded-2xl p-5 shadow-sm'> <h1 className='text-2xl font-bold text-gray-800 mb-5'>ตะกร้าสินค้า</h1> <div className='border border-gray-200 rounded-xl p-3 bg-gray-100'>
{
carts.map((item, index) =>


                    <div key={index}
                        className='bg-white p-4 rounded-xl shadow-sm mb-3 border border-gray-100 hover:shadow-md transition duration-200'>
                        <div className='flex justify-between mb-4'>
                            <div className='flex gap-3 items-center min-w-0'>

                                {
                                    item.images && item.images.length > 0
                                        ? <img
                                            className='w-20 h-20 rounded-xl object-cover shadow-sm border border-gray-200'
                                            src={item.images[0].url} />
                                        : <div className='w-20 h-20 bg-gray-100 rounded-xl flex text-center items-center justify-center text-xs text-gray-400 border border-gray-200'>
                                            NO Image
                                        </div>
                                }

                                <div className='min-w-0'>
                                    <p className='font-bold text-gray-800 truncate'>{item.title}</p>
                                    <p className='text-sm text-gray-500 line-clamp-2'>{item.description}</p>
                                    <p className='text-sm text-gray-400 mt-1'>{numberFormat(item.price)} / ชิ้น</p>
                                </div>
                            </div>
                            <div onClick={() => actionRemoveProduct(item.id)}
                                className='text-gray-400 p-2 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-red-500 transition duration-200 h-fit'>
                                <Trash size={20} />
                            </div>
                        </div>

                        <div className='flex justify-between items-center border-t border-gray-100 pt-3'>
                            <div className='border border-gray-200 rounded-lg px-1 py-1 flex items-center bg-gray-50'>
                                <button onClick={() => actionUpdateQuantity(item.id, item.count - 1)} className='px-2 py-1 bg-white text-gray-600 rounded-md hover:bg-gray-200 transition duration-200 shadow-sm'><Minus size={16} /></button>

                                <span className='px-4 font-semibold text-gray-700'>{item.count}</span>

                                <button onClick={() => actionUpdateQuantity(item.id, item.count + 1)} className='px-2 py-1 bg-white text-gray-600 rounded-md hover:bg-gray-200 transition duration-200 shadow-sm'><Plus size={16} /></button>
                            </div>
                            <div className='font-bold text-blue-600 text-lg'>
                                {numberFormat(item.price * item.count)}
                            </div>
                        </div>
                    </div>
                )
            }
        </div>

        <div className='flex justify-between items-center px-3 py-4 mt-3 border-t border-gray-200'>
            <span className='text-gray-600 font-medium'>รวม</span>
            <span className='text-xl font-bold text-gray-800'>{numberFormat(getTotalPrice())}</span>
        </div>

        <Link to='/cart'>
            <button className='mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold w-full py-3 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition duration-200'>ดำเนินการชำระเงิน</button>
        </Link>
    </div>
)


}

export default CartCard
