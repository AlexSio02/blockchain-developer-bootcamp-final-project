// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/access/Ownable.sol";

contract CustomSupCh is Ownable {

  string public name;
  uint private productCount = 0;
  mapping(uint => Product) public items;
  enum State{Create,Sold,Shipped}

  struct Product {
      uint id;
      string name;
      State state;
      uint price;
      address payable supplier;
  }

  mapping(address => bool) public whitelistedAddresses;

  event WhitelistedEvent(address a);

  // <LogSetRequirements event>
  event LogSetRequirements(string storedData);
  

  // <LogSold event>
  event LogSold(string storedData);

  // <LogShipped event>
  event LogShipped(string storedData);

  // <LogReceived event>
  event LogReceived(string storedData);

  event ProductCreated(
      uint id,
      string name,
      State state,
      uint price,
      address payable supplier
  );

  event ProductPurchased(
      uint id,
      string name,
      uint price,
      address payable owner
  );

  constructor () {
  }

/**
@dev Adds the address of the supplier to the whitelist and
@param _addressToWhitelist the address of the supplier
 */
    function addWhitelistedUser(address _addressToWhitelist) public onlyOwner {
        whitelistedAddresses[_addressToWhitelist] = true;
        emit WhitelistedEvent(_addressToWhitelist);
    }

/**
@dev checks if the supplier is withlisted
@param _address the adress of the supplier
 */

    modifier isWhitelisted(address _address) {
        require(whitelistedAddresses[_address], "You are not Whitelisted");
        _;
    }

/**
@dev shows the verified Suppliers
@return boolian 
 */

    function whitelisted() public view isWhitelisted(msg.sender) returns(bool) {
        return(true);
    }

/**
@dev checks the paid ammount
@param _price th price of th product
 */

  modifier paidEnough(uint _price) {
    require(msg.value >= _price);
    _;
  }
  

/**
@dev to change the state of the product to sold
@param _id the id of the product 
 */
  modifier sold(uint _id) {
    require( items[_id].state== State.Sold);
    _;
  }

/**
@dev to get the product number and acces the product to the
 */

  function getProductCount() public view returns(uint256){
    return(productCount);
  }

  function createProduct(string memory _name, uint _price) public isWhitelisted(msg.sender) { //onlyWhitelisted
    // Require a valid name
    require(bytes(_name).length > 0);
    // Require a valid price
    require(_price > 0);
    // Increment product count
    productCount ++;
    // Create the product
    items[productCount] = Product(productCount, _name, State.Create, _price, payable(msg.sender));
    // Trigger an event
    emit ProductCreated(productCount, _name, State.Create, _price, payable(msg.sender));
  }

  

  function buyItem(uint id) payable public paidEnough(items[id].price){
    (bool sent, bytes memory data) = payable(items[id].supplier).call{value: items[id].price}("");
    require(sent, "Failed");
    // items[id].buyer = payable(msg.sender);
    items[id].state=State.Sold;
    emit LogSold(name);
  }


  }

    
    
