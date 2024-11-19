describe('Navigation', () => {
  it('should navigate to the home page and expand a graph', () => {
    // Visit the home page
    cy.visit('http://localhost:3000/');

    // Ensure the widgets are present and click them
    cy.get('.widget.relative.rounded-lg.cursor-pointer', { timeout: 1000 })
      .should('exist')
      .click({ multiple: true });

    // Wait for the graph to render and verify visibility
    cy.get('.recharts-surface', { timeout: 1000 }).should('be.visible');
  });
});
