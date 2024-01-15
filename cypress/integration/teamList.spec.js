/// <reference types="cypress" />

import teamListPage from '../pages/TeamListPage'

describe('Team list', () => {
  beforeEach(() => {
    cy.intercept('/teams?page=1&pageSize=10', { fixture: 'teams.json' }).as('fetchTeams')

    teamListPage.visit()

    cy.wait('@fetchTeams')
  })

  it('displays teams', () => {
    teamListPage.getTeamList().should('have.length', 1)
    teamListPage.getTeamListItems().should('have.length', 7)
  })

  it('navigates to team detail', () => {
    const t1Card = teamListPage.getTeamListItems().first()

    t1Card.find('[data-cy=see-more-button]').click()

    cy.url().should('include', '/team/f2163c37-8931-4c4d-8a22-bf9a0bbaf6aa')
  })
})
