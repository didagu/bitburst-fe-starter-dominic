describe('Todo', () => {
  it('Visits the app', () => {
    cy.visit('/');
    cy.contains('To Do List').should('be.visible');
    cy.contains('Backlog').should('be.visible');
  });
});
