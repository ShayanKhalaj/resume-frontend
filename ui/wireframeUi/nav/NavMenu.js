import { useState } from "react";
import { Container, Dropdown, Nav, NavDropdown, Navbar } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaAlignJustify } from "react-icons/fa";
import styles from "./NavMenu.module.css";
import Link from "next/link";
import Menu from "./Menu";

const NavMenu = ({ name, ...props }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar expand="lg" className={`${styles.navbarColor}`}>
        <Container fluid>
          <Navbar.Brand className={`${styles.navTitle}`} href="#">
            وب سایت من
          </Navbar.Brand>
          <Button onClick={handleShow} className="btn btn-dark border-0">
            <FaAlignJustify className="text-light" />
          </Button>
        </Container>
      </Navbar>

      <Offcanvas placement="end" show={show} onHide={handleClose} {...props} className="bg-dark">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="text-light h1 bold">منو</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Menu />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NavMenu;

// export default function NavMenu(){
//   return (
//     <>
//       {(placement, idx) => (
//         <OffCanvasExample key={idx} placement={placement} name={placement} />
//       )}
//     </>
//   );
// }
