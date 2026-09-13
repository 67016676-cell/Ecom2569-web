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
        <div className='bg-gray-100 rounded-md p-4'>
            {/* Header */}
            <div className='flex gap-4 mb-4'>
                <List size={36} />
                <p className='text-2xl font-bold'>รายการสินค้า {cart.length} รายการ</p>
            </div>

            {/* list */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {/* Left */}
                <div className='col-span-2 '>
                    {/* Card */}

                    {
                        cart.map((item, index) =>

                            <div key={index}
                                className='bg-white p-2 rounded-md shadow-md mb-2'>
                                {/* Row 1 */}
                                <div className='flex justify-between mb-2'>
                                    {/* Left */}
                                    <div className='flex gap-2 items-center'>

                                        {
                                            item.images && item.images.length > 0
                                                ? <img
                                                    className='w-16 h-16 rounded-md'
                                                    src={item.images[0].url} />
                                                : <div className='w-16 h-16 bg-gray-200 rounded-md flex text-center items-center'>
                                                    NO Image
                                                </div>
                                        }


                                        <div>
                                            <p className='font-bold'>{item.title}</p>
                                            <p className='text-sm'>{numberFormat(item.price)} x {item.count}</p>
                                        </div>
                                    </div>
                                    {/* Right */}
                                    <div>
                                        <div className='font-bold text-blue-400'>
                                            {numberFormat(item.price * item.count)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>


                {/* Right */}
                <div className='bg-white p-4 rounded-md shadow-md space-y-4'>
                    <p className='text-2xl font-bold'>ยอดรวม</p>
                    <div className='flex justify-between '>
                        <span>รวมสุทธิ</span>
                        <span className='text-2xl font-bold'>
                            {numberFormat(getTotalPrice())}
                        </span>
                    </div>

                    <div className='flex flex-col gap-2'>

                        {
                            user
                                ? <Link  >
                                    <button 
                                    disabled = {cart.length < 1}
                                    onClick={handleSaverCart} className='bg-red-500 w-full rounded-md text-white py-2 shadow-md hover:bg-rose-700'>สั่งซื้อ</button>
                                </Link>
                                :
                                <Link to={'/login'}>
                                    <button className='bg-blue-500 w-full rounded-md text-white py-2 shadow-md hover:bg-rose-700'>Login</button>
                                </Link>

                        }



                        <Link to={'/shop'}>
                            <button className='bg-yellow-400 w-full rounded-md text-white py-2 shadow-md hover:bg-yellow-600'>แก้ไขรายการ</button>
                        </Link>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default ListCart