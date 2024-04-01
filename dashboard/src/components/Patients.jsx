import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "../styles/Patients.css";

const Patients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/patients");
      setPatients(response.data.patients);
    } catch (error) {
      toast.error("Error fetching patients");
    }
  };

  return (
    <div className="container">
      <h1 className="page-title">Patients</h1>
      <ul>
        {patients.map((patient) => (
          <li key={patient.id}>
            {patient.firstName} {patient.lastName}
          </li>
        ))}
      </ul>
      <Link to="/add-patient">
        <div className="button-container">
          <button className="add-button">Add Patient</button>
        </div>
      </Link>
    </div>
  );
};

export default Patients;
