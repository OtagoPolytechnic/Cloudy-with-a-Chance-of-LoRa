describe('Weather Dashboard', () => {
  beforeEach(() => {
    // Visit the weather station page
    cy.visit('http://localhost:3000/', {
      onBeforeLoad(win) {
        // Mock geolocation to simulate user being in Dunedin, NZ
        // This bypasses the browser's location permission popup during Cypress tests
        cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake(
          (cb) => {
            cb({
              coords: {
                latitude: -45.8788,
                longitude: 170.5028,
              },
            });
          },
        );
      },
    });
  });
  it('displays the current weather data', () => {
    // Check that the page loads and contains specific weather data labels
    cy.contains('Otago Polytechnic').should('exist');
    cy.contains("Today's Forecast").should('exist');
    cy.contains('More Conditions').should('exist');
    cy.contains('7-Day Forecast').should('exist');
    cy.contains('Sunrise & Sunset').should('exist');
    cy.contains('Chance of rain').should('exist');
    cy.contains('Current Location').should('exist');
  });

  it('should display the search bar', () => {
    cy.get('input[placeholder="Search..."]')
      .should('exist')
      .and('be.visible');
  });

  it('should display temperature and condition summary', () => {
    cy.contains('Chance of rain').should('contain.text', '');
    cy.get('div').contains('°').should('exist');
  });

  it("should display today's hourly forecast", () => {
    cy.contains("Today's Forecast")
      .parent()
      .within(() => {
        cy.get('div').should('contain.text', '10:00');
        cy.get('div').should('contain.text', '11:00');
        cy.get('div').should('contain.text', '12:00');
        cy.get('div').should('contain.text', '13:00');
        cy.get('div').should('contain.text', '14:00');
        cy.get('div').should('contain.text', '15:00');
      });
  });

  it('should display additional weather conditions', () => {
    cy.contains('Feels Like').should('exist');
    cy.contains('Wind').should('exist');
    cy.contains('Chance of Rain').should('exist');
    cy.contains('UV Index').should('exist');
  });

  it('should display a 7-day forecast', () => {
    cy.contains('7-Day Forecast')
      .parent()
      .within(() => {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        days.forEach((day) => {
          cy.contains(day).should('exist');
        });
      });
  });

  it('should display sunrise and sunset times', () => {
    cy.contains('Sunrise & Sunset');
  });

  it('should display current location', () => {
    cy.contains('Current Location').should('exist');
    cy.contains('Dunedin, New Zealand').should('exist');
  });

  it('should display the background image', () => {
    cy.get('div')
      .should('have.css', 'background-image')
      .and('include', '2-5-scaled.jpg');
  });

  it('should navigate to weather page', () => {
    cy.get('a[href="/weather"]').first().click();
    cy.url().should('include', '/weather');
  });

  it('should navigate to co2 page', () => {
    cy.get('a[href="/co2"]').first().click();
    cy.url().should('include', '/co2');
  });

  it('should navigate to about page', () => {
    cy.get('a[href="/about"]').first().click();
    cy.url().should('include', '/about');
  });
});
