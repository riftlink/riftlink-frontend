Feature: Team list

  Background:
    Given the server will return some teams
    When I visit the team list page
    And I let the page load completely

  Scenario: Display teams
    Then I should see the team list
    And the team list should contain 7 teams

  Scenario: Navigate to team detail
    When I click in first team card see more button
    Then I should navigate to team details page
