// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/');

  cy.location('pathname').should('equal', '/login');

  cy.get('[data-testing-id=LOGIN_EMAIL_INPUT]')
    .find('input')
    .clear()
    .type(email || Cypress.env('user_email'));

  cy.get('[data-testing-id=LOGIN_PASSWORD_INPUT]')
    .find('input')
    .clear()
    .type(`${password || Cypress.env('user_password')}{enter}`);
});

Cypress.Commands.add('goToPassiveAlertRules', () => {
  cy.get('[data-testing-id=NAV_ITEM_ALERT_CONFIG]').click();

  cy.get('[data-testing-id=NAV_ITEM_PASSIVE_ALERT_RULES]')
    .should('be.visible')
    .click();
});

Cypress.Commands.add('goToPassiveAlertRulesNew', () => {
  cy.get('[data-testing-id=NAV_ITEM_ALERT_CONFIG]').click();

  cy.get('[data-testing-id=NAV_ITEM_PASSIVE_ALERT_RULES]')
    .should('be.visible')
    .click();

  cy.get('[data-testing-id=PASSIVE_ALERT_RULES_NEW_RULE_BTN]').click();
});

Cypress.Commands.add('goToActiveAlertCodes', () => {
  cy.get('[data-testing-id=NAV_ITEM_ALERT_CONFIG]').click();

  cy.get('[data-testing-id=NAV_ITEM_ACTIVE_ALERT_CODES]')
    .should('be.visible')
    .click();
});

Cypress.Commands.add('goToActiveAlertCodeNew', () => {
  cy.get('[data-testing-id=NAV_ITEM_ALERT_CONFIG]').click();

  cy.get('[data-testing-id=NAV_ITEM_ACTIVE_ALERT_CODES]')
    .should('be.visible')
    .click();

  cy.get('[data-testing-id=ACTIVE_ALERT_CODES_NEW_CODE_BTN]').click();
});
