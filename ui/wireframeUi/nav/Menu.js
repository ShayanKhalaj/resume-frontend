import Link from "next/link";
import React from "react";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import styles from "./Menu.module.css";
import { FaHome } from "react-icons/fa";

const Menu = () => {
  return (
    <div>
      <Link href="/" className={`${styles.home}`}>
        <FaHome />
        &nbsp;
        &nbsp;
        <i>خانه</i>
      </Link>
      <hr className={`${styles.hr}`} />
      <Dropdown>
        <Dropdown.Toggle className="btn btn-outline-info text-white" id="dropdown-basic">
          دسته بندی ها
        </Dropdown.Toggle>

        <Dropdown.Menu className={`bg-info text-light ${styles.menu}`}>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Menu;
