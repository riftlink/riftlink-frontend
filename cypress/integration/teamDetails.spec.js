/// <reference types="cypress" />

describe('Team list', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/team/f2163c37-8931-4c4d-8a22-bf9a0bbaf6aa')
  })

  it('displays team name', () => {
    cy.get('[data-cy=team-name]').should('have.text', 'T1')
  })

  it('displays team about us after expanding about us section', () => {
    cy.get('[data-cy=about-us-panel-header]').click()
    cy.contains('Ganar el próximo mundial').should('exist')
  })
})
