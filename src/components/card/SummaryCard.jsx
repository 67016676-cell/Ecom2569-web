import React, { useState, useEffect } from 'react'
import useEcomstore from '../../store/ecom-store'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {numberFormat} from '../../utils/number'

const SearchCard = () => {

const getProduct = useEcomstore((state) => state.getProduct)
const products = useEcomstore((state) => state.products)
const actionSearchFilters = useEcomstore((state) => state.actionSearchFilters)

const getCategory = useEcomstore((state) => state.getCategory)
const categories = useEcomstore((state) => state.categories)

const [text, setText] = useState('')
const [categorySelected, setCategorySelected] = useState([])

const [Price, setPrice] = useState([1000, 30000])
const [ok, setOk] = useState(false)

// console.log(categories)

useEffect(() => {
getCategory()
}, [])

// Step 1 Search Text
// console.log(text)
useEffect(() => {
//code
const delay = setTimeout(() => {


  if (text) {
    actionSearchFilters({ query: text })
  } else {
    getProduct()
  }

}, 300)

return () => clearTimeout(delay)


}, [text])

// Step 2 Search Category
const handleCheck = (e) => {
// console.log(e.target.value)
const inCheck = e.target.value
const inState = [...categorySelected]
const findCheck = inState.indexOf(inCheck)


if (findCheck === -1) {
  inState.push(inCheck)
} else {
  inState.splice(findCheck, 1)
}
setCategorySelected(inState)

if (inState.length > 0) {
  actionSearchFilters({ category: inState })
} else {
  getProduct()
}


}
// console.log(categorySelected)

// Step 3 Search by Price
useEffect(() => {
actionSearchFilters({ Price })
}, [ok])

const handlePrice = (value) => {
console.log(value)
setPrice(value)

setTimeout(() => {
  setOk(!ok)
}, 300)


}

return ( <div className='bg-white rounded-2xl shadow-sm border border-gray-200 p-5 space-y-6'> <div> <h1 className='text-2xl font-bold text-gray-800'>ค้นหาสินค้า</h1> <p className='text-sm text-gray-500 mt-1'>ค้นหาสินค้าตามชื่อ หมวดหมู่ และราคา</p> </div>

  <div>
    <input
      onChange={(e) => setText(e.target.value)}
      type='text'
      placeholder='ค้นหาสินค้า....'
      className='w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 outline-none bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition duration-200'
    />
  </div>

  <div className='border-t border-gray-200'></div>

  <div>
    <h1 className='text-lg font-bold text-gray-800 mb-4'>หมวดหมู่สินค้า</h1>
    <div className='space-y-2'>
      {
        categories.map((item, index) =>
          <div key={item.id} className='flex gap-3 items-center px-3 py-2 rounded-lg hover:bg-gray-50 transition duration-200'>
            <input
              onChange={handleCheck}
              value={item.id}
              type='checkbox'
              className='w-4 h-4 accent-blue-500 cursor-pointer'
            />
            <label className='text-gray-600 cursor-pointer'> {item.name} </label>
          </div>
        )
      }
    </div>
  </div>

  <div className='border-t border-gray-200'></div>

  <div>
    <h1 className='text-lg font-bold text-gray-800 mb-4'>ค้นหาราคา</h1>
    <div className='bg-gray-50 rounded-xl p-4 border border-gray-100'>
      <div className='flex justify-between gap-3 mb-5'>
        <div className='bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm'>
          <p className='text-xs text-gray-400'>ราคาต่ำสุด</p>
          <span className='font-semibold text-gray-700'>{numberFormat(Price[0])}</span>
        </div>

        <div className='bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-right'>
          <p className='text-xs text-gray-400'>ราคาสูงสุด</p>
          <span className='font-semibold text-gray-700'>{numberFormat(Price[1])}</span>
        </div>
      </div>


      <Slider
        onChange={handlePrice}
        range
        min={0}
        max={100000}
        defaultValue={[1000, 30000]}
      />
    </div>
  </div>


</div>


)
}

export default SearchCard
