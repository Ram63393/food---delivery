import React, { useContext, useEffect } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import './Verify.css'
import {useNavigate, useSearchParams} from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify'; 
const Verify = () => {
    const [searchParams,setSearchParams] =useSearchParams();
    const success=searchParams.get("success")
    const orderId=searchParams.get("orderId")
    console.log(success,orderId)
    const {backendURL}=useContext(StoreContext);
    const navigate=useNavigate()
    const verifyPayment=async ()=>{
        const response=await axios.post(backendURL+"/api/order/verify",{success,orderId})
        if(response.data.success){
            toast.success("Order Placed")
            navigate("/myorders")
        }else{
            toast.error('Payment failed. Please try again.');
            navigate("/")
        }
    }

    useEffect(()=>{
        verifyPayment()
    },[])

  return (
    <div className='verify'>
        <div className="spinner"></div>
    </div>
  )
}

export default Verify
