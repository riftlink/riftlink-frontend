import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import teamListPage from '../pages/TeamListPage'

Given("the server will return some teams", () => {
  cy.intercept('/teams?page=1&pageSize=10', { fixture: 'teams.json' }).as('fetchTeams')
});

When("I visit the team list page", () => {
  teamListPage.visit()
});

When("I let the page load completely", () => {
  cy.wait('@fetchTeams')
})

Then("I should see the team list", () => {
  teamListPage.getTeamList().should('have.length', 1)
});

Then("the team list should contain 7 teams", () => {
  teamListPage.getTeamListItems().should('have.length', 7)
});

When("I click in first team card see more button", () => {
  const t1Card = teamListPage.getTeamListItems().first()

  t1Card.find('[data-cy=see-more-button]').click()
});

Then("I should navigate to team details page", () => {
  cy.url().should('include', '/team/f2163c37-8931-4c4d-8a22-bf9a0bbaf6aa')
});
