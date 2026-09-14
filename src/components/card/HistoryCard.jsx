import React, { useState, useEffect } from 'react'
import { getOrders } from '../../api/user'
import useEcomStore from '../../store/ecom-store'
import { dateFormat } from '../../utils/dateformat'
import { numberFormat } from '../../utils/number'

const HistoryCard = () => {
const token = useEcomStore((state) => state.token);
// console.log(token)
const [orders, setorders] = useState([])


useEffect(() => {
    //code
    hdlgetOrders(token)
}, [])

const hdlgetOrders = (token) => {
    getOrders(token)
        .then((res) => {
            // console.log(res)
            setorders(res.data.orders)
        })
        .catch((err) => {
            console.log(err)
        });
}


const getStatusColer = (status) => {
    switch (status) {
        case "Not Process":
            return 'bg-gray-100 text-gray-600 border border-gray-200';
        case "Processing":
            return 'bg-blue-50 text-blue-600 border border-blue-200';
        case "Completed":
            return 'bg-green-50 text-green-600 border border-green-200';
        case "Cancelled":
            return 'bg-red-50 text-red-600 border border-red-200';

    }
}


return (
    <div className='max-w-5xl mx-auto space-y-5'>
        <div className='mb-6'>
            <h1 className='text-3xl font-bold text-gray-800'>ประวัติการสั่งซื้อ</h1>
            <p className='text-gray-500 mt-1'>รายการสั่งซื้อทั้งหมดของคุณ</p>
        </div>

        <div className='space-y-5'>
            {
                orders?.map((item, index) => {
                    // console.log(item)
                    return (
                        <div
                            key={index}
                            className='bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition duration-200'>
                            <div className='flex justify-between items-center px-6 py-5 bg-gray-50 border-b border-gray-200'>
                                <div>
                                    <p className='text-xs text-gray-400 uppercase tracking-wide'>Order date</p>
                                    <p className='font-semibold text-gray-800 mt-1'>{dateFormat(item.updatedAt)}</p>
                                </div>
                                <div>
                                    <span className={`${getStatusColer(item.orderStatus)} px-4 py-2 rounded-full text-sm font-medium`}>
                                        {item.orderStatus}
                                    </span>
                                </div>
                            </div>

                            <div className='p-5'>
                                <div className='overflow-x-auto rounded-xl border border-gray-200'>
                                    <table className='w-full'>

                                        <tbody>
                                            <tr className='bg-gray-50 border-b border-gray-200'>
                                                <th className='px-5 py-3 text-left text-sm font-semibold text-gray-600'>สินค้า</th>
                                                <th className='px-5 py-3 text-right text-sm font-semibold text-gray-600'>ราคา</th>
                                                <th className='px-5 py-3 text-center text-sm font-semibold text-gray-600'>จำนวน</th>
                                                <th className='px-5 py-3 text-right text-sm font-semibold text-gray-600'>รวม</th>
                                            </tr>
                                        </tbody>

                                        <tbody>
                                            {
                                                item.products?.map((product, index) => {
                                                    // console.log(product)
                                                    return (
                                                        <tr key={index} className='border-b border-gray-100 hover:bg-gray-50 transition'>
                                                            <td className='px-5 py-4 font-medium text-gray-800'>{product.product.title}</td>
                                                            <td className='px-5 py-4 text-right text-gray-600'>{numberFormat(product.product.price)}</td>
                                                            <td className='px-5 py-4 text-center text-gray-600'>{product.count}</td>
                                                            <td className='px-5 py-4 text-right font-medium text-gray-800'>{numberFormat(product.count * product.product.price)}</td>
                                                        </tr>)
                                                })
                                            }
                                        </tbody>

                                    </table>
                                </div>

                                <div className='flex justify-end mt-5'>
                                    <div className='bg-gray-50 rounded-xl px-6 py-4 min-w-52 border border-gray-200'>
                                        <div className='flex justify-between items-center gap-8'>
                                            <p className='text-gray-500'>ราคาสุทธิ</p>
                                            <p className='text-xl font-bold text-blue-600'>{numberFormat(item.cartTotal)}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>)
                })
            }


        </div>

    </div>
)


}

export default HistoryCard
