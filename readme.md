Group 4 - Tutorial 9
Members:
Wayne La,
Meet Bhatt,
Elda Britu,
Abdullah Khan,
Crystal Tran

CPL Finder Readme:
This live website is available at: https://waynelamooper.github.io/
If you want to host it locally, simply use the live server extension on VS code and go live on the index.html page. (This assumes you are in the root directory of the code)

Cases/Functions:
Our website has implemented functionality for viewing and booking available study spaces at various
Calgary Public Library locations. It has also implemented functionality for searching for books based
on a dynamic search of book titles, alongside an advanced search feature which can filter search results based on additional criteria such as genre, author name, and publishing date.

    Selecting library location:
    We have a few implemented features that rely on the user selecting a specific library location. When you first land on the home page for the website, you will be prompted to select one via a popup window. Feel free to play around with the quadrants (NE,NW,SE,SW) filter, so that you can view libraries specifically locatedd in the quadrants you have selected.

    Note that you can choose to skip this if you do not know what location you want to select yet by clicking the skip button in the top right, and the website's features have accounted for this. Whether you skip or select a library location, you will see your decision displayed on a button in the top right of the home page, inside of the navigation bar. If you ever want to select or change the selected library, you can click on this button to make the popup window reappear.

    Searching for a specific book (basic):
    The main search bar visible in the center of the home page will take in any text input, and allows users to search for book titles dynamically. For example, if you want to search for "Harry Potter and the Sorcerer's Stone" you can play around with typing in inputs such as "har" or "harry potter", or even just "h" and then pressing enter while this search bar is selected, or by clicking the magnifying glass button, to see what search results you get.

    Searching for a specific book (advanced):

        Filter with Genre:
        Additionally, if you click on the advanced search button, you will get more options to filter your search by. The genre field also takes in text input, but this will provide users with suggested genres that are within our database. For example, if you type in "fi" it should suggest "Fiction", "Historical Fiction", and "Scientific Fiction". It is recommended here to autofill using the suggestions to receive the best search results. Note that when you autofill or press enter, this will add the genre to the left of the input bar. You can enter multiple genres here, and delete any from the filter by clicking on the respective red "X" that is present with any entered genre. It is also important to mention that this is an "or" filter, so entering multiple genres will only return books that have at least one of them and not all of them.

        Filter with Author name:
        The author name field is also a text input. This field will suggest author's in our database based on what you have typed so far, but it is not mandatory to autofill using the suggested names. This is also a dynamic filter, so if you type in "j", you can expected to get results of any author with "j" in their name.

        Filter with Released Between:
        Released between refers to the publishing date of books. You can select a starting and end date by month, day, and year using a prompted calendar view. If you happen to only select an end date, this will return results that were published anytime on or before that day. If you only select a start date, this will return results that were published anytime on or after that day.

    For testing the search functionality and advanced search filtering, feel free to use this json data as a target search result:
    {
    "name": "Harry Potter and the Sorcerer's Stone",
    "author": "J.K. Rowling",
    "genres": ["Fantasy", "Young Adult"],
    "publishing_date": "1997-06-26",
    }

    Additionally, none of the input fields of book title, genre, author name, or released between are required to be filled out. When they are not filled out, they just return every book title, genre, author name, and released between respectively, by default.

    View Book Details (And availability):
    After using the search and advanced search feature, hopefully you will receive some search results. By clicking on the search result container or rectangle that corresponds to a specific search result, this will redirect you to another page where you can view all available details for that specific book.

    Most importantly, if you selected a library location beforehand, this page will show you the availability status of the specific book at that location, as well as where in the library, in terms of floor number and aisle, that you can find it at. It will also display other libraries where the book is available at, which you can view by selecting the green buttons. If a button is red, this means that your selected library location does not have the book available. This page will never display libraries that the book is not available at except in the case where the location happens to be your pre-selected one within the navigation bar.

    Navigation bar:
    At this time it is worth mentioning that the navigation bar allows you to easily navigate to the main functions of this website. Clicking on the Calgary Public Library is a mini-shortcut that most modern websites also implement nowadays, which will redirect you back to the home page just as the home button will.

    Booking a Study Space:
    In the navigation bar, you can click on the "Study Spaces" button, to navigate to the Study Spaces page. Here there exists a dropdown for selecting library location, and another dropdown for selecting a booking hour. The dropdown for selecting a library location will be autofilled if you had pre-selected a library location via the popup window as previously mentioned.

    Once a location and hour have been selected, you will see a map of your selected library. There will be red and green tiles which all represent bookable meeting spaces. Red tiles are already occupied for the hour, whereas green tiles are still available to be booked.

    Before clicking on a green tile, at this time we suggest opening the console for your web browser using (ctrl + shift + i). When you click on a green tile, a form will appear asking for your name and an email address. While your name can be any text input, the email address must be in an email format (someone@something.com) and there is error handling in place for this. Once you book the meeting, the console will contain a booking ID and confirmation code. Copy and paste the confirmation code into the popup window asking you to confirm your booking. This will confirm the booking and you should see the tile you clicked on turn red.

    Additionally, if you want to cancel a booking, click on the "Cancel a booking" button. Another popup will appear, this time asking you to copy and paste your Booking ID instead. Once submitted, you should see the tile turn green.

    Note that this would normally all be automated as it is intended for the user to receive an email that has buttons that automate the confirmation and cancellation of a booking, but as this is beyond the scope of our website, we have loosely implemented these functions into the website to simulate what it should behave like.
