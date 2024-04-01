import React, { useContext, useState, useRef, useEffect } from "react";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp, IoPersonAddOutline } from "react-icons/io5"; // Use IoPersonAddOutline for nurse icon
import { BsPeopleFill } from "react-icons/bs"; // New icon for patients
import { HiUserGroup } from "react-icons/hi"; // New icon for receptionists
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo3.png";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const sidebarRef = useRef(null);

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await axios
      .get("http://localhost:4000/api/v1/user/admin/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const gotoHomePage = () => {
    navigateTo("/");
    setShow(false);
  };

  const gotoDoctorsPage = () => {
    navigateTo("/doctors");
    setShow(false);
  };

  const gotoMessagesPage = () => {
    navigateTo("/messages");
    setShow(false);
  };

  const gotoAddNewDoctor = () => {
    navigateTo("/doctor/addnew");
    setShow(false);
  };

  const gotoAddNewAdmin = () => {
    navigateTo("/admin/addnew");
    setShow(false);
  };

  const gotoPatientsPage = () => {
    navigateTo("/patients");
    setShow(false);
  };

  const gotoReceptionistsPage = () => {
    navigateTo("/receptionists");
    setShow(false);
  };

  return (
    <>
      <nav ref={sidebarRef} className={show ? "show sidebar" : "sidebar"}>
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="links">
          <div onClick={gotoHomePage}>
            <TiHome />
            <span>Home</span>
          </div>
          <div onClick={gotoDoctorsPage}>
            <FaUserDoctor />
            <span>Doctors</span>
          </div>
          <div onClick={gotoAddNewAdmin}>
            <MdAddModerator />
            <span>Add New Admin</span>
          </div>
          <div onClick={gotoAddNewDoctor}>
            <IoPersonAddSharp />
            <span>Add New Doctor</span>
          </div>
          <div onClick={gotoPatientsPage}>
            <BsPeopleFill />
            <span>Patients</span>
          </div>
          <div onClick={gotoReceptionistsPage}>
            <HiUserGroup />
            <span>Receptionists</span>
          </div>
          <div onClick={gotoMessagesPage}>
            <AiFillMessage />
            <span>Messages</span>
          </div>
          <div onClick={handleLogout}>
            <RiLogoutBoxFill />
            <span>Logout</span>
          </div>
        </div>
      </nav>
      <div
        className="wrapper"
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
      >
        <GiHamburgerMenu
          className="hamburger"
          onClick={() => setShow(!show)}
        />
      </div>
    </>
  );
};

export default Sidebar;
