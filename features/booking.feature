Feature: Booking ticket
    Scenario: Book one seat
        Given user is on "qamid" page
        When user chooses by ".page-nav__day-number"
        When user chooses movie "main > section:nth-child(2) > div.movie-seances__hall > ul > li > a"
        When user chooses seat ".buying-scheme__wrapper > div:nth-child(1) > span:nth-child(1)"
        When user click "button"
        Then user sees text "Вы выбрали билеты:"