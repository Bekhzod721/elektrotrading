import React, { useState,useEffect  } from 'react'
import { usePagination, Pagination } from "pagination-react-js"
import {FaPlus}  from 'react-icons/fa'
import axios from 'axios';
import CurrentTime from '../../CurrentTime'
import "../../owner/productPrice/ProductPrice.css"
import RVZ from "../../../../assets/rvz.jpg"
import { Link } from 'react-router-dom';



const AddProductPrice = () => {

  const [query, setQuery] = useState("");
  
  useEffect(() => {
    fetch('http://api.etradingcrm.uz/api/Employee/All')

  }, []);
  
  const [items, setItems] = useState([]); 

  const { currentPage, entriesPerPage, entries } = usePagination(1, 8)

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


const productAll = arr.map(item => item).length

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

         

               
          </div>





          <div className="products">

            <div className="productsItem">
            {arr.filter((row) => row.name.toLowerCase().includes(query)).slice(entries.indexOfFirst, entries.indexOfLast).map(item => (
                    <Link key={item.id} className='PdpLink' to={`Pdp/${item.id}`}>
                    <div className="product">
                    <img className='productImg' src={RVZ} alt="Product Image" />
                    <p className='productName'>{item.name}</p>
                    <span className='productPrice'>{item.price} UZS </span>
                    </div>
                    </Link>
              ))}


                
            </div>
            
               

          </div>





       

  
   


<div className="statistics">
    <span className="profit">Umumiy xodimlar soni: {productAll}</span>

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
              navNextCustom: "pagination-item",
            }}
            showFirstNumberAlways={true}
            showLastNumberAlways={true}
            navStart="&#171;"
            navEnd="&#187;"
            navPrev="&#x2039;"
            navNext="&#x203a;"
            navPrevCustom={{ steps: 5, content: "\u00B7\u00B7\u00B7" }}
            navNextCustom={{ steps: 5, content: "\u00B7\u00B7\u00B7" }}
          />

        
    </div>
  )
}

export default AddProductPrice