import React, { useState,useEffect  } from 'react'
import { usePagination, Pagination } from "pagination-react-js"
import {FaPlus}  from 'react-icons/fa'
import axios from 'axios';
import CurrentTime from '../../CurrentTime'
import "../../owner/productPrice/ProductPrice.css"
import RVZ from "../../../../assets/rvz.jpg"
import { Link } from 'react-router-dom';



const AddProductPrice = () => {



  const tok = window.localStorage.token
  const tokenn = tok.slice(1, (tok.length) -1)


  const [query, setQuery] = useState("");
  
  useEffect(() => {
    fetch('http://api.etradingcrm.uz/api/Employee/All')

  }, []);
  
  const [items, setItems] = useState([]); 
  const [ updatedItems, setUpdatedItems ] = useState([])

  const { currentPage, entriesPerPage, entries } = usePagination(1, 8)


  // Hooks 
  const [ date, setDate] = useState();
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState(null);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');
  const [experience, setExperience] = useState('');
  const [phone, setPhone] = useState('');
  const [lastName, setLastName] = useState('');
  const [passportId, setPassportId] = useState('');
  const [description, setDesctiption] = useState('');
  const [price, setPrice] = useState('');
  const [select, setSelect] = useState('');
  const [category, setCategory] = useState('');
  const [selectedOption, setSelectedOption] = useState('')
  const [optionChange , setOptionChange] = useState('')
  const  a = window.localStorage.token;
  

  useEffect(() => {
    axios.get('http://api.etradingcrm.uz/api/Product/All')
      .then(res => {
        setItems(res);
      })
      .catch(err => console.log(err));
  }, []);


const obj = items.data

const arr =  []

for (const i in obj) {
  if (Object.hasOwnProperty.call(obj, i)) {
    const element = obj[i];
    arr.push(element)
  }
}

  // Modal 

  const handleAdd = () => {
    var modal = document.getElementById("myModal");
    modal.style.display = "block"
  }

  const handleCli = () => {
    var modal = document.getElementById("myModal");
    modal.style.display = "none"
  }


  
    const Token =  (localStorage.getItem('token')); 
    // console.log(Token);
    
    const handleSubmit = async (event) => {
      event.preventDefault();
      
      const inputData = {
        'name': (name),
        'description': (description),
        'price': parseInt(price),
        'category': parseInt(selectedOption),
        // 'phone': (phone),
        // 'salary': parseInt(salary),
        // 'experience': (experience),
  
      };
      // console.log(inputData);
      
      
      
      try {
        
        
        const response = await fetch('http://api.etradingcrm.uz/api/Product', {
          
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${tokenn}`,
            'accept': '*/*',
            'Content-Type': 'application/json'
          },
          
          body: JSON.stringify(inputData)
        });

   
    
      

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDesctiption(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  // const handleSelectedOptionChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    // console.log(event.target.value);
  };

  // const handlePhoneChange = (event) => {
  //   setPhone(event.target.value);
  // };
  // const handleSalaryChange = (event) => {
  //   setSalary(event.target.value);
  // };
  // const handleExperienceChange = (event) => {
  //   setExperience(event.target.value);
  // };





  // Del modal 





  const handleDelete = async () => {
    try {
      const response = await fetch(`http://api.etradingcrm.uz/api/Employee/${selectedItem.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${tokenn}`,
          }
        });
  

      if (response.ok) {
        const updatedItems = items.filter(item => item.id !== selectedItem.id  );
        setItems(updatedItems);

        setShowModal(false);
      } else {
        // Handle error response
        console.error('Delete request failed:', response.status, response.statusText);
      }
    } catch (error) {
      // Handle fetch error
      console.error('Delete request error:', error);
    }
  };
  
  const handleShowModal = item => {
    setSelectedItem(item);
    setShowModal(true);
  };
  
  const handleHideModal = () => {
    setShowModal(false);
  };




  // Edit modal 

  const handleEditClick = (item) => {
    setSelectedItems(item);
    setName(item.name);
    setLastName(item.lastName);
    setPassportId(item.passportId);
    setPosition(item.position);
    setSalary(item.salary);
    setExperience(item.experience);
    setPhone(item.phone);
    setShowEditModal(true);
  };




  const handleSaveClick = () => {
    const updatedItems = items.map((item) => {
      if (item.id === selectedItems.id) {
        return { ...item, name, lastName, passportId, salary, position, experience, phone };
      }
      return item;
    });
  
    const id = selectedItems.id;
    const data = JSON.stringify({
      id,
      name,
      lastName,
      passportId,
      position,
      salary,
      experience,
      phone,
    });
  
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${tokenn}`); 
  
    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: data,
      redirect: 'follow',
    };
  
    fetch('http://api.etradingcrm.uz/api/Employee/Update', requestOptions)
      .then((response) => response.text())
      .then(() => {
        setItems(updatedItems);
        setShowEditModal(false);
      })
      .catch((error) => console.log('error', error));
  };

const productAll = arr.map(item => item).length


const totelPriceAll = arr.map(item => item.price)
const priceAll = totelPriceAll.reduce((oldValue, currentValue) => oldValue + currentValue, 0);



  return (
    <div>

          <div className='input__divBlue'>
                 <div>
                     <input className='searchInput' type="search" placeholder='Search . . .'                 
                     onChange={(e) => setQuery(e.target.value.toLowerCase())}/>
                 </div>


                 <div className="currentDateTime">
                   
                   <CurrentTime/>
             
                </div>

                 <button className='btnAddWhite' handleAddExit={handleAdd} onClick={handleAdd} id="myBtn" ><b className='txtAddBlue'>Add</b><FaPlus className='FaPlusColor'/></button>
{/* Create Product */}

                <div id="myModal" className="modals">
                  <div style={{padding: "20px 0"}} className="modals-content">
                    <span onClick={handleCli} className="close">&times;</span>
                      <form className='modalForm' onSubmit={handleSubmit}>
                          <span className='addEmployeeTxt'>Product qo'shish</span>
                        <label className='modalFormLabel' htmlFor="name">
                          Name: 
                          <input  className='modalFormInput' placeholder='Name' type="text" name='name' value={name}
                          onChange={handleNameChange}/>
                        </label>

                        <label className='modalFormLabel' htmlFor="description">
                        Description:
                          {/* <input className='modalFormInput' placeholder='description' type="text" name='description' value={description} onChange={handleLastNameChange}/> */}
                          <textarea name="description" cols="30" rows="10" value={description} onChange={handleDescriptionChange} />
                        </label>

                        <label className='modalFormLabel' htmlFor="price">
                          Price: 
                          <input  className='modalFormInput' placeholder='price' type="number" name='price' value={price}
                          onChange={handlePriceChange}/>
                        </label>

                        <label className='modalFormLabel' htmlFor="option">
                          Category:
                            <select name="category" value={selectedOption} onChange={handleOptionChange}>
                              <option value={4}>Piece</option>
                              <option value={1}>Metr</option>
                              <option value={2}>KvadratMetr</option>
                              <option value={3}>Kilogram</option>
                            </select>                     
                          </label>
            

                        <button type='submit' className='modalFormBtn'>Save</button>


                      </form>
                  </div>

             
                </div>
                
          </div>





          <div className="products">

            <div className="productsItem">
            {arr.filter((row) => row.name.toLowerCase().includes(query)).slice(entries.indexOfFirst, entries.indexOfLast).map(item => (
                    <Link key={item.id} className='PdpLink' to={`PdpAdmin/${item.id}`}>
                    <div className="product">
                    <img className='productImg' src={RVZ} alt="Product Image" />
                    <p className='productName'>{item.name}</p>
                    <span className='productPrice'>{item.price} UZS </span>
                    </div>
                    </Link>
              ))}

                
            </div>
            
               

          </div>
      <div>
      {showEditModal && ( 
        <div className='modal'>
          <div className='modal-content'>
          {/* Edit Employee */}
                

                       


        </div>
        </div>
      )}
    </div>


      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="deleteModalTxt">Rostdan ham {selectedItem.name}ni o'chirmoqchimisiz?</h2>
            <button className="deleteModalYes" onClick={handleDelete}>Yes</button>
            <button className="deleteModalNo" onClick={handleHideModal}>No</button>
          </div>
        </div>
      )}

<div className="statistics">
    <span className="profit">Sotuvdagi maxsulotlar soni: {productAll}</span>

  </div>

        

  <Pagination 
  entriesPerPage={entriesPerPage.get}
  totalEntries={arr.length}
  currentPage={{ get: currentPage.get, set: currentPage.set }}
  offset={3}


  classNames={{
    wrapper: "pagination",
    item: "pagination-item",
    itemActive: "pagination-item-active",
    navPrev: "pagination-item nav-item",
    navNext: "pagination-item nav-item",
    navStart: "pagination-item nav-item",
    navEnd: "pagination-item nav-item",
    navPrevCustom: "pagination-item",
    navNextCustom: "pagination-item"
  }}
  showFirstNumberAlways={true}
  showLastNumberAlways={true}
  navStart="&#171;" 
  navEnd="&#187;" 
  navPrev="&#x2039;" 
  navNext="&#x203a;" 
  navPrevCustom={{ steps: 5, content: "\u00B7\u00B7\u00B7"}}
  navNextCustom={{ steps: 5, content: "\u00B7\u00B7\u00B7"}}
/>
    </div>
  )
}

export default AddProductPrice