import React from 'react'
import { List } from 'lucide-react';
import useEcomstore from '../../store/ecom-store';
import { Link, useNavigate } from 'react-router-dom';
import { createUserCart } from '../../api/user';
import { toast } from 'react-toastify'
import {numberFormat} from '../../utils/number'

const ListCart = () => {
const cart = useEcomstore((state) => state.carts)
const user = useEcomstore((s) => s.user)
const token = useEcomstore((s) => s.token)
const getTotalPrice = useEcomstore((state) => state.getTotalPrice)


const navigate = useNavigate()

const handleSaverCart = async () => {
    await createUserCart(token, { cart })
        .then((res) => {
            console.log(res)
            toast.success('ใส่ตะกร้าเรียบร้อยเเล้ว', { position: "top-center" });
            navigate('/checkout')
        })
        .catch((err) => {
            console.log('err', err)
            toast.warning(err.response.data.message)
            // console.log('response:', err.response?.data)

        })
}




return (
    <div className='max-w-6xl mx-auto bg-gray-50 rounded-2xl p-6'>
        <div className='flex items-center gap-3 mb-6'>
            <div className='bg-blue-100 text-blue-600 p-3 rounded-xl'>
                <List size={28} />
            </div>
            <div>
                <p className='text-2xl font-bold text-gray-800'>รายการสินค้า</p>
                <p className='text-sm text-gray-500'>สินค้า {cart.length} รายการ</p>
            </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            <div className='lg:col-span-2 space-y-3'>
                {
                    cart.map((item, index) =>

                        <div key={index}
                            className='bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition duration-200'>
                            <div className='flex justify-between items-center gap-4'>
                                <div className='flex gap-4 items-center min-w-0'>

                                    {
                                        item.images && item.images.length > 0
                                            ? <img
                                                className='w-20 h-20 rounded-xl object-cover border border-gray-200 shadow-sm'
                                                src={item.images[0].url} />
                                            : <div className='w-20 h-20 bg-gray-100 rounded-xl flex text-center items-center justify-center text-xs text-gray-400 border border-gray-200'>
                                                NO Image
                                            </div>
                                    }


                                    <div className='min-w-0'>
                                        <p className='font-bold text-gray-800 truncate'>{item.title}</p>
                                        <p className='text-sm text-gray-500 mt-1'>{numberFormat(item.price)} x {item.count}</p>
                                    </div>
                                </div>

                                <div className='text-right'>
                                    <p className='text-xs text-gray-400 mb-1'>รวม</p>
                                    <div className='font-bold text-blue-600 text-lg'>
                                        {numberFormat(item.price * item.count)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>


            <div className='bg-white p-6 rounded-2xl shadow-sm border border-gray-200 h-fit lg:sticky lg:top-4'>
                <p className='text-xl font-bold text-gray-800 pb-4 border-b border-gray-200'>สรุปคำสั่งซื้อ</p>

                <div className='flex justify-between items-center py-5'>
                    <span className='text-gray-500'>รวมสุทธิ</span>
                    <span className='text-2xl font-bold text-gray-800'>
                        {numberFormat(getTotalPrice())}
                    </span>
                </div>

                <div className='border-t border-gray-200 pt-5 flex flex-col gap-3'>

                    {
                        user
                            ? <Link  >
                                <button 
                                disabled = {cart.length < 1}
                                onClick={handleSaverCart} className='bg-blue-500 w-full rounded-xl text-white py-3 font-semibold shadow-sm hover:bg-blue-600 hover:shadow-md hover:-translate-y-0.5 transition duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed'>สั่งซื้อ</button>
                            </Link>
                            :
                            <Link to={'/login'}>
                                <button className='bg-blue-500 w-full rounded-xl text-white py-3 font-semibold shadow-sm hover:bg-blue-600 hover:shadow-md transition duration-200'>Login</button>
                            </Link>

                    }



                    <Link to={'/shop'}>
                        <button className='bg-white border border-gray-300 text-gray-700 w-full rounded-xl py-3 font-semibold shadow-sm hover:bg-gray-100 transition duration-200'>แก้ไขรายการ</button>
                    </Link>
                </div>

            </div>
        </div>
    </div>

)


}

export default ListCart
