describe('Search Page', () => {
  it('searches for users', () => {
    cy.visit('/search');
    cy.get('input[placeholder="Search"]').type('Priya');
    cy.contains('Search').click();
    cy.contains('Priya Sharma');
  });
});