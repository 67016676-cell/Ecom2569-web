import React, { useState, useEffect } from 'react'
import useEcomstore from '../../store/ecom-store'
import { createProduct, deleteProduct } from '../../api/product'
import { toast } from 'react-toastify'
import Uploadfile from './Uploadfile'
import { Link } from 'react-router-dom'
import { Pencil , Trash  } from 'lucide-react';
import {numberFormat} from '../../utils/number'
import { dateFormat } from '../../utils/dateformat'

const initialState = {


title: "",
description: "",
price: "0",
quantity: "0",
categoryId: '',
images: []


}
const FormProduct = () => {
const token = useEcomstore((state) => state.token)
const getCategory = useEcomstore((state) => state.getCategory)
const categories = useEcomstore((state) => state.categories)
const getProduct = useEcomstore((state) => state.getProduct)
const products = useEcomstore((state) => state.products)
// console.log(products)


const [form, setForm] = useState({

    title: "",
    description: "",
    price: "0",
    quantity: "0",
    categoryId: '',
    images: []

})

useEffect(() => {
    //code
    getCategory()
    getProduct(100)
}, [])


const handleOnChange = (e) => {
    console.log(e.target.name, e.target.value)
    setForm({
        ...form,
        [e.target.name]: e.target.value
    })
}

const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const res = await createProduct(token, form)
        console.log(res)
        setForm(initialState)
        getProduct()
        toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ`)
    } catch (err) {
        console.log(err)

    }
}

const handleDelete = async (id) => {
    if (window.confirm('จะลบหรือไม่ลบ')) {
        try {
            //code
            const res = await deleteProduct(token, id)
            console.log(res)
            toast.success('Delete สินค้าเรียบร้อยเเล้ว')
            getProduct()
        } catch (err) {
            console.log(err)
        }

    }
}

return (
    <div className='container mx-auto p-5'>
        <form onSubmit={handleSubmit}>
            <div className='mb-6'>
                <h1 className='text-3xl font-bold text-gray-800'>เพิ่มข้อมูลสินค้า</h1>
                <p className='text-gray-500 mt-1'>จัดการข้อมูลสินค้าและรายการสินค้า</p>
            </div>

            <div className='bg-white rounded-xl shadow-md border border-gray-200 p-6'>
                <h2 className='text-xl font-semibold text-gray-800 mb-6'>รายละเอียดสินค้า</h2>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>ชื่อสินค้า</label>
                        <input
                            className='w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition'
                            value={form.title}
                            onChange={handleOnChange}
                            placeholder='Title'
                            name='title'
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>รายละเอียด</label>
                        <input
                            className='w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition'
                            value={form.description}
                            onChange={handleOnChange}
                            placeholder='Description'
                            name='description'
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>ราคา</label>
                        <input
                            type='number'
                            className='w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition'
                            value={form.price}
                            onChange={handleOnChange}
                            placeholder='Price'
                            name='price'
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>จำนวน</label>
                        <input
                            type='number'
                            className='w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition'
                            value={form.quantity}
                            onChange={handleOnChange}
                            placeholder='Quantity'
                            name='quantity'
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>หมวดหมู่</label>
                        <select className='w-full border border-gray-300 rounded-lg px-4 py-3 bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition'
                            name='categoryId'
                            onChange={handleOnChange}
                            required
                            value={form.categoryId}
                        >
                            <option value="" disabled>Please Select</option>

                            {
                                categories.map((item, index) =>
                                    <option key={index} value={item.id}>{item.name}</option>
                                )
                            }

                        </select>
                    </div>
                </div>

                <div className='border-t border-gray-200 my-6'></div>

                <div>
                    <h2 className='text-lg font-semibold text-gray-800 mb-3'>รูปภาพสินค้า</h2>
                    <div className='border border-gray-200 rounded-lg bg-gray-50 p-4'>
                        <Uploadfile form={form} setForm={setForm} />
                    </div>
                </div>

                <div className='flex justify-end mt-6'>
                    <button className='bg-blue-500 text-white px-6 py-3 rounded-lg font-medium shadow-sm 
                    hover:bg-blue-600 hover:shadow-md hover:-translate-y-0.5 transition duration-200'>
                        เพิ่มสินค้า
                    </button>
                </div>
            </div>

            <div className='bg-white rounded-xl shadow-md border border-gray-200 mt-8 overflow-hidden'>
                <div className='p-6 border-b border-gray-200'>
                    <h2 className='text-xl font-semibold text-gray-800'>รายการสินค้า</h2>
                    <p className='text-sm text-gray-500 mt-1'>สินค้าทั้งหมด {products.length} รายการ</p>
                </div>

                <div className='overflow-x-auto'>
                    <table className="w-full">
                        <thead>
                            <tr className='bg-gray-50 border-b border-gray-200'>
                                <th scope="col" className='px-5 py-4 text-sm font-semibold text-gray-600'>NO.</th>
                                <th scope="col" className='px-5 py-4 text-sm font-semibold text-gray-600'>รูปภาพ</th>
                                <th scope="col" className='px-5 py-4 text-sm font-semibold text-gray-600 text-left'>ชื่อสินค้า</th>
                                <th scope="col" className='px-5 py-4 text-sm font-semibold text-gray-600 text-left'>รายละเอียด</th>
                                <th scope="col" className='px-5 py-4 text-sm font-semibold text-gray-600'>ราคา</th>
                                <th scope="col" className='px-5 py-4 text-sm font-semibold text-gray-600'>จำนวน</th>
                                <th scope="col" className='px-5 py-4 text-sm font-semibold text-gray-600'>จำนวนที่ขายได้</th>
                                <th scope="col" className='px-5 py-4 text-sm font-semibold text-gray-600'>วันที่อัปเดต</th>
                                <th scope="col" className='px-5 py-4 text-sm font-semibold text-gray-600'>จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                products.map((item, index) => {
                                    // console.log(item)
                                    return (
                                        <tr key={index} className='border-b border-gray-100 hover:bg-gray-50 transition'>
                                            <th scope="row" className='px-5 py-4 text-gray-500 font-normal'>{index + 1}</th>

                                            <td className='px-5 py-4'>
                                                {
                                                    item.images.length > 0
                                                        ? <img
                                                            className='w-16 h-16 rounded-lg shadow-sm object-cover border border-gray-200'
                                                            src={item.images[0].url} />
                                                        : <div
                                                            className='w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 text-gray-400 text-xs'
                                                        >No Image</div>
                                                }
                                            </td>

                                            <td className='px-5 py-4 font-medium text-gray-800'>{item.title}</td>
                                            <td className='px-5 py-4 text-gray-500 max-w-xs'>{item.description}</td>
                                            <td className='px-5 py-4 font-semibold text-gray-800'>{numberFormat(item.price)}</td>
                                            <td className='px-5 py-4 text-center text-gray-700'>{item.quantity}</td>
                                            <td className='px-5 py-4 text-center text-gray-700'>{item.sold}</td>
                                            <td className='px-5 py-4 text-sm text-gray-500'>{dateFormat(item.updatedAt)}</td>
                                            <td className='px-5 py-4'>
                                                <div className='flex items-center justify-center gap-2'>
                                                    <p className='bg-gray-100 text-gray-600 rounded-lg p-2 
                                                    hover:bg-blue-100 hover:text-blue-600 transition duration-200 cursor-pointer'>
                                                        <Link to={'/admin/product/' + item.id} >
                                                            <Pencil size={18}/>
                                                        </Link>
                                                    </p>

                                                    <p
                                                        className='bg-gray-100 text-gray-600 rounded-lg p-2
                                                        hover:bg-gray-200 hover:text-gray-800 transition duration-200 cursor-pointer'
                                                        onClick={() => handleDelete(item.id)}> 
                                                        <Trash size={18}/>
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>

        </form>
    </div>
)


}
export default FormProduct
