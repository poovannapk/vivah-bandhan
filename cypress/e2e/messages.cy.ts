describe('Messages Page', () => {
  beforeEach(() => {
    cy.visit('/messages');
  });

  it('displays conversation list', () => {
    cy.get('[data-testid="conversation-list"]').should('exist');
    cy.get('[data-testid^="conversation-item-"]').should('have.length.greaterThan', 0);
  });

  it('selects a conversation and displays messages', () => {
    cy.get('[data-testid="conversation-item-1"]').click();
    cy.get('[data-testid="message-thread"]').should('exist');
  });

  it('sends a new message', () => {
    cy.get('[data-testid="message-input"]').type('Hello!{enter}');
    cy.get('[data-testid="message-thread"]').contains('Hello!');
  });
});