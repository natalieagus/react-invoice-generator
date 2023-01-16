import React from "react";
import { InvoiceItem as InvoiceItemComponent } from "./InvoiceItem";

export default {
  title: "InvoiceItem",
  component: InvoiceItemComponent,
};

export const InvoiceItem = () => {
  let props = {
    currency: "$",
    items: [
      {
        id: 0,
        name: "Apple",
        description: "Fuji apple",
        price: "4.00",
        quantity: 4,
      },
      {
        id: 1,
        name: "Orange",
        description: "Sunkist orange",
        price: "8.00",
        quantity: 20,
      },
    ],
  };

  return (
    <InvoiceItemComponent
      currency={props.currency}
      items={props.items}
      onItemizedItemEdit={() => {}}
      onRowAdd={() => {}}
      onRowDel={() => {}}
    />
  );
};
