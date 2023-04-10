import { Button } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'

function Item({item}) {
  const dispatch = useDispatch()
  function addTocart(){
      dispatch({type:'addToCart' , payload : {...item , quantity:1}})
  }
  return (
    <div className="item">
      <h4 className="name">{item.name}</h4>
      <img src={item.image} alt="" height="100" width="100" className='rounded-lg'/>
      <h4 className="price mt-3">
        <b>Price/kg :  </b>
        {"\u20B9"}
        {item.price}/-
      </h4>
      <div className="d-flex justify-content-end">
        <Button onClick={() => addTocart()}>Add To Cart</Button>
      </div>
    </div>
  );
}

export default Item