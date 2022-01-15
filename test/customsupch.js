const truffleAssert = require('truffle-assertions')
const CustomSupCh = artifacts.require("./CustomSupCh.sol");

contract("CustomSupCh", accounts => {
  it("product created", async () => {
    const c = await CustomSupCh.deployed()
    let owner = accounts[0]
    let supplier = accounts[1]
    let buyer = accounts[5]


    await c.addWhitelistedUser( supplier, {
      from: owner
    })

    await c.createProduct("Product0", 1, {
      from:supplier
    })

    let p = await c.getProductCount()

    assert.equal(p, 1, "Product not created!")
  });

  it("allows the contract owner to add new supplier", async () => {
    // const c = await CustomSupCh.deployed()
    let c = await CustomSupCh.new()
    let owner = accounts[0]
    let supplier = accounts[5]


    let z = await c.addWhitelistedUser( supplier, {
      from: owner
    })

    let b = await c.whitelisted( {
      from: supplier
    })

    assert.equal(b , true, "Supplier not added")
  });


  it("does not allow anyone but the contract owner to add new supplier", async () => {
    let c = await CustomSupCh.new()
    let owner = accounts[7] //not the owner
    let supplier = accounts[5]

    truffleAssert.reverts(c.addWhitelistedUser( supplier, {
      from: owner
    }), "Ownable: caller is not the owner")

  });

  it("item purchased", async () => {
    let c = await CustomSupCh.new()
    let owner = accounts[0]
    let supplier = accounts[5]
    let buyer = accounts[7]

    await c.addWhitelistedUser( supplier, {
      from: owner
    })

    await c.createProduct("Product0", 2, {
      from:supplier
    })

    let p = await c.items(1)

    await c.buyItem(p.id.words[0], {
      from: buyer,
      value: web3.utils.toWei('2', 'ether')
    })

    p = await c.items(1)

    assert.equal(p.state.words[0], 1, "Item state is not sold")
  });

  it("item shipped", async () => {
    let c = await CustomSupCh.new()
    let owner = accounts[0]
    let supplier = accounts[5]
    let buyer = accounts[7]

    await c.addWhitelistedUser( supplier, {
      from: owner
    })

    await c.createProduct("Product0", 2, {
      from:supplier
    })

    let p = await c.items(1)

    await c.buyItem(p.id.words[0], {
      from: buyer,
      value: web3.utils.toWei('2', 'ether')
    })

    await c.shipItem(p.id.words[0], {
      from: supplier
    })

    p = await c.items(1)

    assert.equal(p.state.words[0], 2, "Item state is not shipped")
  });
});
