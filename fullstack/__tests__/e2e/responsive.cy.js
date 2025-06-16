describe('Responsive Layout for All Pages', () => {
  const pages = [
    {
      name: 'Home',
      path: '/',
      checks: () => {
        cy.contains('Otago Polytechnic').should('exist');
        cy.contains("Today's Forecast").should('exist');
        cy.contains('More Conditions').should('exist');
      },
    },
    {
      name: 'Weather',
      path: '/weather',
      checks: () => {
        cy.contains('Temperature').should('exist');
        cy.contains('Humidity').should('exist');
        cy.contains('Rain').should('exist');
        cy.contains('Wind').should('exist');
      },
    },
    {
      name: 'CO2',
      path: '/co2',
      checks: () => {
        cy.contains('CO2').should('exist');
        cy.contains('Dust').should('exist');
        cy.contains('Gas').should('exist');
        cy.contains('Pressure').should('exist');
      },
    },
  ];

  const viewports = [
    { label: 'Desktop', width: 1280, height: 800 },
    { label: 'Mobile', width: 375, height: 667 },
  ];

  // Iterate through each page and viewport size to test responsive layout and content rendering
  pages.forEach(({ name, path, checks }) => {
    describe(`${name} Page Responsive Layout`, () => {
      viewports.forEach(({ label, width, height }) => {
        context(`${label} View (${width}x${height})`, () => {
          beforeEach(() => {
            cy.viewport(width, height);
            cy.visit(`http://localhost:3000${path}`);
          });

          it('renders key content', () => {
            checks();
          });

          it('displays navigation or mobile menu', () => {
            if (label === 'Mobile') {
              cy.get('button[aria-label="Open menu"], .hamburger-icon').should(
                'exist',
              );
            } else {
              cy.get('nav').should('be.visible');
            }
          });
        });
      });
    });
  });
});
