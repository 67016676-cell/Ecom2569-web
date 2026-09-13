import React, { useState, useEffect } from 'react'
import { listUserCart, saveAddress } from '../../api/user'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { numberFormat } from '../../utils/number'

const SummaryCard = () => {
  const token = useEcomStore((state) => state.token)
  const [products, setProducts] = useState([])
  const [cartTotle, setCartTotle] = useState(0)

  const [address, setAddress] = useState('')
  const [addressSaved, setAddressSaved] = useState(false)

  const navigate = useNavigate()


  useEffect(() => {
    hdlGetUsercart(token)

  }, [])

  const hdlGetUsercart = (token) => {
    listUserCart(token)
      .then((res) => {
        // console.log(res)
        setProducts(res.data.products)
        setCartTotle(res.data.cartTotal)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const hdlSaveAddress = () => {
    if (!address) {
      return toast.warning('Please fill address')
    }
    saveAddress(token, address)
      .then((res) => {
        console.log(res)
        toast.success(res.data.message)
        setAddressSaved(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const hdlGoToPayment = () => {
    if (!addressSaved) {
      return toast.warning('กรุณากรอกที่อยู่ก่อน');
    }
    navigate('/user/payment');
  }

  console.log(products)


  return (
    <div className=' mx-auto'>
      <div className=' flex flex-wrap gap-4'>
        {/* left */}
        <div className='w-2/4'>
          <div className='bg-gray-100 p-4 rounded-md border shadow-md space-y-4'>
            <h1 className='font-bold text-2xl'>ที่อยู่ในการจัดส่ง</h1>
            <textarea required onChange={(e) => setAddress(e.target.value)} placeholder='กรุณากรอกที่อยู่จัดส่ง' className='w-full px-2 rounded-md' />
            <button onClick={hdlSaveAddress} className='bg-blue-400 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 hover:scale-105 hover:translate-y-1 hover:duration-200'> Save Address </button>
          </div>
        </div>

        {/* Rigth */}
        <div className=' w-2/4'>
          <div className='bg-gray-100 p-4 rounded-md border shadow-md space-y-4'>
            <h1 className='text-lg font-bold'>คำสั่งซื้อของคุณ</h1>

            {/* Item List */}


            {
              products?.map((item, index) =>
                <div key={index}>

                  <div className='flex justify-between  items-end'>
                    <div>
                      <p className='font-bold'>{item.product.title}</p>
                      <p className='text-sm'>จำนวน : {item.count} x {numberFormat(item.product.price)}</p>
                    </div>

                    <div>
                      <p className='text-red-500 font-bold'>{numberFormat(item.count * item.product.price)}</p>
                    </div>

                  </div>
                </div>
              )
            }


            <div>
              <div className=' flex justify-between'>
                <p>ค่าจัดส่ง : </p>
                <p>0.00</p>
              </div>

              <div className=' flex justify-between'>
                <p>ส่วนลด : </p>
                <p>0.00</p>
              </div>
            </div>


            <hr />
            <div>
              <div className=' flex justify-between'>
                <p className='font-bold '>ยอดรวมสุทธิ : </p>
                <p className='text-red-500 font-bold text-lg'>{numberFormat(cartTotle)}</p>
              </div>
              <hr />
              <hr />
              <div >
                <button onClick={hdlGoToPayment}
                  // disabled={!addressSaved} 
                  className='bg-green-400 w-full p-2 rounded-md shadow-md text-white hover:bg-green-700 flex justify-center'>ดำเนินการชำระเงิน</button>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SummaryCard