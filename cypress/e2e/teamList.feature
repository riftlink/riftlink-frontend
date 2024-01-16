Feature: Team list

  Scenario: Display teams
    Given the server will return some teams
    When I visit the team list page
    And I let the page load completely
    Then I should see the team list
    And the team list should contain 7 teams

  Scenario: Navigate to team detail
    Given the server will return some teams
    When I visit the team list page
    And I let the page load completely
    Then I click in team card see more button
    And I should navigate to team details page
