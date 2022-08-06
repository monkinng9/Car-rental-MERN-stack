import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaGem, FaHeart } from "react-icons/fa";
import { AiFillCar, AiFillIdcard } from "react-icons/ai";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import "./Navbar.styles.scss";
import 'react-pro-sidebar/dist/css/styles.css';

function Navbar() {
  const navigate = useNavigate();

  return (
    <>
      <ProSidebar>
      <SidebarHeader>
        <div
          style={{
            padding: "24px",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: 20,
            letterSpacing: "1px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
        >
          บริการยืมรถกองงาน
        </div>
      </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="circle">
          <MenuItem icon={<AiFillIdcard /> } className="returnForm" onClick={() => {navigate("/end-user/")}}>คืนรถ และประวัติการยืม</MenuItem>
          <MenuItem icon={<AiFillCar />} id='endUser' onClick={() => {navigate("/end-user/cardashboard")}}>รายการรถ</MenuItem>
          <br/><br/><br/><br/><br/><br/><br/><br/>
          <hr/>
          <MenuItem icon={<FaGem />}>ออกจากระบบ</MenuItem>
          </Menu>
        </SidebarContent>
      </ProSidebar>
    </>
  )
}

export default Navbar