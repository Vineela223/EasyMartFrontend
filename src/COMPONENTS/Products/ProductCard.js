import React, {useState }from 'react'
import './ProductCard.css'
import { Link } from 'react-router-dom'

const ProductCard = ({data}) => {

  const [show, setshow] = useState(false)
  const [count, setCount] = useState(1);

  const [isWishlisted, setIsWishlisted] = useState(false); // State to toggle heart color

  

  
  return (
    <div className='product'>
     <div className='s1'>
  {data.productImages && data.productImages.length > 0 && data.productImages[0].image1 ? (
    <img src={`http://localhost:8080${data.productImages[0].image1}`} alt="Image 1" />
  ) : (
    <p>No image available</p>
  )}
</div>
      <div className='s2'>
      <h3>
        ${
Math.round((data.productPrice - (data.productPrice * data.productDiscount / 100)) * 100) / 100  
        }
        <span>${data.productPrice}</span>
      </h3>
      <p>{data.productName}</p>
      </div>
      <div className='s3'>
        <p>{data.productCountType}</p>
      </div>
       {show ?
          <div className='addbtn'>
            <div className='qty'>
              <button
                onClick={() => {
                  if (count > 1) {
                    setCount(count - 1)
                  }
                }}
              >-</button>
              <p>{count}</p>
              <button
                onClick={() => setCount(count + 1)}
              >+</button>
            </div>
            <button className='addtocart'
              onClick={() => {
                setshow(false)
                // setCount(1)
                //addtocart()
              }}
            >
              Add to cart
            </button>
          </div>
          :

          <div className='addbtn'>
          <Link
            to={`/product/${data.productId}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </Link>


          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"
            onClick={() => setshow(true)}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>

          <div className="wishList" onClick={() => setIsWishlisted(!isWishlisted)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={isWishlisted ? "red" : "none"} // Toggles fill color
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              className="heart-icon"
            >
              <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733C11.284 4.875 9.622 3.75 7.688 3.75 5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </div>

        </div>
}    
    </div>
  )
}

export default ProductCard
