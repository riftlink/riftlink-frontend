/// <reference types="cypress" />

describe('Team list', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('displays teams', () => {
    cy.get('[data-cy=team-list]').should('have.length', 1)
    cy.get('[data-cy=team-list-item]').should('have.length', 7)
  })

  it('navigates to team detail', () => {
    const t1Card = cy.get('[data-cy=team-list-item]').first()

    t1Card.find('[data-cy=see-more-button]').click()

    cy.url().should('include', '/team/f2163c37-8931-4c4d-8a22-bf9a0bbaf6aa')
  })
})
