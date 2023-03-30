Cypress.Commands.add<any>('visitLoginPage', () => {
  cy.get('input[type=text]').type('admin');
  cy.get('input[type=password]').type('rhqmffls13!');
  cy.get('button[type=submit]').click();
});
