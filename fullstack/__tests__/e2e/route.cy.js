describe('API tests', () => {
  const apiURL = 'http://localhost:3000/api';
  it('should return an item', () => {
    cy.request(`${apiURL}/dust-data`).its('status').should('eq', 200);
  });

  it('should post a new item', () => {
    cy.request('POST', `${apiURL}/recieve-data`, {
      end_device_ids: {
        device_id: 'weather-station-01',
      },
      uplink_message: {
        decoded_payload: {
          wind_speed: 200,
          wind_direction: 90,
          humidity: 3,
          co2: 10,
        },
      },
    })
      .its('status')
      .should('eq', 200);
  });

  it('should return a 404 for non-existent items', () => {
    const nonExistentId = 999;
    cy.request({
      url: `${apiURL}/dust-data/${nonExistentId}`,
      failOnStatusCode: false, // Prevent Cypress from failing the test on non-2xx status codes
    })
      .its('status')
      .should('eq', 404);
  });
});
