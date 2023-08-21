import { UseToken } from "../../../hook/LoginHook";
import React, { useState, useEffect } from "react";
import { usePagination, Pagination } from "pagination-react-js";
import { MdDelete } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import CurrentTime from "../../CurrentTime";
import "./Employees.css"
const Employees = () => {
  const d = "Bearer";

  const tok = window.localStorage.token;
  const tokenn = tok.slice(1, tok.length - 1);

  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("http://api.etradingcrm.uz/api/Employee/All");
  }, []);

  const [items, setItems] = useState([]);
  const [updatedItems, setUpdatedItems] = useState([]);

  const { currentPage, entriesPerPage, entries } = usePagination(1, 11);

  // Hooks
  const [date, setDate] = useState();
  const { adToken, setAdToken } = UseToken();

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState(null);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");
  const [phone, setPhone] = useState("");
  const [lastName, setLastName] = useState("");
  const [passportId, setPassportId] = useState("");
  const a = window.localStorage.token;

  useEffect(() => {
    axios
      .get("http://api.etradingcrm.uz/api/Employee/All")
      .then((res) => {
        const items = res.data.filter((items) => items.isDeleted === false);
        // console.log(res.data);
        setItems(items);
      })
      .catch((err) => console.log(err));
  }, []);




  
  const totalSalary = items.reduce((total, item) => total + item.salary, 0);

  // datakeladi

  const [modalUser, setModalUser] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  const openModal = (user) => {
    setModalUser(user);
  };

  const closeModal = () => {
    setModalUser(null);
  };

  const filterAttendancesByDate = (attendances, date) => {
    if (!attendances || attendances === null) {
      return [];
    }

    return attendances.filter((attendance) => {
      return attendance.date && attendance.date.includes(date);
    });
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
  };


  return (
    <div>
      <table>
        <thead>
          <tr className="th__title" style={{ listStyle: "none" }}>
            <td className="thItem">
              <b>Ismi</b>
            </td>
            <td className="thItem">
              <b>Lavozimi</b>
            </td>
            <td className="thItem">
              <b>Ish Haqi</b>
            </td>
            <td className="thItem">
              <b>Telefon raqami</b>
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


        <div className="currentDateTime">
          <CurrentTime />
        </div>

        
      </div>

      <table className="tbody">
        <tbody>
          {items
            .filter((row) => row.name.toLowerCase().includes(query))
            .slice(entries.indexOfFirst, entries.indexOfLast)
            .map((item) => (
              <tr className="tr__title" key={item.id}>
                <td onClick={() => openModal(item)} className="trItem" component="th" scope="row">
                  {item.name}
                </td>
                <td className="trItem" align="right">
                  {item.position}
                </td>
                <td className="trItem" align="right">
                  {item.salary}
                </td>
                <td className="trItem" align="right">
                  {item.phone}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {modalUser && (
        <div className="modaluser">
          <h3>{modalUser.name}</h3>
          <p>{modalUser.firstname}</p>
          {selectedDate ? (
            <>
              <h4>Late Hours ({selectedDate}):</h4>
              <ul>
                {filterAttendancesByDate(
                  modalUser.attendances,
                  selectedDate
                ).map((attendance, index) => (
                  <li key={index}>{attendance.lateHours}</li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <h4>All Late Hours:</h4>
              <ul>
                {modalUser.attendances.map((attendance, index) => (
                  <li key={index}>{attendance.lateHours}</li>
                ))}
              </ul>
            </>
          )}
          <button onClick={closeModal}>Close Modal</button>
        </div>
      )}



      <div className="statistics">
        <span className="profit">Umumiy xodimlar soni: {items.length}</span>
        <span className="spend">Umumiy oylik maosh: {totalSalary} UZS</span>
      </div>

      <Pagination
        entriesPerPage={entriesPerPage.get}
        totalEntries={items.length}
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

export default Employees;
