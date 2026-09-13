import React, { useEffect, useState } from 'react'
import { getOrderAdmin, changeOrderStatus } from '../../api/admin'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify'
import { numberFormat } from '../../utils/number'
import { dateFormat } from '../../utils/dateformat'


const TableOrder = () => {
    const token = useEcomStore((state) => state.token)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        if (token) {
            handleGetOrder(token)
        }
    }, [token])

    const handleGetOrder = (token) => {
        getOrderAdmin(token)
            .then((res) => {
                console.log(res.data)
                setOrders(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleChangeOrderStatus = (token, orderId, orderStatus) => {
        //code
        console.log(orderId, orderStatus)
        changeOrderStatus(token, orderId, orderStatus)
            .then((res) => {
                console.log(res)
                toast.success('Update Status Success!!!')
                handleGetOrder(token)
                // setOrders(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
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
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <table className='w-full'>
                <thead>
                    <tr className='bg-gray-200 border '>
                        <th>ลำดับ</th>
                        <th>ชื่อผู้ใช้งาน</th>
                        <th>วันที่</th>
                        <th>สินค้า</th>
                        <th>รวม</th>
                        <th>สถานะ</th>
                        <th>จัดการ</th>
                    </tr>
                </thead>

                <tbody>
                    {orders?.map((item, index) => (
                        <tr key={index} className='border '>
                            <td className='text-center'>{index + 1}</td>

                            <td>
                                <p>{item.orderedBy?.email}</p>
                                <p>{item.orderedBy?.address}</p>
                            </td>

                            <td>
                                {dateFormat(item.createdAt)}
                            </td>

                            <td className='px-2 py-4'>
                                {item.products?.map((product, index) => (
                                    <>
                                        <li key={index}>
                                            {product.product?.title} {" "}
                                            <span className='text-sm'>{product.count} x {numberFormat(product.product.price)}</span>
                                        </li>
                                    </>
                                ))}
                            </td>

                            <td>{numberFormat(item.cartTotal)}</td>

                            <td>
                                <span className={`${getStatusColer(item.orderStatus)} px-2 py-1 rounded-full`}>
                                    {item.orderStatus}
                                </span>
                            </td>

                            <td>
                                <select
                                    value={item.orderStatus}
                                    onChange={(e) =>
                                        handleChangeOrderStatus(token, item.id, e.target.value)}
                                >
                                    <option >Not Process</option>
                                    <option >Processing</option>
                                    <option >Completed</option>
                                    <option >Cancelled</option>
                                </select>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableOrder
