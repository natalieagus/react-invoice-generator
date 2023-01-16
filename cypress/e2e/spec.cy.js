describe('should render InvoiceForm', () => {
  it('should render InvoiceForm', () => {
    cy.visit(Cypress.env('dev_url'))
    cy.findByText("Add Item").should('be.visible');
    cy.findByText("ITEM").should('be.visible');
    cy.findByText("Current Date:").should('be.visible');
    cy.findByText("Due Date:").should('be.visible');
    cy.findByText("Review Invoice").should('be.visible');

  })
  it('should be able to add item', () => {
    cy.visit(Cypress.env('dev_url'))
    cy.findAllByPlaceholderText("Item name").should('have.length', 1);
    cy.findByText("Add Item").click();
    cy.findAllByPlaceholderText("Item name").should('have.length', 2);
  })
})