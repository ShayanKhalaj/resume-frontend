import { useCallback, useEffect, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import { MdClose, MdSave } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { showCreateModalReducer } from "../../../../redux/features/admin/CRUD_OperationsSlice";

const CreateModal = (props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.crud.createModal);


  const [show, setShow] = useState(selector);

  useMemo(() => {
    setShow(selector);
  }, [selector]);

  const handleClose = () => {
    dispatch(showCreateModalReducer(false));
    setShow(false);
  };

  const handleShow = () => {
    dispatch(showCreateModalReducer(true));
    setShow(true);
  };

  return (
    <div className={props.className ? props.className : ""}>
      <Button
        variant={props.variant ? props.variant : "primary"}
        onClick={handleShow}
        type="button"
        >
        {props.buttonTitle ? props.buttonTitle : "نمایش مدال"}
      </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>
              {props.modalTitle ? props.modalTitle : "عنوان"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {props.modalBody ? props.modalBody : "چیزی برای نمایش موجود نیست"}
          </Modal.Body>
          {props.modalFooter !== false ? (
            <Modal.Footer>
              {props.closeButton !== false ? (
                <Button variant="secondary" onClick={handleClose}>
                  <MdClose />
                </Button>
              ) : null}
              {props.saveButton !== false ? (
                <Button
                  variant={
                    props.saveButtonVariant === undefined
                      ? "primary"
                      : props.saveButtonVariant
                  }
                  onClick={handleClose}
                >
                  <MdSave />
                </Button>
              ) : null}
            </Modal.Footer>
          ) : null}
        </Modal>
    </div>
  );
                
};

export default CreateModal;
