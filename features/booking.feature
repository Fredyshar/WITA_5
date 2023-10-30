Feature: Booking ticket
    Scenario: Book one seat
        Given user is on "qamid" page
        When user chooses by ".page-nav__day-number"
        When user chooses movie "main > section:nth-child(2) > div.movie-seances__hall > ul > li > a"
        When user chooses seat ".buying-scheme__wrapper > div:nth-child(1) > span:nth-child(1)"
        When user click "button"
        Then user sees text "Вы выбрали билеты:"

    Scenario: Booking 1 vip seat
        Given user is on "qamid" page
        When user chooses by ".page-nav__day-number"
        When user chooses movie "[data-seance-id='174']"
        When user chooses seat ".buying-scheme__chair_vip"
        When user click "button"
        Then user sees text "Вы выбрали билеты:"

    Scenario: Don't booking seat
        Given user is on "qamid" page
        When the current time is later than 16 AM
        Then the ".acceptin-button-disabled" class should contain elements
        When if the current time is later than 16 AM and earlier than 23 AM
        When user chooses movie "[data-seance-id='177']"
        Then user sees "button" is gray