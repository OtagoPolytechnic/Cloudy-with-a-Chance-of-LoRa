describe('Weather Dashboard', () => {
    it('displays the current weather data', () => {
      // Visit the weather station page
      cy.visit('http://localhost:3000/');
  
      // Check that the page loads and contains specific weather data labels
      cy.contains('Otago Polytechnic').should('exist');
      cy.contains("Today's Forecast").should('exist');
      cy.contains("More Conditions").should('exist');
      cy.contains('7-Day Forecast').should('exist');
      cy.contains('Sunrise & Sunset').should('exist');
      cy.contains('Chance of rain').should('exist');
      cy.contains('Current Location').should('exist');
      
  
    });
  });
  