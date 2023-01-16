import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useMergeState } from "use-merge-state";
import { InvoiceItem } from "./InvoiceItem";
import { InvoiceModal } from "./InvoiceModal";

export const InvoiceForm = () => {
  const [formState, setFormState] = useMergeState({
    isOpen: false,
    currency: "$",
    currentDate: "",
    invoiceNumber: 1,
    dateOfIssue: "",
    billTo: "",
    billToEmail: "",
    billToAddress: "",
    billFrom: "",
    billFromEmail: "",
    billFromAddress: "",
    notes: "",
    total: 0,
    subTotal: 0,
    taxRate: 0,
    taxAmmount: 0,
    discountRate: 0,
    discountAmmount: 0,
    items: [
      {
        id: 0,
        name: "",
        description: "",
        price: 1,
        quantity: 1,
      },
    ],
  });

  useEffect(() => {
    handleCalculateTotal();
  }, [formState.discountRate, formState.taxRate]);

  const handleRowDel = (items) => {
    let index = formState.items.indexOf(items);
    formState.items.splice(index, 1);
    setFormState({ items: formState.items });
  };

  const handleAddEvent = (evt) => {
    let id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    let items = {
      id: id,
      name: "",
      price: 1,
      description: "",
      quantity: 1,
    };
    formState.items.push(items);
    setFormState({ items: formState.items });
    handleCalculateTotal();
  };

  const handleCalculateTotal = () => {
    let items = formState.items;
    let subTotal = 0;

    items.map((items) => {
      subTotal = subTotal + items.price * items.quantity;
    });

    const newValues = {
      discountAmmount: (subTotal * formState.discountRate) / 100,
      taxAmmount: (subTotal * formState.taxRate) / 100,
      total: subTotal - formState.discountAmmount + formState.taxAmmount,
      subTotal: subTotal,
      taxRate: formState.taxRate,
      discountRate: formState.discountRate,
    };
    setFormState({
      ...newValues,
    });
  };

  const onItemizedItemEdit = (evt) => {
    let item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value,
    };
    let items = formState.items.slice();
    let newItems = items.map((items) => {
      for (let key in items) {
        if (key == item.name && items.id == item.id) {
          items[key] = item.value;
        }
      }
      return items;
    });
    setFormState({ items: newItems });
    handleCalculateTotal();
  };

  const editField = (event) => {
    setFormState({
      [event.target.name]: event.target.value,
    });
    handleCalculateTotal();
  };
  const onCurrencyChange = (selectedOption) => {
    setFormState(selectedOption);
  };
  const openModal = (event) => {
    event.preventDefault();
    handleCalculateTotal();
    setFormState({ isOpen: true });
  };
  const closeModal = (event) => setFormState({ isOpen: false });
  return (
    <Form onSubmit={openModal}>
      <Row>
        <Col md={8} lg={9}>
          <Card className="p-4 p-xl-5 my-3 my-xl-4">
            <div className="d-flex flex-row align-items-start justify-content-between mb-3">
              <div className="d-flex flex-column">
                <div className="d-flex flex-column">
                  <div className="mb-2">
                    <span className="fw-bold">Current&nbsp;Date:&nbsp;</span>
                    <span className="current-date">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <span className="fw-bold d-block me-2">Due&nbsp;Date:</span>
                  <Form.Control
                    type="date"
                    value={formState.dateOfIssue}
                    name={"dateOfIssue"}
                    onChange={(event) => editField(event)}
                    style={{
                      maxWidth: "150px",
                    }}
                    required="required"
                  />
                </div>
              </div>
              <div className="d-flex flex-row align-items-center">
                <span className="fw-bold me-2">Invoice&nbsp;Number:&nbsp;</span>
                <Form.Control
                  type="number"
                  value={formState.invoiceNumber}
                  name={"invoiceNumber"}
                  onChange={(event) => editField(event)}
                  min="1"
                  style={{
                    maxWidth: "70px",
                  }}
                  required="required"
                />
              </div>
            </div>
            <hr className="my-4" />
            <Row className="mb-5">
              <Col>
                <Form.Label className="fw-bold">Bill to:</Form.Label>
                <Form.Control
                  placeholder={"Who is this invoice to?"}
                  rows={3}
                  value={formState.billTo}
                  type="text"
                  name="billTo"
                  className="my-2"
                  onChange={(event) => editField(event)}
                  autoComplete="name"
                  required="required"
                />
                <Form.Control
                  placeholder={"Email address"}
                  value={formState.billToEmail}
                  type="email"
                  name="billToEmail"
                  className="my-2"
                  onChange={(event) => editField(event)}
                  autoComplete="email"
                  required="required"
                />
                <Form.Control
                  placeholder={"Billing address"}
                  value={formState.billToAddress}
                  type="text"
                  name="billToAddress"
                  className="my-2"
                  autoComplete="address"
                  onChange={(event) => editField(event)}
                  required="required"
                />
              </Col>
              <Col>
                <Form.Label className="fw-bold">Bill from:</Form.Label>
                <Form.Control
                  placeholder={"Who is this invoice from?"}
                  rows={3}
                  value={formState.billFrom}
                  type="text"
                  name="billFrom"
                  className="my-2"
                  onChange={(event) => editField(event)}
                  autoComplete="name"
                  required="required"
                />
                <Form.Control
                  placeholder={"Email address"}
                  value={formState.billFromEmail}
                  type="email"
                  name="billFromEmail"
                  className="my-2"
                  onChange={(event) => editField(event)}
                  autoComplete="email"
                  required="required"
                />
                <Form.Control
                  placeholder={"Billing address"}
                  value={formState.billFromAddress}
                  type="text"
                  name="billFromAddress"
                  className="my-2"
                  autoComplete="address"
                  onChange={(event) => editField(event)}
                  required="required"
                />
              </Col>
            </Row>
            <InvoiceItem
              onItemizedItemEdit={(event) => onItemizedItemEdit(event)}
              onRowAdd={(event) => handleAddEvent(event)}
              onRowDel={(event) => handleRowDel(event)}
              currency={formState.currency}
              items={formState.items}
            />
            <Row className="mt-4 justify-content-end">
              <Col lg={6}>
                <div className="d-flex flex-row align-items-start justify-content-between">
                  <span className="fw-bold">Subtotal:</span>
                  <span>
                    {formState.currency}
                    {formState.subTotal.toFixed(2)}
                  </span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Discount:</span>
                  <span>
                    <span className="small ">({formState.discountRate}%)</span>
                    {formState.currency}
                    {formState.discountAmmount.toFixed(2) || 0}
                  </span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Tax:</span>
                  <span>
                    <span className="small ">({formState.taxRate}%)</span>
                    {formState.currency}
                    {formState.taxAmmount.toFixed(2) || 0}
                  </span>
                </div>
                <hr />
                <div
                  className="d-flex flex-row align-items-start justify-content-between"
                  style={{
                    fontSize: "1.125rem",
                  }}
                >
                  <span className="fw-bold">Total:</span>
                  <span className="fw-bold">
                    {formState.currency}
                    {formState.total.toFixed(2) || 0}
                  </span>
                </div>
              </Col>
            </Row>
            <hr className="my-4" />
            <Form.Label className="fw-bold">Notes:</Form.Label>
            <Form.Control
              placeholder="Thanks for your business!"
              name="notes"
              value={formState.notes}
              onChange={(event) => editField(event)}
              as="textarea"
              className="my-2"
              rows={1}
            />
          </Card>
        </Col>
        <Col md={4} lg={3}>
          <div className="sticky-top pt-md-3 pt-xl-4">
            <Button letiant="primary" type="submit" className="d-block w-100">
              Review Invoice
            </Button>
            <InvoiceModal
              showModal={formState.isOpen}
              closeModal={closeModal}
              info={formState}
              items={formState.items}
              currency={formState.currency}
              subTotal={formState.subTotal}
              taxAmmount={formState.taxAmmount}
              discountAmmount={formState.discountAmmount}
              total={formState.total}
            />
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Currency:</Form.Label>
              <Form.Select
                onChange={(event) =>
                  onCurrencyChange({ currency: event.target.value })
                }
                className="btn btn-light my-1"
                aria-label="Change Currency"
              >
                <option value="$">USD (United States Dollar)</option>
                <option value="£">GBP (British Pound Sterling)</option>
                <option value="¥">JPY (Japanese Yen)</option>
                <option value="$">CAD (Canadian Dollar)</option>
                <option value="$">AUD (Australian Dollar)</option>
                <option value="$">SGD (Signapore Dollar)</option>
                <option value="¥">CNY (Chinese Renminbi)</option>
                <option value="₿">BTC (Bitcoin)</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Tax rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control
                  name="taxRate"
                  type="number"
                  value={formState.taxRate}
                  onChange={(event) =>
                    setFormState({ taxRate: event.target.value })
                  }
                  className="bg-white border"
                  placeholder="0.0"
                  min="0.00"
                  step="1"
                  max="100.00"
                />
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Discount rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control
                  name="discountRate"
                  type="number"
                  value={formState.discountRate}
                  onChange={(event) =>
                    setFormState({
                      discountRate: event.target.value,
                    })
                  }
                  className="bg-white border"
                  placeholder="0.0"
                  min="0.00"
                  step="1"
                  max="100.00"
                />
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </div>
        </Col>
      </Row>
    </Form>
  );
};
