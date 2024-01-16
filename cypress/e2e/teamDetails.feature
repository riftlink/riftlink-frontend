Feature: Team details

  Background:
    Given the server will return team info
    When I visit the team details page
    And I let the team details page load completely

  Scenario: Display team name
    Then I should see the team name

  Scenario: Display team about us
    When I expand the team about us panel
    Then I should see the team about us description
