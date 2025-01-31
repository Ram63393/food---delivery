import React from 'react'
import './List.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'
import { removeFood } from '../../../../backend/controllers/foodController';

const List = () => {
  const backendURL = "https://fooddelivery-backend1-di33.onrender.com"
  const [list, setList] = useState([]);
  const fetchList = async () => {
    const response = await axios.get(`${backendURL}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data)
    } else {
      toast.error("Error")
    }
  }

  const removeFood = async (foodId) => {
    // console.log(foodId);
    const response = await axios.post(`${backendURL}/api/food/remove`, { id: foodId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error")
    }
  }
  useEffect(() => {
    fetchList()
  }, [])
  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img src={`${backendURL}/images/${item.image}`} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
