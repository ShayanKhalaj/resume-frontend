import React from "react";
import styles from "./Footer.module.css";
import { Col, Container, Row } from "react-bootstrap";

const Footer = (props) => {
  return <footer className={styles.footer}>{props.children}</footer>;
};

export default Footer;
