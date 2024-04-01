import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "../styles/Receptionists.css";

const Receptionists = () => {
  const [receptionists, setReceptionists] = useState([]);

  useEffect(() => {
    fetchReceptionists();
  }, []);

  const fetchReceptionists = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/receptionists");
      setReceptionists(response.data.receptionists);
    } catch (error) {
      toast.error("Error fetching receptionists");
    }
  };

  return (
    <div className="container">
      <h1 className="page-title">Receptionists</h1>
      <ul>
        {receptionists.map((receptionist) => (
          <li key={receptionist.id}>
            {receptionist.firstName} {receptionist.lastName}
          </li>
        ))}
      </ul>
      <Link to="/add-receptionist">
        <div className="button-container">
          <button className="add-button">Add Receptionist</button>
        </div>
      </Link>
    </div>
  );
};

export default Receptionists;
