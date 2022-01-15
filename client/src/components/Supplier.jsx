import React, { useState, useEffect } from "react";

function Supplier(props) {
  const [addressSupplier, setAddress] = useState('')
  const [addr, setAddr] = useState('')

  // const load = async() => {
  //     props.contract.whitelistedAddresses().forEach(i=>{console.log(i)})
  // }
    

  // useEffect(() => {
  //   load()
  // }, [])

  return (
    <div className="home">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg">
            <h1 className="font-weight-light">Add Address</h1>
            <form onSubmit={(event) => {
          event.preventDefault()
          const address = {addressSupplier}
          props.contract.methods.addWhitelistedUser(address.addressSupplier).send({from: props.accounts[0]})
        }}>
          <div className="form-group mr-sm-2 my-4">
            <input
              id="addressSupplier"
              type="text"
              value = {addressSupplier}
              onInput={e => setAddress(e.target.value)}
              className="form-control"
              placeholder="Supplier Address"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Supplier</button>
         </form>
          </div>
      </div>
      <div className="row align-items-center my-5">
        <table >
          <thead>
            <tr>
              <b>Verified Suppliers</b>
            </tr>
          </thead>
          <tbody>
            <tr>
              {addr}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>    
  )
 }
export default Supplier;