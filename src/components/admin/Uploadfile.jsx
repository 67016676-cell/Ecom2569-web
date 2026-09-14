import React, { useState } from 'react'
import { toast } from 'react-toastify'
import ResizerModule from 'react-image-file-resizer'
import { removeFiles, Uploadfiles } from '../../api/product'
import useEcomstore from '../../store/ecom-store'
import { Loader } from 'lucide-react';

const Resizer = ResizerModule.default || ResizerModule

const Uploadfile = ({ form, setForm }) => {
// javascript
const token = useEcomstore((state) => state.token)
const [isLoading, setIsLoading] = useState(false)


const handleOnChange = (e) => {
    //code
    setIsLoading(true)
    const files = e.target.files
    if (files) {
        setIsLoading(true)
        let allFiles = form.images
        for (let i = 0; i < files.length; i++) {

            // console.log(files[i])

            //validate
            const file = files[i]
            if (!file.type.startsWith('image/')) {
                toast.error(`File ${file.name} ไม่ใช่รูปภาพ`)
                continue
            }

            // Image Resize 
            Resizer.imageFileResizer(
                files[i],
                720,
                720,
                "JPEG",
                100,
                0,
                (data) => {
                    // endpoint Backend

                    Uploadfiles(token, data)
                        .then((res) => {
                            console.log(res)

                            allFiles.push(res.data)
                            setForm({
                                ...form,
                                images: allFiles
                            })
                            setIsLoading(false)
                            toast.success('Upload image Success!!!!')
                        })
                        .catch((err) => {
                            console.log(err)
                            setIsLoading(false)
                        })
                },
                "base64"
            )


        }
    }

}
console.log(form)

const handleDelete = (public_id) => {
    const images = form.images
    removeFiles(token, public_id)
        .then((res) => {

            const filterImages = images.filter((item) => {
                console.log(item)
                return item.public_id !== public_id
            })
            console.log('filterImages', filterImages)
            setForm({
                ...form,
                images: filterImages
            })
            toast.success(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
}

return (
    <div className='my-4 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm'>

        <div className='mb-4'>
            <h2 className='text-lg font-bold text-gray-800'>รูปภาพสินค้า</h2>
            <p className='text-sm text-gray-500 mt-1'>อัปโหลดรูปภาพสำหรับสินค้า</p>
        </div>

        <div className='flex flex-wrap items-center gap-4 my-4'>
            {
                isLoading && (
                    <div className='w-24 h-24 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center'>
                        <Loader className='w-10 h-10 text-blue-500 animate-spin' />
                    </div>
                )
            }

            {/* Image */}
            {
                form.images.map((item, index) =>
                    <div className='relative group' key={index}>
                        <img
                            className='w-24 h-24 object-cover rounded-xl border border-gray-200 shadow-sm group-hover:scale-105 transition duration-200'
                            src={item.url}
                        />

                        <span
                            onClick={() => handleDelete(item.public_id)}
                            className='absolute -top-2 -right-2 w-7 h-7 flex items-center justify-center bg-gray-800 text-white text-xs font-bold rounded-full cursor-pointer opacity-0 group-hover:opacity-100 hover:bg-red-500 transition duration-200 shadow-md'
                        >
                            X
                        </span>
                    </div>
                )
            }
        </div>

        <div className='border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-blue-50 hover:border-blue-400 transition duration-200 p-6 text-center'>
            <p className='text-gray-700 font-medium mb-1'>เลือกรูปภาพสินค้า</p>
            <p className='text-sm text-gray-400 mb-4'>สามารถเลือกได้หลายรูปภาพ</p>

            <input
                onChange={handleOnChange}
                type='file'
                name='images'
                multiple
                className='block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-500 file:text-white
                hover:file:bg-blue-600
                cursor-pointer'
            />
        </div>
    </div>
)


}

export default Uploadfile
