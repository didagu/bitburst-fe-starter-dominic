describe('Backlog', () => {
  it('searches for item', () => {
    cy.visit('/backlog');
    cy.getByDataCy('backlog-item').should('have.length', 6);
    cy.getByDataCy('sorting-field').find('> input').type('BitBurst');
    cy.getByDataCy('backlog-item').should('have.length', 1);
  });

  it('moves item to list', () => {
    cy.visit('/');
    cy.getByDataCy('todolist-item').should('have.length', 15);
    cy.getByDataCy('go-to-backlog').click()
    cy.getByDataCy('backlog-item').should('have.length', 6);
    cy.getByDataCy('move-item-to-list').eq(0).click()
    cy.getByDataCy('backlog-item').should('have.length', 5);
    cy.getByDataCy('go-to-todolist').click()
    cy.getByDataCy('todolist-item').should('have.length', 16);
  });

  it('sorts by name', () => {
    cy.visit('/backlog');
    cy.getByDataCy('sort-by-name').click()
    cy.compareSnapshot('sorted-by-name');
  });

  it('sorts by date', () => {
    cy.visit('/backlog');
    cy.getByDataCy('sort-by-date').click()
    cy.compareSnapshot('sorted-by-date');
  })
});
