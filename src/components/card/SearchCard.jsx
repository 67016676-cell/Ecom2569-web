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
    const inCheck = e.target.value      // ค่าที่ เราเลือกติ๊กเอาไว้
    const inState = [...categorySelected] // [] arr ว่าง
    const findCheck = inState.indexOf(inCheck) // ถ้าไม่เจอ จะ return -1

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



  return (
    <div>
      <h1 className='text-xl font-bold mb-4'>ค้นหาสินค้า</h1>
      {/* Search by Text */}
      <input
        onChange={(e) => setText(e.target.value)}
        type='text'
        placeholder='ค้นหาสินค้า....'
        className='border rounded-md w-full md-4 px-2'
      />
      <hr />
      {/* Search by Category */}
      <div>
        <h1>หมวดหมู่สินค้า</h1>
        <div>
          {
            categories.map((item, index) =>
              <div key={item.id} className='flex gap-2'>
                <input
                  onChange={handleCheck}
                  value={item.id}
                  type='checkbox' />
                <label > {item.name} </label>
              </div>
            )
          }
        </div>
      </div>
      <hr />

      {/* Search by Price*/}
      <div>
        <h1>ค้นหาราคา</h1>
        <div>
          <div className='flex justify-between'>
            <span>Min : {numberFormat(Price[0])}</span>
            <span>Max : {numberFormat(Price[1])}</span>
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