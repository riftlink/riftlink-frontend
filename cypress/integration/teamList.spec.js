/// <reference types="cypress" />

describe('Team list', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('displays teams', () => {
    cy.get('[data-cy=team-list]').should('have.length', 1)
    cy.get('[data-cy=team-list-item]').should('have.length', 7)
  })
})
