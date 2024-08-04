import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import apiInstance from '../../store/axios'
import UserData from '../plugin/UseData'
import CartID from '../plugin/CartID'
import GetCurrentAddress from '../plugin/UserCountry'
import Swal from 'sweetalert2';


function Cart() {
    const card_id = CartID()
    const userdata = UserData()
    const [cart, Setcart] = useState([])
    const [carttotal, Setcarttotal] = useState([])
    const [ProductQty, SetProductQty] = useState('')
    const [fullname, Setfullname] = useState('')
    const [email, Setemail] = useState('')
    const [mobile, Setmobile] = useState('')
    const [address, Setaddress] = useState('')
    const [city, Setcity] = useState('')
    const [country, Setcountry] = useState('')
    const [state, Setstate] = useState('')
    const navigate = useNavigate()
    console.log('card_id', card_id, 'userdata', userdata?.user_id)

    const currentAddress = GetCurrentAddress()


    const Toast = Swal.mixin({
        Toast: true,
        position: "top",
        showCancelButton: false,
        timer: 5000,
        timerProgressBar: true
    })

    const FetchCartData = (card_id, user_id) => {
        const url = user_id ? `cart-list/${card_id}/${user_id}/` : `card-list/${card_id}`
        console.log(url)
        apiInstance.get(url).then((res) => {
            console.log('res', res.data)
            Setcart(res.data)
        })
    }



    const FetchCartTotal = (card_id, user_id) => {
        const url = user_id ? `cart-detail/${card_id}/${user_id}/` : `cart-detail/${card_id}`
        console.log(url)
        apiInstance.get(url).then((res) => {
            console.log('res', res.data)
            Setcarttotal(res.data)
        })
    }


    // check if the user and card is are defined, 
    if (card_id !== null || card_id !== undefined) {
        if (userdata !== undefined) {
            useEffect(() => {
                console.log(card_id, userdata?.user_id)
                FetchCartData(card_id, userdata?.user_id)
                FetchCartTotal(card_id, userdata?.user_id)
            }, [])
        } else {
            useEffect(() => {
                FetchCartData(card_id, null)
                FetchCartTotal(card_id, null)
            }, [])
        }
    }
    console.log(carttotal)

    useEffect(() => {
        const initialquantities = {}
        cart.forEach((c) => {
            initialquantities[c.product?.id] = c.qty
        })
        SetProductQty(initialquantities)
    }, [cart])



    const HandleQtyChange = (event, product_id) => {
        const quantity = event.target.value
        console.log(quantity)
        console.log(product_id)

        SetProductQty((prevquantities) => ({
            ...prevquantities,
            [product_id]: quantity
        }))
    }

    const updateCart = async (product_id, price, shipping_amount, colorValue, sizeValue) => {
        console.log("you clicked here")
        const QtyValue = ProductQty[product_id]
        console.log(QtyValue)

        const Formdata = new FormData()

        Formdata.append("product", product_id)
        Formdata.append("user", userdata?.user_id)
        Formdata.append("qty", QtyValue)
        Formdata.append("price", price)
        Formdata.append("shipping_amount", shipping_amount)
        Formdata.append("country", currentAddress.country)
        Formdata.append("size", sizeValue)
        Formdata.append("color", colorValue)
        Formdata.append("cart_id", card_id)

        FetchCartData(card_id, userdata?.user_id)
        FetchCartTotal(card_id, userdata?.user_id)



        const response = await apiInstance.post("cart-view/", Formdata)
        console.log(response)
        Toast.fire({
            icon: "success",
            title: response.data.message
        })


    }


    const handleDeletecartItem = async (itemID) => {
        console.log("deleted", itemID)
        const url = userdata?.user_id
            ? `cart-delete/${card_id}/${itemID}/${userdata?.user_id}`
            : `cart-delete/${card_id}/${itemID}/`

        try {
            const response = await apiInstance.delete(url)
            console.log("response", response)
            Toast.fire({
                icon: "success",
                title: response.data.message
            })
        } catch (error) {
            alert(error)
        }
    }



    const HandleChange = (event) => {
        const { name, value } = event.target
        switch (name) {
            case 'fullname':
                Setfullname(value)
                break;

            case 'email':
                Setemail(value)
                break;

            case 'mobile':
                Setmobile(value)
                break;

            case 'address':
                Setaddress(value)
                break;

            case 'city':
                Setcity(value)
                break;

            case 'state':
                Setstate(value)
                break;

            case 'country':
                Setcountry(value)
                break;

            default:
                break
        }
    }


    const createOrder = async ()=> {
        if(!fullname || !email || !mobile || !address || !city || !state ){
                Swal.fire({
                    icon: 'warning',
                    title:'Missing Fields', 
                    text: 'Please fill all fields for this form'
                    }
                )
        }
        else{
            const Formdata = new FormData()

            Formdata.append("full_name", fullname)
            Formdata.append("email", email)
            Formdata.append("mobile", mobile)
            Formdata.append("address", address)
            Formdata.append("city", city)
            Formdata.append("state", state)
            Formdata.append("country", country)
            // if user data does not exist send 0 as a user:
            Formdata.append("user_id",  userdata ? userdata?.user_id : 0  )
            Formdata.append("cart_id", card_id )

            try {
                const response =  await apiInstance.post("create-order/", Formdata)
                console.log(response)
                Toast.fire({
                    icon:"success",
                    title:response.data.message
                  })
                
                navigate(`/checkout/${response.data.order_oid}/`)
            } catch (error) {
                Toast.fire({
                    icon:"error",
                    title:error
                  })
            }
        }
        
            
        
     
    }
    return (

        <div>
            <main className="mt-5">
                <div className="container">
                    <main className="mb-6">
                        <div className="container">
                            <section className="">
                                <div className="row gx-lg-5 mb-5">
                                    <div className="col-lg-8 mb-4 mb-md-0">
                                        <section className="mb-5">

                                            <div className="row border-bottom mb-4">
                                                {cart?.map((c, index) => (
                                                    <div className="row border-bottom mb-4">
                                                        <div className="col-md-2 mb-4 mb-md-0">
                                                            <div
                                                                className="bg-image ripple rounded-5 mb-4 overflow-hidden d-block"
                                                                data-ripple-color="light"
                                                            >
                                                                <Link to=''>
                                                                    <img
                                                                        src={c.product?.image}
                                                                        className="w-100"
                                                                        alt=""
                                                                        style={{ height: "100px", objectFit: "cover", borderRadius: "10px" }}
                                                                    />
                                                                </Link>
                                                                <a href="#!">
                                                                    <div className="hover-overlay">
                                                                        <div
                                                                            className="mask"
                                                                            style={{
                                                                                backgroundColor: "hsla(0, 0%, 98.4%, 0.2)"
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-8 mb-4 mb-md-0">
                                                            <Link to={null} className="fw-bold text-dark mb-4">{c.product?.title}</Link>
                                                            <p className="mb-0">
                                                                <span className="text-muted me-2">Size:</span>
                                                                <span>{c.size}</span>
                                                            </p>
                                                            <p className='mb-0'>
                                                                <span className="text-muted me-2">Color:</span>
                                                                <span>{c.color}</span>
                                                            </p>
                                                            <p className='mb-0'>
                                                                <span className="text-muted me-2">Price:</span>
                                                                <span>${c.price}</span>
                                                            </p>
                                                            <p className='mb-0'>
                                                                <span className="text-muted me-2">Stock Qty:</span>
                                                                <span>{c.qty}</span>
                                                            </p>
                                                            <p className='mb-0'>
                                                                <span className="text-muted me-2">Vendor:</span>
                                                                <span>{c.product?.vendor?.name}</span>
                                                            </p>
                                                            <p className="mt-3">
                                                                <button onClick={() => { handleDeletecartItem(c.id) }} className="btn btn-danger ">
                                                                    <small><i className="fas fa-trash me-2" />Remove</small>
                                                                </button>
                                                            </p>
                                                        </div>
                                                        <div className="col-md-2 mb-4 mb-md-0">
                                                            <div className="d-flex justify-content-center align-items-center">
                                                                <div className="form-outline">
                                                                    <input
                                                                        type="number"
                                                                        className="form-control"
                                                                        value={ProductQty[c.product?.id || c.qty]
                                                                        }
                                                                        min={1}
                                                                        onChange={(e) => HandleQtyChange(e, c.product?.id)}

                                                                    />
                                                                </div>
                                                                <button onClick={() => updateCart(c.product?.id, c.product.price, c.product.shipping_amount, c.color, c.size)} className='ms-2 btn btn-primary'><i className='fas fa-rotate-right'></i></button>
                                                            </div>
                                                            <h5 className="mb-2 mt-3 text-center"><span className="align-middle">${c.sub_total}</span></h5>
                                                        </div>
                                                    </div>

                                                ))}



                                            </div>

                                            <>
                                                <h5>Your Cart Is Empty</h5>
                                                <Link to='/'> <i className='fas fa-shopping-cart'></i> Continue Shopping</Link>
                                            </>

                                        </section>
                                        <div>
                                            <h5 className="mb-4 mt-4">Personal Information</h5>
                                            {/* 2 column grid layout with text inputs for the first and last names */}
                                            <div className="row mb-4">
                                                <div className="col">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="full_name"> <i className='fas fa-user'></i> Full Name</label>
                                                        <input
                                                            type="text"
                                                            id=""
                                                            name='fullname'
                                                            className="form-control"
                                                            onChange={HandleChange}
                                                            value={fullname}
                                                        />
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="row mb-4">
                                                <div className="col">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="form6Example1"><i className='fas fa-envelope'></i> Email</label>
                                                        <input
                                                            type="text"
                                                            id="form6Example1"
                                                            name='email'
                                                            className="form-control"
                                                            onChange={HandleChange}
                                                            value={email}

                                                        />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="form6Example1"><i className='fas fa-phone'></i> Mobile</label>
                                                        <input
                                                            type="text"
                                                            id="form6Example1"
                                                            className="form-control"
                                                            name='mobile'
                                                            onChange={HandleChange}
                                                            value={mobile}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <h5 className="mb-1 mt-4">Shipping address</h5>

                                            <div className="row mb-4">
                                                <div className="col-lg-6 mt-3">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="form6Example1"> Address</label>
                                                        <input
                                                            type="text"
                                                            id="form6Example1"
                                                            name='address'
                                                            className="form-control"
                                                            onChange={HandleChange}
                                                            value={address}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 mt-3">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="form6Example1"> City</label>
                                                        <input
                                                            type="text"
                                                            id="form6Example1"
                                                            address name='city'
                                                            className="form-control"
                                                            onChange={HandleChange}
                                                            value={city}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mt-3">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="form6Example1"> State</label>
                                                        <input
                                                            type="text"
                                                            id="form6Example1"
                                                            name='state'
                                                            className="form-control"
                                                            onChange={HandleChange}
                                                            value={state}  
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 mt-3">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="form6Example1"> Country</label>
                                                        <input
                                                          name='country'
                                                          className="form-control"
                                                          onChange={HandleChange}
                                                          value={country}  
                                                         />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 mb-4 mb-md-0">
                                        {/* Section: Summary */}
                                        <section className="shadow-4 p-4 rounded-5 mb-4">
                                            <h5 className="mb-3">Cart Summary</h5>
                                            <div className="d-flex justify-content-between mb-3">
                                                <span>Subtotal </span>
                                                <span>${carttotal.sub_total?.toFixed(2)}</span>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <span>Shipping </span>
                                                <span>${carttotal.shipping?.toFixed(2)}</span>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <span>Tax </span>
                                                <span>${carttotal.tag?.toFixed(2)}</span>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <span>Servive Fee </span>
                                                <span>${carttotal.service_fee?.toFixed(2)}</span>
                                            </div>
                                            <hr className="my-4" />
                                            <div className="d-flex justify-content-between fw-bold mb-5">
                                                <span>Total </span>
                                                <span>${carttotal.total?.toFixed(2)}</span>
                                            </div>
                                            <button onClick={createOrder} className="btn btn-primary btn-rounded w-100" >
                                                Got to checkout
                                            </button >
                                        </section>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </main>
                </div>
            </main>
        </div>
    )
}

export default Cart
