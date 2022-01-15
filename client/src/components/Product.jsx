import React, { useState, useEffect } from "react";

function Product(props) {
  const [productPrice, setPrice] = useState('')
  const [productName, setName] = useState('')
  const [idp, setIdp] = useState('')
  const [namep, setNamep] = useState('')
  const [supplierp, setSupplierp] = useState('')
  const [statep, setStatep] = useState('')
  const [pricep, setPricep] = useState('')

  // const load = async() => {
  //   let id = ''
  //   let name =''
  //   let state =''
  //   let price = ''
  //   let supplier = ''
  //   try{
  //     props.socketInstance.events.ProductCreated({
  //       fromBlock: 0
  //     }, function(error, event){
  //         if(error) console.log(error)
  //         id = event.returnValues.id
  //         name = event.returnValues.name
  //         state = event.returnValues.state
  //         price = event.returnValues.price
  //         supplier = event.returnValues.supplier
  //         setIdp(id)
  //         setNamep(name)
  //         setSupplierp(supplier)
  //         setStatep(state)
  //         setPricep(price)
  //     })
  //   }catch{
  //       id = 'pending...'
  //       name = 'pending...'
  //       state = 'pending...'
  //       price = 'pending...'
  //       supplier = 'pending...'
  //       setIdp(id)
  //       setNamep(name)
  //       setSupplierp(supplier)
  //       setStatep(state)
  //       setPricep(price)

  //       setInterval(()=>{
  //         load()
  //       }, 2000)
  //     }
  // }

  // useEffect(() => {
  //   load()
  // }, [])


  return (
    <div id="content">
      <h1>Add Product</h1>
      <form onSubmit={(event) => {
        event.preventDefault()
        const name = {productName}.productName
        const price = props.web3.utils.toWei({productPrice}.productPrice.toString(), 'Ether')
          props.contract.methods.createProduct(name, price).send({from: props.accounts[0]})
      }}>
        <div className="form-group mr-sm-2">
          <input
            id="productName"
            type="text"
            value = {productName}
            onInput={e => setName(e.target.value)}
            className="form-control"
            placeholder="Product Name"
            required />
        </div>
        <div className="form-group mr-sm-2">
          <input
            id="productPrice"
            type="text"
            value = {productPrice}
            onInput={e => setPrice(e.target.value)}
            className="form-control"
            placeholder="Product Price"
            required />
        </div>
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
      <p>&nbsp;</p>
      <h2>Buy Product</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Owner</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody id="productList">
          <tr>
            <th scope="row">1</th>
            <td>Iphone 5</td>
            <td>5 ether</td>
            <td>0x4a82525d152d506FD8c9FFF2edD040C99B8bb8A0</td>
            <td><button className="buyButton" onClick={(event) => {
              event.preventDefault()
                props.contract.methods.buyItem(1).send({from: props.accounts[0], value: props.web3.utils.toWei(String(1), 'ether')})
      }}>Buy</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default Product;