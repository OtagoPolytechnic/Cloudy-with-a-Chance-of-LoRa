describe('Weather Dashboard', () => {
  describe('Weather Dashboard', () => {
    it('displays the current weather labels', () => {
      // Visit the weather station page
      cy.visit('https://weather.op-bit.nz/');
      cy.contains('Loading...').should('not.exist'); // Wait until loading finishes
      // Check that the page loads and contains specific weather data labels
      cy.contains('Temperature').should('exist');
      cy.contains('Humidity').should('exist');
      cy.contains('Wind').should('exist');
      cy.contains('Pressure').should('exist');
      cy.contains('Rain').should('exist');
      cy.contains('CO2').should('exist');
      cy.contains('Dust').should('exist');
      cy.contains('Gas').should('exist');
    });

    it('displays the correct measurements for each data type', () => {
      // Visit the weather station page
      cy.visit('https://weather.op-bit.nz/');
      cy.contains('Loading...').should('not.exist'); // Wait until loading finishes

      // Temperature
      cy.contains('Temperature'); // Ensure the label exists
      cy.get('.px-4.pb-2').should('contain', '°C'); // Verify the content

      // Humidity
      cy.contains('Humidity'); // Ensure the label exists
      cy.get('.px-4.pb-2').should('contain', '%'); // Verify the content

      // Wind
      cy.contains('Wind'); // Ensure the label exists
      cy.get('.px-4.pb-2').should('contain', 'km/h'); // Verify the content

      // Pressure
      cy.contains('Pressure'); // Ensure the label exists
      cy.get('.px-4.pb-2').should('contain', 'hPa'); // Verify the content

      // Rain
      cy.contains('Rain'); // Ensure the label exists
      cy.get('.px-4.pb-2').should('contain', 'mm'); // Verify the content

      // CO2
      cy.contains('CO2'); // Ensure the label exists
      cy.get('.px-4.pb-2').should('contain', 'ppm'); // Verify the content

      // Dust
      cy.contains('Dust'); // Ensure the label exists
      cy.get('.px-4.pb-2').should('contain', 'µg/m³'); // Verify the content

      // Gas
      cy.contains('Gas'); // Ensure the label exists
      cy.get('.px-4.pb-2').should('contain', 'ppm'); // Verify the content
    });
  });
});
