/* eslint-disable react/prop-types */
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const BuyNowModal = ({ addressInfo, setAddressInfo, buyNowFunction }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="w-100">
        Buy now
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Address Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <input
              type="text"
              name="name"
              value={addressInfo.name}
              onChange={(e) => {
                setAddressInfo({
                  ...addressInfo,
                  name: e.target.value,
                });
              }}
              placeholder="Enter your name"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="address"
              value={addressInfo.address}
              onChange={(e) => {
                setAddressInfo({
                  ...addressInfo,
                  address: e.target.value,
                });
              }}
              placeholder="Enter your address"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              name="pincode"
              value={addressInfo.pincode}
              onChange={(e) => {
                setAddressInfo({
                  ...addressInfo,
                  pincode: e.target.value,
                });
              }}
              placeholder="Enter your pincode"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="mobileNumber"
              value={addressInfo.mobileNumber}
              onChange={(e) => {
                setAddressInfo({
                  ...addressInfo,
                  mobileNumber: e.target.value,
                });
              }}
              placeholder="Enter your mobile number"
              className="form-control"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              buyNowFunction();
            }}
          >
            Buy now
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BuyNowModal;
