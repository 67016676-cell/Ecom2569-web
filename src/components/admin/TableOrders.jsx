import React, { useEffect, useState } from 'react'
import { getOrderAdmin, changeOrderStatus } from '../../api/admin'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify'
import { numberFormat } from '../../utils/number'
import { dateFormat } from '../../utils/dateformat'

const TableOrder = () => {
const token = useEcomStore((state) => state.token)
const [orders, setOrders] = useState([])
const [loading, setLoading] = useState(false)
const [changingStatus, setChangingStatus] = useState(null)
const [selectedOrder, setSelectedOrder] = useState(null)


useEffect(() => {
    if (token) {
        handleGetOrder(token)
    }
}, [token])

const handleGetOrder = (token) => {
    setLoading(true)

    getOrderAdmin(token)
        .then((res) => {
            console.log(res.data)

            if (Array.isArray(res.data)) {
                setOrders(res.data)
            } else {
                setOrders([])
            }
        })
        .catch((err) => {
            console.log(err)

            const errMsg =
                err.response?.data?.message ||
                'ไม่สามารถโหลดข้อมูล Order ได้'

            toast.error(errMsg)
        })
        .finally(() => {
            setLoading(false)
        })
}

const handleChangeOrderStatus = (token, orderId, orderStatus) => {
    console.log(orderId, orderStatus)

    setChangingStatus(orderId)

    changeOrderStatus(token, orderId, orderStatus)
        .then((res) => {
            console.log(res)

            toast.success('Update Status Success!!!')

            handleGetOrder(token)
        })
        .catch((err) => {
            console.log(err)

            const errMsg =
                err.response?.data?.message ||
                'ไม่สามารถเปลี่ยนสถานะ Order ได้'

            toast.error(errMsg)
        })
        .finally(() => {
            setChangingStatus(null)
        })
}

const getStatusColer = (status) => {
    switch (status) {
        case "Not Process":
            return 'bg-gray-100 text-gray-600 border border-gray-200'

        case "Processing":
            return 'bg-blue-50 text-blue-600 border border-blue-100'

        case "Completed":
            return 'bg-green-50 text-green-600 border border-green-100'

        case "Cancelled":
            return 'bg-red-50 text-red-600 border border-red-100'

        default:
            return 'bg-gray-100 text-gray-600 border border-gray-200'
    }
}

const handleViewDetail = (order) => {
    setSelectedOrder(order)
}

const handleCloseDetail = () => {
    setSelectedOrder(null)
}

return (
    <>
        <div className='container mx-auto p-4'>

            <div className='bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden'>

                <div className='px-6 py-6 border-b border-gray-200 bg-white'>
                    <h2 className='text-2xl font-bold text-gray-800'>
                        รายการคำสั่งซื้อ
                    </h2>

                    <p className='text-sm text-gray-500 mt-1'>
                        จัดการและตรวจสอบสถานะคำสั่งซื้อของลูกค้า
                    </p>
                </div>

                {loading ? (

                    <div className='text-center py-14'>
                        <div className='inline-block w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin'></div>

                        <p className='mt-4 text-gray-500'>
                            กำลังโหลดข้อมูล...
                        </p>
                    </div>

                ) : orders.length === 0 ? (

                    <div className='text-center py-14 text-gray-500'>
                        <div className='w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-2xl'>
                            🛒
                        </div>

                        <p className='text-lg font-medium'>
                            ยังไม่มีรายการคำสั่งซื้อ
                        </p>
                    </div>

                ) : (

                    <div className='overflow-x-auto'>

                        <table className='w-full text-sm'>

                            <thead>
                                <tr className='bg-gray-50 border-b border-gray-200 text-gray-600'>

                                    <th className='px-5 py-4 text-center whitespace-nowrap font-semibold'>
                                        ลำดับ
                                    </th>

                                    <th className='px-5 py-4 text-left whitespace-nowrap font-semibold'>
                                        ชื่อผู้ใช้งาน
                                    </th>

                                    <th className='px-5 py-4 text-center whitespace-nowrap font-semibold'>
                                        วันที่
                                    </th>

                                    <th className='px-5 py-4 text-left font-semibold'>
                                        สินค้า
                                    </th>

                                    <th className='px-5 py-4 text-right whitespace-nowrap font-semibold'>
                                        รวม
                                    </th>

                                    <th className='px-5 py-4 text-center whitespace-nowrap font-semibold'>
                                        สถานะ
                                    </th>

                                    <th className='px-5 py-4 text-center whitespace-nowrap font-semibold'>
                                        จัดการ
                                    </th>

                                </tr>
                            </thead>

                            <tbody className='divide-y divide-gray-100'>

                                {orders.map((item, index) => (

                                    <tr
                                        key={item.id || index}
                                        className='hover:bg-gray-50 transition duration-150'
                                    >

                                        <td className='px-5 py-5 text-center'>
                                            <span className='w-8 h-8 mx-auto rounded-lg bg-gray-100 flex items-center justify-center font-semibold text-gray-600'>
                                                {index + 1}
                                            </span>
                                        </td>

                                        <td className='px-5 py-5'>

                                            <p className='font-semibold text-gray-800'>
                                                {item.orderedBy?.email ||
                                                    'ไม่มี Email'}
                                            </p>

                                            <p className='text-xs text-gray-500 mt-1 max-w-[220px] truncate'>
                                                {item.orderedBy?.address ||
                                                    'ไม่มีที่อยู่'}
                                            </p>

                                        </td>

                                        <td className='px-5 py-5 text-center whitespace-nowrap text-gray-600'>
                                            {item.createdAt
                                                ? dateFormat(item.createdAt)
                                                : '-'}
                                        </td>

                                        <td className='px-5 py-5'>

                                            {item.products?.length > 0 ? (

                                                <ul className='space-y-2'>

                                                    {item.products.map(
                                                        (product, productIndex) => (

                                                            <li
                                                                key={
                                                                    product.id ||
                                                                    productIndex
                                                                }
                                                                className='bg-gray-50 rounded-lg px-3 py-2'
                                                            >

                                                                <span className='font-medium text-gray-700'>
                                                                    {product.product?.title ||
                                                                        'สินค้าไม่พบ'}
                                                                </span>

                                                                <span className='text-xs text-gray-500 ml-2'>
                                                                    {product.count || 0}
                                                                    {' x '}
                                                                    {numberFormat(
                                                                        product.product?.price || 0
                                                                    )}
                                                                </span>

                                                            </li>

                                                        )
                                                    )}

                                                </ul>

                                            ) : (

                                                <span className='text-gray-400'>
                                                    ไม่มีสินค้า
                                                </span>

                                            )}

                                        </td>

                                        <td className='px-5 py-5 text-right whitespace-nowrap'>
                                            <span className='font-bold text-blue-600 text-base'>
                                                {numberFormat(
                                                    item.cartTotal || 0
                                                )}
                                            </span>
                                        </td>

                                        <td className='px-5 py-5 text-center'>

                                            <span
                                                className={`${getStatusColer(
                                                    item.orderStatus
                                                )} inline-flex px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap`}
                                            >
                                                {item.orderStatus ||
                                                    'Not Process'}
                                            </span>

                                        </td>

                                        <td className='px-5 py-5'>

                                            <div className='flex flex-col gap-2 items-center'>

                                                <button
                                                    type='button'
                                                    onClick={() =>
                                                        handleViewDetail(item)
                                                    }
                                                    className='w-full min-w-[130px] px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition text-xs font-medium shadow-sm'
                                                >
                                                    ดูรายละเอียด
                                                </button>

                                                <select
                                                    value={
                                                        item.orderStatus ||
                                                        'Not Process'
                                                    }
                                                    disabled={
                                                        changingStatus ===
                                                        item.id
                                                    }
                                                    onChange={(e) =>
                                                        handleChangeOrderStatus(
                                                            token,
                                                            item.id,
                                                            e.target.value
                                                        )
                                                    }
                                                    className='w-full min-w-[130px] border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100 cursor-pointer'
                                                >

                                                    <option value='Not Process'>
                                                        Not Process
                                                    </option>

                                                    <option value='Processing'>
                                                        Processing
                                                    </option>

                                                    <option value='Completed'>
                                                        Completed
                                                    </option>

                                                    <option value='Cancelled'>
                                                        Cancelled
                                                    </option>

                                                </select>

                                                {changingStatus ===
                                                    item.id && (
                                                        <span className='text-xs text-blue-500'>
                                                            กำลังอัปเดต...
                                                        </span>
                                                    )}

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>
                )}

            </div>

        </div>

        {selectedOrder && (

            <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4'>

                <div className='bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto'>

                    <div className='flex items-center justify-between px-6 py-5 border-b border-gray-200'>

                        <div>
                            <h3 className='text-xl font-bold text-gray-800'>
                                รายละเอียดคำสั่งซื้อ
                            </h3>

                            <p className='text-xs text-gray-500 mt-1'>
                                Order ID: {selectedOrder.id || '-'}
                            </p>
                        </div>

                        <button
                            type='button'
                            onClick={handleCloseDetail}
                            className='w-9 h-9 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800 text-xl transition'
                        >
                            ×
                        </button>

                    </div>

                    <div className='p-6 space-y-5'>

                        <div className='bg-gray-50 rounded-xl p-5 border border-gray-100'>

                            <h4 className='font-semibold text-gray-800 mb-3'>
                                ข้อมูลผู้สั่งซื้อ
                            </h4>

                            <p className='text-sm text-gray-600'>
                                Email:{' '}
                                <span className='font-medium text-gray-800'>
                                    {selectedOrder.orderedBy?.email ||
                                        '-'}
                                </span>
                            </p>

                            <p className='text-sm text-gray-600 mt-2'>
                                ที่อยู่:{' '}
                                <span className='text-gray-800'>
                                    {selectedOrder.orderedBy?.address ||
                                        '-'}
                                </span>
                            </p>

                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

                            <div className='border border-gray-200 rounded-xl p-4'>

                                <p className='text-xs text-gray-500'>
                                    วันที่สั่งซื้อ
                                </p>

                                <p className='font-medium text-gray-800 mt-1'>
                                    {selectedOrder.createdAt
                                        ? dateFormat(
                                            selectedOrder.createdAt
                                        )
                                        : '-'}
                                </p>

                            </div>

                            <div className='border border-gray-200 rounded-xl p-4'>

                                <p className='text-xs text-gray-500 mb-1'>
                                    สถานะ
                                </p>

                                <span
                                    className={`${getStatusColer(
                                        selectedOrder.orderStatus
                                    )} inline-flex px-3 py-1 rounded-full text-xs font-semibold`}
                                >
                                    {selectedOrder.orderStatus ||
                                        'Not Process'}
                                </span>

                            </div>

                        </div>

                        <div>

                            <h4 className='font-semibold text-gray-800 mb-3'>
                                รายการสินค้า
                            </h4>

                            <div className='border border-gray-200 rounded-xl overflow-hidden'>

                                {selectedOrder.products?.length > 0 ? (

                                    selectedOrder.products.map(
                                        (product, index) => (

                                            <div
                                                key={
                                                    product.id || index
                                                }
                                                className='flex items-center justify-between px-4 py-4 border-b last:border-b-0 hover:bg-gray-50'
                                            >

                                                <div>

                                                    <p className='font-medium text-gray-800'>
                                                        {product.product?.title ||
                                                            'สินค้าไม่พบ'}
                                                    </p>

                                                    <p className='text-xs text-gray-500 mt-1'>
                                                        จำนวน:{' '}
                                                        {product.count ||
                                                            0}
                                                    </p>

                                                </div>

                                                <p className='font-semibold text-gray-700'>
                                                    {numberFormat(
                                                        product.product
                                                            ?.price || 0
                                                    )}
                                                </p>

                                            </div>

                                        )
                                    )

                                ) : (

                                    <div className='p-5 text-center text-gray-500'>
                                        ไม่มีรายการสินค้า
                                    </div>

                                )}

                            </div>

                        </div>

                        <div className='flex justify-between items-center bg-blue-50 border border-blue-100 rounded-xl px-5 py-4'>

                            <span className='font-semibold text-gray-700'>
                                ยอดรวมทั้งหมด
                            </span>

                            <span className='text-2xl font-bold text-blue-600'>
                                {numberFormat(
                                    selectedOrder.cartTotal || 0
                                )}
                            </span>

                        </div>

                    </div>

                    <div className='px-6 py-4 border-t border-gray-200 flex justify-end'>

                        <button
                            type='button'
                            onClick={handleCloseDetail}
                            className='px-5 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition shadow-sm'
                        >
                            ปิด
                        </button>

                    </div>

                </div>

            </div>

        )}

    </>
)


}

export default TableOrder
