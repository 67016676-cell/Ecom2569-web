import React, { useState, useEffect } from 'react'
import { getListAllUsers } from '../../api/admin'
import useEcomstore from '../../store/ecom-store'
import { changeUserStatus, changeUserRole } from '../../api/admin'
import { toast } from 'react-toastify'

const TableUsers = () => {
const token = useEcomstore((state) => state.token)
const [users, setUsers] = useState([])


useEffect(() => {
    //code body
    handleGetUser(token)
}, [])


const handleGetUser = (token) => {
    getListAllUsers(token)
        .then((res) => {
            setUsers(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
}

const handleChangeUserStatus = (userId, userStatus) => {
    console.log(userId, userStatus)
    const value = {
        id: userId,
        enabled: !userStatus,
    }
    changeUserStatus(token, value)
        .then((res) => {
            console.log(res)
            handleGetUser(token)
            toast.success('Update Status Success!!!')
        })
        .catch((err) => {
            console.log(err)
        })
}

const handleChangeUserRole = (userId, userRole) => {
    // console.log(userId, userrole)
    const value = {
        id: userId,
        role: userRole,
    }
    changeUserRole(token, value)
        .then((res) => {
            console.log(res)
            handleGetUser(token)
            toast.success('Update Role Success!!!')
        })
        .catch((err) => {
            console.log(err)
        })
}



console.log(users)
return (
    <div className='container mx-auto p-4'>
        <div className='bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden'>
            <div className='p-6 border-b border-gray-200'>
                <h1 className='text-2xl font-bold text-gray-800'>จัดการผู้ใช้งาน</h1>
                <p className='text-sm text-gray-500 mt-1'>จัดการสิทธิ์และสถานะของผู้ใช้งานในระบบ</p>
            </div>

            <div className='overflow-x-auto'>
                <table className='w-full'>
                    <thead>
                        <tr className='bg-gray-50 border-b border-gray-200'>
                            <th className='px-6 py-4 text-left text-sm font-semibold text-gray-600'>ลำดับ</th>
                            <th className='px-6 py-4 text-left text-sm font-semibold text-gray-600'>Email</th>
                            {/* <th>วันที่แก้ไขล่าสุด</th> */}
                            <th className='px-6 py-4 text-left text-sm font-semibold text-gray-600'>สิทธิ์</th>
                            <th className='px-6 py-4 text-left text-sm font-semibold text-gray-600'>สถานะ</th>
                            <th className='px-6 py-4 text-left text-sm font-semibold text-gray-600'>จัดการ</th>
                        </tr>
                    </thead>

                    <tbody className='divide-y divide-gray-100'>
                        {
                            users?.map((el, i) =>
                                <tr key={el.id} className='hover:bg-gray-50 transition duration-150'>
                                    <td className='px-6 py-4 text-sm text-gray-500'>{i + 1}</td>

                                    <td className='px-6 py-4'>
                                        <div className='font-medium text-gray-800'>{el.email}</div>
                                    </td>

                                    {/* <td>{el.updatedAt}</td> */}

                                    <td className='px-6 py-4'>
                                        <select
                                            onChange={(e) => handleChangeUserRole(el.id, e.target.value)}
                                            value={el.role}
                                            className='border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer transition'
                                        >
                                            <option>user</option>
                                            <option>admin</option>
                                        </select>
                                    </td>

                                    <td className='px-6 py-4'>
                                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                                            el.enabled
                                                ? 'bg-green-50 text-green-600'
                                                : 'bg-gray-100 text-gray-500'
                                        }`}>
                                            <span className={`w-2 h-2 rounded-full ${
                                                el.enabled ? 'bg-green-500' : 'bg-gray-400'
                                            }`}></span>
                                            {el.enabled ? 'Active' : 'InActive'}
                                        </span>
                                    </td>

                                    <td className='px-6 py-4'>
                                        <button
                                            className={`text-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium transition duration-200 hover:-translate-y-0.5 ${
                                                el.enabled
                                                    ? 'bg-yellow-500 hover:bg-yellow-600'
                                                    : 'bg-blue-500 hover:bg-blue-600'
                                            }`}
                                            onClick={() => handleChangeUserStatus(el.id, el.enabled)}>
                                            {el.enabled ? 'desable' : 'Enable'}
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
)


}

export default TableUsers
