const TeamListPage = {
  visit() {
    return cy.visit('http://localhost:3000/');
  },
  getTeamList() {
    return cy.get('[data-cy=team-list]');
  },
  getTeamListItems() {
    return cy.get('[data-cy=team-list-item]');
  }
}

export default TeamListPage
