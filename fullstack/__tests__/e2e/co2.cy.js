// Describe the test suite for verifying the CO2 page's line chart rendering
describe('CO2 Page - Line Chart Data Rendering', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/co2');
  });

  //  Ensure that the default CO2 chart is rendered with data
  it('renders CO2 line chart with visible data points', () => {
    // Verify that the SVG container for the chart exists
    cy.get('svg').should('exist');

    // Check that the line path (representing the data line) is rendered
    cy.get('svg path').should('have.length.greaterThan', 0);

    // Check that data points (dots for each data value) are rendered
    cy.get('svg circle').should('have.length.greaterThan', 0);
  });

  // Switch to "Pressure" metric and verify that the chart still renders correctly
  it('switches to Pressure and still shows data points', () => {
    cy.contains('button', 'Pressure').click();

    // Confirm that the new chart line path is rendered
    cy.get('svg path').should('have.length.greaterThan', 0);

    // Confirm that new data points are also rendered
    cy.get('svg circle').should('have.length.greaterThan', 0);
  });


  it('switches to Gas and verifies the chart', () => {
    cy.contains('button', 'Gas').click();

    // Ensure a line path is rendered for the gas metric
    cy.get('svg path').should('have.length.greaterThan', 0);

    // Ensure gas metric data points are rendered
    cy.get('svg circle').should('have.length.greaterThan', 0);
  });
});
