
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
                return 'bg-gray-300';
            case "Processing":
                return 'bg-blue-300';
            case "Completed":
                return 'bg-green-300';
            case "Cancelled":
                return 'bg-red-300';

        }
    }


    return (
        <div className='space-y-4'>
            <h1 className='text-2xl font-bold'>ประวัติการสั่งซื้อ</h1>
            {/* คลุม ALL */}
            <div className='space-y-4'>
                {/* Card Loop Order*/}
                {
                    orders?.map((item, index) => {
                        // console.log(item)
                        return (
                            <div
                                key={index}
                                className='bg-gray-100 p-4 rounded-md shadow-md'>
                                {/* ทีมงาน  Header */}
                                <div className='flex justify-between mb-2'>
                                    <div >
                                        <p className='text-sm'>Order date</p>
                                        <p className='font-bold'>{dateFormat(item.updatedAt)}</p>
                                    </div>
                                    <div>
                                        <span className={`${getStatusColer(item.orderStatus)} px-2 py-1 rounded-full`}>
                                        {item.orderStatus}
                                        </span>
                                    </div>
                                </div>

                                {/* ทีมงาน  Table */}
                                <div>
                                    <table className='border w-full '>

                                        <tbody>
                                            <tr className='bg-gray-200'>
                                                <th>สินค้า</th>
                                                <th>ราคา</th>
                                                <th>จำนวน</th>
                                                <th>รวม</th>
                                            </tr>
                                        </tbody>

                                        <tbody>
                                            {
                                                item.products?.map((product, index) => {
                                                    // console.log(product)
                                                    return (
                                                        <tr key={index}>
                                                            <td>{product.product.title}</td>
                                                            <td>{numberFormat(product.product.price)}</td>
                                                            <td>{product.count}</td>
                                                            <td>{numberFormat(product.count * product.product.price)}</td>
                                                        </tr>)
                                                })
                                            }
                                        </tbody>

                                    </table>
                                </div>

                                {/* ทีมงาน  Total */}
                                <div>
                                    <div className='text-right'>
                                        <p>ราคาสุทธิ</p>
                                        <p>{numberFormat(item.cartTotal)}</p>
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

