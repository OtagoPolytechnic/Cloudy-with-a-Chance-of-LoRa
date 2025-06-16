describe('Weather Page - Graph Rendering and Data', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/weather');
  });

  const metrics = [
    { name: 'Temperature', unit: '°C' },
    { name: 'Humidity', unit: '%' },
    { name: 'Rain', unit: 'mm' },
    { name: 'Wind', unit: 'km/h' },
  ];

  metrics.forEach(({ name, unit }) => {
    it(`renders ${name} chart with visible data points`, () => {
      // Click the metric button if it's not the default (Temperature is default)
      if (name !== 'Temperature') {
        cy.contains('button', name).click();
      }

      // Verify the heading is correct
      cy.get('h2')
        .should('contain.text', `${name} Over Time`)
        .and('contain.text', unit);

      // Check that the chart is rendered
      cy.get('svg').should('exist');

      // Check the line path (Recharts renders this)
      cy.get('svg path').should('have.length.greaterThan', 0);

      // Check data points are rendered as circles
      cy.get('svg circle').should('have.length.greaterThan', 0);
    });
  });
  it('highlights the "Hourly" time filter button when clicked', () => {
    cy.contains('button', 'Hourly').click();
    cy.contains('button', 'Hourly').should('have.class', 'btn active');
  });

  it('highlights the "7 Days" time filter button when clicked', () => {
    cy.contains('button', '7 Days').click();
    cy.contains('button', '7 Days').should('have.class', 'btn active');
  });

  it('highlights the "30 Days" time filter button when clicked', () => {
    cy.contains('button', '30 Days').click();
    cy.contains('button', '30 Days').should('have.class', 'btn active');
  });
});
