describe('Weather Dashboard', () => {
  it('displays the current weather data', () => {
    // Visit the weather station page
    cy.visit('http://localhost:3000/');

    // Check that the page loads and contains specific weather data labels
    cy.contains('Temperature').should('exist');
    cy.contains('Humidity').should('exist');
    cy.contains('Wind').should('exist');
    cy.contains('Pressure').should('exist');
    cy.contains('Rain').should('exist');
    cy.contains('CO2').should('exist');
    cy.contains('Dust').should('exist');
    cy.contains('Gas').should('exist');

    cy.contains('Temperature')
      .parent()
      .find('.p.px-4.pb-2')
      .should('not.be.empty')
      .invoke('text')
      .then((text) => {
        cy.log('Captured Text:', text);
        expect(text.trim()).to.match(/-?\d+(\.\d+)? °C/); // Validate the format
      });

    cy.contains('Humidity')
      .parent()
      .find('.p.px-4.pb-2')
      .should('not.be.empty');

    cy.contains('Wind').parent().find('.p.px-4.pb-2').should('not.be.empty');

    cy.contains('Pressure')
      .parent()
      .find('.p.px-4.pb-2')
      .should('not.be.empty');

    cy.contains('Rain').parent().find('.p.px-4.pb-2').should('not.be.empty');

    cy.contains('CO2').parent().find('.p.px-4.pb-2').should('not.be.empty');

    cy.contains('Dust').parent().find('.p.px-4.pb-2').should('not.be.empty');

    cy.contains('Gas').parent().find('.p.px-4.pb-2').should('not.be.empty');
  });
});
