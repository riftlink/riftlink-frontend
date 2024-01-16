import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

Given("the server will return team info", () => {
  cy.intercept('/teams/**', { fixture: 'teams/t1.json' }).as('fetchTeamDetails')
});

When("I visit the team details page", () => {
  cy.visit('http://localhost:3000/team/f2163c37-8931-4c4d-8a22-bf9a0bbaf6aa')
});

When("I let the team details page load completely", () => {
  cy.wait('@fetchTeamDetails')
});

Then("I should see the team name", () => {
  cy.get('[data-cy=team-name]').should('have.text', 'T1')
});

When("I expand the team about us panel", () => {
  cy.get('[data-cy=about-us-panel-header]').click()
});

Then("I should see the team about us description", () => {
  cy.contains('Ganar el próximo mundial').should('exist')
});
