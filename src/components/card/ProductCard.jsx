import React from 'react'
import { ShoppingCartPlus } from 'lucide-react';
import useEcomstore from '../../store/ecom-store';
import { numberFormat } from '../../utils/number'
import { motion } from 'framer-motion'

const ProductCard = ({ item }) => {
const actionAddtoCart = useEcomstore((state) => state.actionAddtoCart)
// console.log(item)
return (<motion.div
initial={{
opacity: 0,
scale: 0.5,
}}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.5 }}
whileHover={{ y: -5 }}
> <div className='bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl p-3 w-52 overflow-hidden transition duration-300'> <div className='overflow-hidden rounded-xl bg-gray-100'>
{
item.images && item.images.length > 0
? <img src={item.images[0].url} className='rounded-xl w-full h-32 object-cover hover:scale-110 hover:duration-300 transition' />


                    : <div className='w-full h-32 bg-gray-100 rounded-xl text-center flex items-center justify-center text-gray-400 text-sm'>
                        NO Image
                    </div>
            }
        </div>


        <div className='py-3'>
            <p className='text-lg font-semibold text-gray-800 truncate'>{item.title}</p>
            <p className='text-sm text-gray-500 truncate mt-1'>
                {item.description}
            </p>
        </div>


        <div className='flex justify-between items-center pt-2 border-t border-gray-100'>
            <span className='text-base font-bold text-blue-600'>{numberFormat(item.price)}</span>
            <button
                onClick={() => actionAddtoCart(item)}
                className='bg-blue-500 text-white rounded-xl p-2.5 hover:bg-blue-600 hover:scale-105 shadow-sm transition duration-200'>
                <ShoppingCartPlus size={20} />
            </button>
        </div>
    </div>
</motion.div>
)


}

export default ProductCard
