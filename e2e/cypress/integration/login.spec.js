context('Login', () => {
  /**
   * This is the only login which doesn't use cy.login()
   * because there is no need to do the validation every time.
   */
  it('Validates email and password', () => {
    cy.visit('/');

    cy.location('pathname').should('equal', '/login');

    cy.get('[data-testing-id=LOGIN_SUBMIT_BUTTON]').should('be.disabled');

    cy.get('[data-testing-id=LOGIN_EMAIL_INPUT]').type('something');

    cy.get('[data-testing-id=LOGIN_EMAIL_INPUT]')
      .find('p')
      .should('contain', 'You have to type valid email');

    cy.get('[data-testing-id=LOGIN_EMAIL_INPUT]')
      .find('input')
      .clear()
      .type(Cypress.env('user_email'));

    cy.get('[data-testing-id=LOGIN_EMAIL_INPUT]')
      .find('p')
      .should('not.contain', 'You have to type valid email');

    cy.get('[data-testing-id=LOGIN_SUBMIT_BUTTON]').should('be.disabled');

    cy.get('[data-testing-id=LOGIN_PASSWORD_INPUT]').type('1');

    cy.get('[data-testing-id=LOGIN_PASSWORD_INPUT]')
      .find('p')
      .should('contain', 'Min character length is 4');

    cy.get('[data-testing-id=LOGIN_PASSWORD_INPUT]')
      .find('input')
      .clear()
      .type(Cypress.env('user_password'));

    cy.get('[data-testing-id=LOGIN_SUBMIT_BUTTON]').should('not.be.disabled');
  });

  it('Displays user menu with a logout button', () => {
    cy.login();

    cy.location('pathname').should('equal', '/robots');

    cy.get('[data-testing-id=USER_MENU_BUTTON]')
      .should('be.visible')
      .and('contain', 'John Doe');

    cy.get('[data-testing-id=USER_MENU_BUTTON]').click();

    cy.get('[data-testing-id=USER_MENU_LOGOUT_BUTTON]').should('be.visible');

    cy.get('[data-testing-id=USER_MENU_LOGOUT_BUTTON]').click();

    cy.location('pathname').should('equal', '/login');
  });

  it('Login fails with wrong credentials ', () => {
    cy.login('user@does.not.exist', '1234');

    cy.location('pathname').should('equal', '/login');

    cy.get('[data-testing-id=SNACKBAR_MESSAGE]').should(
      'contain',
      'Invalid access_token'
    );
  });

  it('Logs out on page reload if missing access token', () => {
    cy.login();

    cy.location('pathname').should('equal', '/robots');

    cy.clearLocalStorage('jwt_access_token').then((ls) => {
      expect(ls.getItem('jwt_access_token')).to.be.null;
    });

    cy.reload();

    cy.location('pathname').should('equal', '/login');
  });
});
