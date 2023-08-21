import React, { useState, useEffect } from "react";
import { usePagination, Pagination } from "pagination-react-js";
import { MdDelete } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import CurrentTime from "../../CurrentTime";

const AddOrder = () => {

  const handleRefreshClick = () => {
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const d = "Bearer";

  const tok = window.localStorage.token;
  const tokenn = tok.slice(1, tok.length - 1);

  const [query, setQuery] = useState("");

  const [items, setItems] = useState([]);
  const { currentPage, entriesPerPage, entries } = usePagination(1, 11);
  // Hooks
  const [date, setDate] = useState();
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState(null);
  const [price, setPrice] = useState("");
  const [avans, setAvans] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [productId, setProductId] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [deadLine, setDeadLine] = useState("");
  const [isSubmitted, setIsSubmitted] = useState("");
  const [optionChange, setOptionChange] = useState("");

  const [fil, setFil] = useState(items);
  const [month, setMonth] = useState("");



  const [productst, setProductst] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://api.etradingcrm.uz/api/Product/All')
      .then(response => response.json())
      .then(data => setProductst(data))
      .catch(error => console.log(error));
  }, []);

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = productst.filter(product => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  

  useEffect(() => {
    axios
      .get("http://api.etradingcrm.uz/api/Order/All")
      .then((res) => {
        const items = res.data;
        setItems(items);
        setFil(items);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    const defaultMonthValue = `${currentDate.getFullYear()}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}`;
    setMonth(defaultMonthValue);
  }, []);

  const handleMonth = (e) => {
    const filtee = e.target.value;
    setMonth(filtee);
    const filteredData = items.filter((item) => {
      const itemDate = item.createdDate.slice(0, 7);
      return itemDate === filtee;
    });
    setFil(filteredData);
  };



  // Modal

  const handleAdd = () => {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  };

  const handleCli = () => {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const inputData = {
      productId: parseInt(selectedOption),
      description: description,
      price: parseInt(price),
      avans: parseInt(avans),
      amount: parseInt(amount),
      category: parseInt(2),
      deadLine: deadLine,
    };

    try {
      const response = await fetch("http://api.etradingcrm.uz/api/Order", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenn}`,
          accept: "*/*",
          "Content-Type": "application/json",
        },

        body: JSON.stringify(inputData),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    handleRefreshClick()
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleProductIdChange = (event) => {
    setProductId(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const handleAvansChange = (event) => {
    setAvans(event.target.value);
  };
  const handleSelectedOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value);
  };
  const handleDeadLineChange = (event) => {
    setDeadLine(event.target.value);
  };

  // Del modal

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://api.etradingcrm.uz/api/Order/${selectedItem.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${tokenn}`,
          },
        }
      );

      if (response.ok) {
        const updatedItems = items.filter(
          (item) => item.id !== selectedItem.id
        );
        setItems(updatedItems);

        setShowModal(false);
      } else {
        // Handle error response
        console.error(
          "Delete request failed:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      // Handle fetch error
      console.error("Delete request error:", error);
    }
  };

  const handleShowModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  // Edit modal

  const handleEditClick = (item) => {
    setSelectedItems(item);
    setAmount(item.amount);
    setDescription(item.description);
    setPrice(item.price);
    setAvans(item.avans);
    setDeadLine(item.deadLine);
    setSelectedOption(item.isSubmitted);
    setShowEditModal(true);
  };

  const handleSaveClick = () => {
    const updatedItems = items.map((item) => {
      if (item.id === selectedItems.id) {
        return { ...item, amount, description, price, deadLine, isSubmitted };
      }
      return item;
    });

    const orderId = selectedItems.id;

    const data = JSON.stringify({
      orderId,
      description: description,
      price: parseInt(price),
      avans: parseInt(avans),
      amount: parseInt(amount),
      deadLine: deadLine,
      isSubmitted: Boolean(selectedOption),
    });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${tokenn}`);

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: data,
      redirect: "follow",
    };

    fetch("http://api.etradingcrm.uz/api/Order", requestOptions)
      .then((response) => response.text())
      .then(() => {
        setItems(updatedItems);
        setShowEditModal(false);
      })
      .catch((error) => console.log("error", error));
      handleRefreshClick()
  };
  // console.log(fil);

  const totalDebtSummsAll = fil.map(item => item.amount)
  const totalDebtAll = totalDebtSummsAll.reduce((oldValue, currentValue) => oldValue + currentValue, 0);

  const totelPriceAll = fil.map(item => item.price)
  const priceAll = totelPriceAll.reduce((oldValue, currentValue) => oldValue + currentValue, 0);


  return (
    <div>
      <table>
        <thead>
          <tr className="th__title" style={{ listStyle: "none" }}>
            <td className="thItemName">
              <b>Nomi</b>
            </td>
            <td className="thItemAmount">
              <b>Miqdori</b>
            </td>
            <td className="thItemDescription">
              <b>Izoh</b>
            </td>
            <td className="thItemPrice">
              <b>Narxi</b>
            </td>
            <td className="thItemTotalPrice">
              <b>Avans</b>
            </td>
            <td className="trItemDeadline">
              <b>Muddati</b>
            </td>
            <td className="action">
              <b>Action</b>
            </td>
          </tr>
        </thead>
      </table>

      <div className="input__div">
        <div>
          <input
            className="searchInput"
            type="search"
            placeholder="Search . . ."
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
          />
        </div>
        <div>
          <input
            className="inputDate"
            type="month"
            value={month}
            onChange={handleMonth}
          />
        </div>

        <div className="currentDateTime">
          <CurrentTime />
        </div>

        <button className="btnAdd" onClick={handleAdd} id="myBtn">
          <b className="txtAdd">Add</b>
          <FaPlus color="white" />
        </button>
        {/* Create Order */}

        <div id="myModal" className="modals">
          <div style={{ padding: "20px 0" }} className="modals-content">
            <span onClick={handleCli} className="close">
              &times;
            </span>
            <form className="modalForm" onSubmit={handleSubmit}>
              <span className="addEmployeeTxt">Product qo'shish</span>

                <label className="modalFormLabel" htmlFor="option">
                Product:
                   <div className="ProductSelection">
                   <input className="ProductSelectionSearch" type="text" placeholder="Search" value={searchTerm} onInput={handleSearch} />
                   <select className="ProductSelectionSelect" name="productId" value={selectedOption} onChange={handleOptionChange}>
                    <option className="ProductSelectionOption" value={null}>Maxsulotlar</option>
                     {filteredProducts.map(product => (
                  
                       <option className="ProductSelectionOption" key={product.productId} value={product.id}>{product.name}</option>
                     ))}
                   </select>
                 </div>

              </label>

              <label className="modalFormLabel" htmlFor="description">
                Izoh:
                <textarea
                className="TextAreaDescription"
                  name="description"
                  cols="30"
                  rows="10"
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </label>

              <label className="modalFormLabel" htmlFor="price">
                Umumiy narxi:
                <input
                  className="modalFormInput"
                  placeholder="price"
                  type="number"
                  name="price"
                  value={price}
                  onChange={handlePriceChange}
                />
              </label>

              <label className="modalFormLabel" htmlFor="avans">
                Avans:
                <input
                  className="modalFormInput"
                  placeholder="price"
                  type="number"
                  name="avans"
                  value={avans}
                  onChange={handleAvansChange}
                />
              </label>

              <label className="modalFormLabel" htmlFor="amount">
                Miqdori:
                <input
                  className="modalFormInput"
                  placeholder="Amount"
                  type="text"
                  name="number"
                  value={amount}
                  onChange={handleAmountChange}
                />
              </label>

              <label className="modalFormLabel" htmlFor="deadLine">
                Muddati:
                <input
                  type="date"
                  name="deadLine"
                  value={date}
                  onChange={handleDeadLineChange}
                />
              </label>

              <button type="submit" className="modalFormBtn">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>

      <table className="tbody">
        <tbody>
          {fil
            .filter((row) => row.product.name.toLowerCase().includes(query))
            .slice(entries.indexOfFirst, entries.indexOfLast)
            .map((item) => (
              <tr className="tr__title" key={item.id}>
                <td className="trItemName" component="th" scope="row">
                  {item.product.name}
                </td>
                <td className="trItemAmount" align="right">
                  {item.amount}
                </td>
                <td className="trItemDescription" align="right">
                  {item.description}
                </td>
                <td className="trItemPrice" align="right">
                  {item.price}
                </td>
                <td className="trItemTotalPrice" align="right">
                  <p>{item.avans}</p>
                </td>
                <td className="trItemDeadline" align="right">
                  {item.deadLine}
                </td>
                <div className="trItemBtns">
                  <button
                    onClick={() => handleEditClick(item)}
                    className="editBtn"
                    align="right"
                  >
                    {<GrEdit />}
                  </button>
                  <button
                    onClick={() => handleShowModal(item)}
                    id="myButton"
                    className="deleteBtn"
                    align="right"
                  >
                    {<MdDelete />}{" "}
                  </button>
                </div>
              </tr>
            ))}
        </tbody>
      </table>

      <div>
        {showEditModal && (
          <div className="modal">
            <div className="modal-content">
              {/* Edit Product */}

              <label className="modalFormLabel" htmlFor="amount">
                Miqdori:
                <input
                  className="modalFormInput"
                  placeholder="Amount"
                  type="number"
                  name="amount"
                  value={amount}
                  id="lastName"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </label>

              <label className="modalFormLabel" htmlFor="name">
                Izoh:
                <textarea
                  name="description"
                  id=""
                  cols="30"
                  rows="10"
                  value={description}
                  placeholder="Description"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </label>

              <label className="modalFormLabel" htmlFor="price">
                Narxi:
                <input
                  className="modalFormInput"
                  placeholder="Price"
                  type="number"
                  name="price"
                  value={price}
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>

              <label className="modalFormLabel" htmlFor="avans">
                Avans:
                <input
                  className="modalFormInput"
                  placeholder="Price"
                  type="number"
                  name="avans"
                  value={avans}
                  id="price"
                  onChange={(e) => setAvans(e.target.value)}
                />
              </label>

              <label className="modalFormLabel" htmlFor="deadLine">
                Muddati:
                <input
                  type="date"
                  name="deadLine"
                  value={date}
                  onChange={(e) => setDeadLine(e.target.value)}
                />
              </label>

              <label className="modalFormLabel" htmlFor="isSubmitted">
                Tayyor?:
                <select
                  name="isSubmitted"
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                >
                  <option value={null} disabled>
                    Buyurtma holati
                  </option>
                  <option value={true}>Tayyor</option>
                  <option value={false}>Tayyor emas</option>
                </select>
              </label>

              <button className="modalFormBtn" onClick={handleSaveClick}>
                Save
              </button>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="deleteModalTxt">
              Rostdan ham {selectedItem.product.name}ni o'chirmoqchimisiz?
            </h2>
            <button className="deleteModalYes" onClick={handleDelete}>
              Yes
            </button>
            <button className="deleteModalNo" onClick={handleHideModal}>
              No
            </button>
          </div>
        </div>
      )}

      <div className="statistics">
        <span className="profit">Umumiy xodimlar soni: {totalDebtAll}</span>
        <span className="spend">Umumiy oylik maosh: {priceAll} UZS</span>
      </div>

      <Pagination
        entriesPerPage={entriesPerPage.get}
        totalEntries={fil.length}
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
  );
};

export default AddOrder;
