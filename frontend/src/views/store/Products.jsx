import React, { useEffect, useState } from 'react'
import apiInstance from '../../store/axios'
import { Link } from 'react-router-dom';
import GetCurrentAddress from '../plugin/UserCountry'
import UserData from '../plugin/UseData'
import CartID from '../plugin/CartID'
import Swal from 'sweetalert2';


const Toast = Swal.mixin({
  Toast:true, 
  position:"top",
  showCancelButton:false,
  timer:5000,
  timerProgressBar:true
})

function Products() {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState([])
  const [colorValue, SetcolorValue] = useState("No color")
  const [sizeValue, SetsizeValue] = useState("No size")
  const [QtyValue, SetQtyValue] = useState(1)
  const [selectedProduct, SetselectedProduct] = useState({})
  const [selectedcolor, Setselectedcolor] = useState({})
  const [selectedsize, Setselectedsize] = useState({})
  const [selectedqty, Setselectedqty] = useState({})
  const [qtyValue, setQtyValue] = useState(1)
  
  const card_id = CartID()
  const userData = UserData()
  const currentAddress = GetCurrentAddress()
  



  const HandleColorButtonClick = (event, product_id, colorName) => {
    SetcolorValue(colorName)
    SetselectedProduct(product_id)
    Setselectedcolor((prevSelectColors) => ({
      ...prevSelectColors,
      [product_id]: colorName
    }))


    
  }

  const HandleSizeButtonClick = (event, product_id, sizename) => {
    console.log(product_id, sizename);
    SetsizeValue(sizename);
    Setselectedsize((prevSelectSize) => ({
      ...prevSelectSize,
      [product_id]: sizename,
    }));
  };



  const handleQtyChange = (event, product_id) => {
    console.log(event.target.value)
    setQtyValue(event.target.value);
    SetselectedProduct(product_id);
    Setselectedqty((prevSelectqty) => ({
      ...prevSelectqty,
      [product_id]: event.target.value,
    }))
  };

  console.log(selectedcolor, selectedProduct, selectedqty)


  const handleAddToCard = async (product_id, price, shipping_amount ) => {
        console.log("clicked")
            
            const Formdata = new FormData()

            Formdata.append("product", product_id)
            Formdata.append("user",  userData.user_id)
            Formdata.append("qty", QtyValue)
            Formdata.append("price", price)
            Formdata.append("shipping_amount", shipping_amount)
            Formdata.append("country", currentAddress.country)
            Formdata.append("size",sizeValue)
            Formdata.append("color", colorValue)
            Formdata.append("cart_id", card_id)

            const response = await apiInstance.post("cart-view/", Formdata)
            console.log(response)
            Toast.fire({
              icon:"success",
              title:response.data.message
            })



 
 
  }

  console.log(selectedcolor, selectedProduct, selectedsize)

  useEffect(() => {
    const response = apiInstance.get("/products").then((res) => {
    console.log(res.data, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
      setProducts(res.data)
    })

  }, [])
  // if you dont use this [] the react will be request all the time

  useEffect(() => {
    const response = apiInstance.get("/category").then((res) => {
      console.log("categoria ")
      console.log(res.data)
      setCategory(res.data)
    })

  }, [])
  


  return (
    <div>
      <main className="mt-5">
        <div className="container">
          <section className="text-center">
            <div className="row">
              {products?.map((p, index) => (
                <div className="col-lg-4 col-md-12 mb-4">
                  <div className="card">
                    <div
                      className="bg-image hover-zoom ripple"
                      data-mdb-ripple-color="light"
                    >
                      <Link to={`/detail/${p.slug}/`}>
                        <img
                          src={p.image}
                          className="w-100"
                        />

                      </Link>

                      <a href="#!">
                        <div className="mask">
                          <div className="d-flex justify-content-start align-items-end h-100">
                            <h5>
                              <span className="badge badge-primary ms-2">New</span>
                            </h5>
                          </div>
                        </div>
                        <div className="hover-overlay">
                          <div
                            className="mask"
                            style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                          />
                        </div>
                      </a>
                    </div>
                    <div className="card-body">
                      <a href="" className="text-reset">
                        <h5 className="card-title mb-3">{p.title}</h5>
                      </a>
                      <a href="" className="text-reset">
                        <p>{p.category.title}</p>
                      </a>
                      <div className='d-flex justify-content-center'>
                        <h6 className="mb-3">{p.price} </h6>
                        <h6 className="mb-3 text-muted " ><strike> {p.old_price} </strike></h6>
                      </div>
                      <div className="d-flex flex-column mt-3">

                        <b>Quantity </b>
                        <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                          <input type="number" className='form-control ' value={selectedqty[p.id]} onChange={(e) => handleQtyChange(e, p.id)} />
                        </div>
                      </div>
                      <div className="btn-group">
                        <button
                          className="btn btn-primary dropdown-toggle"
                          type="button"
                          id="dropdownMenuClickable"
                          data-bs-toggle="dropdown"
                          data-bs-auto-close="false"
                          aria-expanded="false"
                        >
                          Variation
                        </button>

                        <ul
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuClickable"
                        >
                          {p.size?.length > 0 &&
                            <div className="d-flex flex-column">
                              <li className="p-1">
                              <li className="p-1"><b>Size</b>: {selectedsize[p.id] || 'Select a size'}</li>

                              </li>
                              <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                                {p.size?.map((size, index) => (
                                  <li>
                                    <button className="btn btn-secondary btn-sm me-2 mb-1"
                                      onClick={(e) => HandleSizeButtonClick(e, p.id, size.name)}>
                                      {size.name}
                                    </button>
                                  </li>
                                ))}
                              </div>
                            </div>
                          }
                          {p.color?.length > 0 &&
                            <div className="d-flex flex-column mt-3">
                              <li className="p-1">
                                <b>COlor</b>:  {selectedcolor[p.id] || 'Select a size'}
                                
                              </li>
                              <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                                {p.color?.map((color, index) => (

                                  <li>
                                    <button
                                      className="btn btn-sm me-2 mb-1 p-3"
                                      style={{ backgroundColor: `${color.color_code}` }}
                                      onClick={(e) => HandleColorButtonClick(e, p.id, color.color_code)}
                                    />
                                  </li>
                                ))}
                              </div>
                            </div>

                          }

                          <div className="d-flex mt-3 p-1">
                            <button 
                            onClick={()=>handleAddToCard(p.id, p.price, p.shipping_amount)}
                              type="button"
                              className="btn btn-primary me-1 mb-1"
                            >
                              <i className="fas fa-shopping-cart" />
                              
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger px-3 me-1 mb-1 ms-2"
                            >
                              <i className="fas fa-heart" />
                            </button>
                          </div>
                        </ul>
                        <button
                          type="button"
                          className="btn btn-danger px-3 me-1 ms-2"
                        >
                          <i className="fas fa-heart" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}


              <div className='row'>
                {category?.map((c, index) => (
                  <div className="col-lg-2">
                    <img src={c.image} style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }} alt="categories" />
                    <h6>{c.title}</h6>
                  </div>
                ))}
              </div>

            </div>
          </section>
          {/*Section: Wishlist*/}
        </div>
      </main>
      {/*Main layout*/}
      <main>
        <section className="text-center container">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
              <h1 className="fw-light">Trending Products</h1>
              <p className="lead text-muted">
                Something short and leading about the collection below—its
                contents
              </p>
            </div>
          </div>
        </section>
        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              <div className="col">
                <div className="card shadow-sm">
                  <svg
                    className="bd-placeholder-img card-img-top"
                    width="100%"
                    height={225}
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Placeholder: Thumbnail"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                  >
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#55595c" />
                    <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                      Thumbnail
                    </text>
                  </svg>
                  <div className="card-body">
                    <p className="card-text">
                      This is a wider card with supporting text below as a natural
                      lead-in to additional content. This content is a little bit
                      longer.
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          Edit
                        </button>
                      </div>
                      <small className="text-muted">9 mins</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow-sm">
                  <svg
                    className="bd-placeholder-img card-img-top"
                    width="100%"
                    height={225}
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Placeholder: Thumbnail"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                  >
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#55595c" />
                    <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                      Thumbnail
                    </text>
                  </svg>
                  <div className="card-body">
                    <p className="card-text">
                      This is a wider card with supporting text below as a natural
                      lead-in to additional content. This content is a little bit
                      longer.
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          Edit
                        </button>
                      </div>
                      <small className="text-muted">9 mins</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow-sm">
                  <svg
                    className="bd-placeholder-img card-img-top"
                    width="100%"
                    height={225}
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Placeholder: Thumbnail"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                  >
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#55595c" />
                    <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                      Thumbnail
                    </text>
                  </svg>
                  <div className="card-body">
                    <p className="card-text">
                      This is a wider card with supporting text below as a natural
                      lead-in to additional content. This content is a little bit
                      longer.
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          Edit
                        </button>
                      </div>
                      <small className="text-muted">9 mins</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow-sm">
                  <svg
                    className="bd-placeholder-img card-img-top"
                    width="100%"
                    height={225}
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Placeholder: Thumbnail"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                  >
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#55595c" />
                    <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                      Thumbnail
                    </text>
                  </svg>
                  <div className="card-body">
                    <p className="card-text">
                      This is a wider card with supporting text below as a natural
                      lead-in to additional content. This content is a little bit
                      longer.
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          Edit
                        </button>
                      </div>
                      <small className="text-muted">9 mins</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow-sm">
                  <svg
                    className="bd-placeholder-img card-img-top"
                    width="100%"
                    height={225}
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Placeholder: Thumbnail"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                  >
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#55595c" />
                    <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                      Thumbnail
                    </text>
                  </svg>
                  <div className="card-body">
                    <p className="card-text">
                      This is a wider card with supporting text below as a natural
                      lead-in to additional content. This content is a little bit
                      longer.
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          Edit
                        </button>
                      </div>
                      <small className="text-muted">9 mins</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow-sm">
                  <svg
                    className="bd-placeholder-img card-img-top"
                    width="100%"
                    height={225}
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Placeholder: Thumbnail"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                  >
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#55595c" />
                    <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                      Thumbnail
                    </text>
                  </svg>
                  <div className="card-body">
                    <p className="card-text">
                      This is a wider card with supporting text below as a natural
                      lead-in to additional content. This content is a little bit
                      longer.
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          Edit
                        </button>
                      </div>
                      <small className="text-muted">9 mins</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow-sm">
                  <svg
                    className="bd-placeholder-img card-img-top"
                    width="100%"
                    height={225}
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Placeholder: Thumbnail"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                  >
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#55595c" />
                    <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                      Thumbnail
                    </text>
                  </svg>
                  <div className="card-body">
                    <p className="card-text">
                      This is a wider card with supporting text below as a natural
                      lead-in to additional content. This content is a little bit
                      longer.
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          Edit
                        </button>
                      </div>
                      <small className="text-muted">9 mins</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow-sm">
                  <svg
                    className="bd-placeholder-img card-img-top"
                    width="100%"
                    height={225}
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Placeholder: Thumbnail"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                  >
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#55595c" />
                    <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                      Thumbnail
                    </text>
                  </svg>
                  <div className="card-body">
                    <p className="card-text">
                      This is a wider card with supporting text below as a natural
                      lead-in to additional content. This content is a little bit
                      longer.
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          Edit
                        </button>
                      </div>
                      <small className="text-muted">9 mins</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow-sm">
                  <svg
                    className="bd-placeholder-img card-img-top"
                    width="100%"
                    height={225}
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Placeholder: Thumbnail"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                  >
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#55595c" />
                    <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                      Thumbnail
                    </text>
                  </svg>
                  <div className="card-body">
                    <p className="card-text">
                      This is a wider card with supporting text below as a natural
                      lead-in to additional content. This content is a little bit
                      longer.
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          Edit
                        </button>
                      </div>
                      <small className="text-muted">9 mins</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

  )
}

export default Products
