import { InvoiceForm } from "./InvoiceForm";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("should render InvoiceForm", () => {
  it("should render InvoiceForm", () => {
    render(<InvoiceForm />);
    // screen.debug(null, Infinity);

    expect(screen.queryByText("Add Item")).toBeInTheDocument();
    expect(screen.queryByText("ITEM")).toBeInTheDocument();
    expect(screen.queryByText("Bill to:")).toBeInTheDocument();
    expect(screen.queryByText("Current Date:")).toBeInTheDocument();
    expect(screen.queryByText("Due Date:")).toBeInTheDocument();
    expect(screen.queryByText("Review Invoice")).toBeInTheDocument();
  });
});
