import { useState } from "react";

const ProductCard = (props) => {
  const [numberOfProducts, setNumberOfProducts] = useState(0)
  const addToCart = () => {
    // Get existing cart items or initialize empty array
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const updatedCart = [...existingCartItems, props.products];
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    setNumberOfProducts(() => numberOfProducts + 1)
  };

  console.log({ numberOfProducts })

  return (
    <div className="card mb-3" style={{ maxWidth: '540px' }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={props.products.imageSrc} className="img-fluid rounded-start" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{props.products.name}</h5>
            <p className="card-text">Price: {props.products.price}</p>
            <p className="card-text">Quantity: {props.products.quantity}</p>
            <div>
              <button type="button" class="btn btn-primary position-relative mb-3">
                Number of items
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {numberOfProducts}
                </span>
              </button>
              <br />
              <button
                className="btn btn-primary"
                onClick={addToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard;
