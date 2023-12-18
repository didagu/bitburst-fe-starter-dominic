describe('TodoList', () => {
  it('toggles item completion', () => {
    cy.visit('/');
    cy.getByDataCy('todolist-completed-items-summary').should('contain', '2 Done');
    cy.getByDataCy('todo-item-icon').eq(2).click();
    cy.getByDataCy('todolist-completed-items-summary').should('contain', '3 Done');
  });

  it('deletes item', () => {
    cy.visit('/');
    cy.getByDataCy('todolist-item').should('have.length', 15);
    cy.getByDataCy('item-action-ellipsis').eq(0).click();
    cy.getByDataCy('delete-item').eq(0).click();
    cy.getByDataCy('todolist-item').should('have.length', 14);
  });

  it('moves item to backlog', () => {
    cy.visit('/backlog');
    cy.getByDataCy('backlog-item').should('have.length', 6);
    cy.getByDataCy('go-to-todolist').click()
    cy.getByDataCy('todolist-item').should('have.length', 15);
    cy.getByDataCy('item-action-ellipsis').eq(0).click();
    cy.getByDataCy('move-item-to-backlog').eq(0).click();
    cy.getByDataCy('todolist-item').should('have.length', 14);
    cy.getByDataCy('go-to-backlog').click()
    cy.getByDataCy('backlog-item').should('have.length', 7);
  });

  it('adds new item to todo list', () => {
    cy.visit('/');
    cy.getByDataCy('todolist-item').should('have.length', 15);
    cy.getByDataCy('input-field').get('input').type('BitBurst GmbH is the best company!!!')
    cy.getByDataCy('add-new-item').click();
    cy.getByDataCy('todolist-item').should('have.length', 16);
  });
});
