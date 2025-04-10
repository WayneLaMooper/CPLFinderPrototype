document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById('popup');
  const overlay = document.getElementById('overlay');
  const searchInput = document.getElementById('searchInput');
  const searchForm = document.getElementById('searchForm');
  const advancedSearchButton = document.querySelector(".advanced_search_button");
  const advancedMenu = document.querySelector(".advanced_search");
  const libraryLocationButton = document.getElementById('library-location');
  const closeButton = document.getElementById('closePopup');
  const libraryGrid = document.getElementById('libraryGrid');
  const resultsContainer = document.getElementById('searchResultsContainer');

  // Handle library fetching and display
  fetch('./json/libraries.json')
    .then(response => response.json())
    .then(libraries => {
      function displayLibraries(filteredLibraries) {
        libraryGrid.innerHTML = ''; // Clear the grid before adding new libraries
        filteredLibraries.forEach(library => {
          const libraryItem = document.createElement('div');
          libraryItem.classList.add('library-item');
          libraryItem.innerHTML = ` 
            <img src="${library.image}" alt="${library.name}">
            <h3>${library.name}</h3>
            <p>${library.address}</p>
            <button class="select-library" data-name="${library.name}" data-address="${library.address}" data-image="${library.image}">Select Location</button>
          `;
          libraryGrid.appendChild(libraryItem);
        });
      }

      function filterLibraries() {
        const selectedQuadrants = Array.from(document.querySelectorAll('#quadrantFilter input:checked'))
          .map(input => input.value);

        if (selectedQuadrants.length === 0) {
          displayLibraries(libraries);  // Display all libraries if no filters
          return;
        }

        const filteredLibraries = libraries.filter(library => selectedQuadrants.includes(library.quadrant));
        displayLibraries(filteredLibraries);
      }

      document.querySelectorAll('#quadrantFilter input').forEach(checkbox => {
        checkbox.addEventListener('change', filterLibraries);
      });

      // Library selection handler
      libraryGrid.addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains('select-library')) {
          const selectedLibrary = event.target;
          const name = selectedLibrary.getAttribute('data-name');
          const address = selectedLibrary.getAttribute('data-address');
          const image = selectedLibrary.getAttribute('data-image');

          sessionStorage.setItem('library-name', name);
          localStorage.setItem('selectedLibrary', name);
          document.getElementById('library-name').textContent = name;

          popup.style.display = 'none';
          overlay.style.display = 'none';
        }
      });

      // Go to study spaces page
      window.goToStudySpaces = function () {
        const selectedLibrary = localStorage.getItem("selectedLibrary");
        if (selectedLibrary) {
          const encodedLibrary = encodeURIComponent(selectedLibrary);
          window.location.href = `/innerLibrary.html?library=${encodedLibrary}`;
        } else {
          alert("Please select a library first.");
        }
      };

      // Close the popup when the close button is clicked
      closeButton.addEventListener('click', function () {
        popup.style.display = 'none';
        overlay.style.display = 'none';
        if (!selectedLibrary) {
          sessionStorage.setItem('library-name', 'None')
          localStorage.setItem('selectedLibrary', 'None');
        }
      });

      popup.style.display = 'block';
      overlay.style.display = 'block';
      displayLibraries(libraries);

      libraryLocationButton.addEventListener('click', function () {
        popup.style.display = 'block';
        overlay.style.display = 'block';
      });

      const selectedLibrary = sessionStorage.getItem('library-name');
      if (selectedLibrary) {
        document.getElementById('library-name').textContent = selectedLibrary;
        popup.style.display = 'none';
        overlay.style.display = 'none';
      }
    })
    .catch(error => console.error('Error loading libraries.json:', error));

  // Advanced search toggle
  advancedMenu.style.display = "none";
  advancedSearchButton.addEventListener("click", function (event) {
    event.preventDefault();
    advancedMenu.style.display = (advancedMenu.style.display === "none") ? "block" : "none";
  });

  // === Search functionality ===
  
  // Fetch book data and populate the genre and author lists
  fetch('./json/books.json')
    .then(response => response.json())
    .then(books => {
      const genresSet = new Set();
      const authorsSet = new Set();

      // Collect unique genres and authors from the books
      books.forEach(book => {
        book.genres.forEach(genre => genresSet.add(genre));
        authorsSet.add(book.author);
      });

      // Populate genres in the datalist (no filtering of genres here)
      const genreList = document.getElementById('genres');
      genresSet.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        genreList.appendChild(option);
      });

      // Populate authors in the datalist
      const authorList = document.getElementById('authors');
      authorsSet.forEach(author => {
        const option = document.createElement('option');
        option.value = author;
        authorList.appendChild(option);
      });
    })
    .catch(error => console.error('Error loading books.json:', error));

  // === Genre Selection ===
  const genreInput = document.getElementById('genre');
  const selectedGenresContainer = document.getElementById('selectedGenres');
  const authorInput = document.getElementById('author');

  // Store the selected genres
  let selectedGenres = [];

  // Handle genre selection when the user types or selects a genre
  genreInput.addEventListener('change', function () {
    const genre = genreInput.value.trim();
    if (genre && !selectedGenres.includes(genre)) {
      selectedGenres.push(genre);

      // Update the selected genres display
      const genreElement = document.createElement('span');
      genreElement.classList.add('selected-genre');
      genreElement.textContent = genre;

      // Add a remove button next to each genre
      const removeButton = document.createElement('button');
      removeButton.classList.add('remove-genre');
      removeButton.textContent = 'x';
      removeButton.addEventListener('click', function () {
        selectedGenres = selectedGenres.filter(g => g !== genre);
        genreElement.remove();
      });

      genreElement.appendChild(removeButton);
      selectedGenresContainer.appendChild(genreElement);

      // Clear the input field after adding the genre
      genreInput.value = '';
    }
  });

  // === Search functionality ===
  searchForm.addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent the form from submitting in the default way
  
    const searchTerm = searchInput.value.trim();
    const selectedGenresLower = selectedGenres.map(genre => genre.toLowerCase());
    const author = authorInput.value.trim().toLowerCase();
    const releaseFrom = document.getElementById('release_time_from').value;
    const releaseTo = document.getElementById('release_time_to').value;
  
    // Store selected genres in sessionStorage (if needed for later use)
    sessionStorage.setItem('selectedGenres', JSON.stringify(selectedGenresLower));
  
    try {
      const response = await fetch('./json/books.json');
      const books = await response.json();
  
      // Filter books based on the search term and advanced search filters
      const matchedBooks = books.filter(book => {
        const matchesSearchTerm = book.name.toLowerCase().includes(searchTerm);
        const matchesGenres = selectedGenresLower.length > 0 ? selectedGenresLower.some(genre => book.genres.some(g => g.toLowerCase() === genre)) : true;
        const matchesAuthor = author ? book.author.toLowerCase().includes(author) : true;
  
        const matchesReleaseDate = (
          (!releaseFrom || new Date(book.publishing_date) >= new Date(releaseFrom)) &&
          (!releaseTo || new Date(book.publishing_date) <= new Date(releaseTo))
        );
  
        return matchesSearchTerm && matchesGenres && matchesAuthor && matchesReleaseDate;
      });
  
      // Store results in sessionStorage for use on the search results page
      sessionStorage.setItem('searchResults', JSON.stringify(matchedBooks));
  
      // Create URL parameters to pass search details to the results page
      const queryParams = new URLSearchParams();
      queryParams.append('searchTerm', searchTerm);
      queryParams.append('selectedGenres', JSON.stringify(selectedGenresLower));  // Pass genres as JSON string
      queryParams.append('author', author);
      queryParams.append('releaseFrom', releaseFrom);
      queryParams.append('releaseTo', releaseTo);
  
      // Navigate to the search results page with the query parameters
      window.location.href = `./search_results.html?${queryParams.toString()}`;
    } catch (error) {
      console.error('Failed to fetch or filter books:', error);
    }
  });
  

  // Ensure hitting "Enter" triggers the form submission
  searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();  // Prevent default action of submitting the form
      searchForm.dispatchEvent(new Event('submit'));  // Trigger the form submit manually
    }
  });

  // === Display search results ===
  const storedResults = sessionStorage.getItem('searchResults');
  const results = storedResults ? JSON.parse(storedResults) : [];
  
  const searchParamsContainer = document.getElementById('searchParameters');
  const searchResultsContainer = document.getElementById('searchResultsContainer');

  // Get the search parameters from sessionStorage or URL query params
  const urlParams = new URLSearchParams(window.location.search);
  const searchTerm = urlParams.get('searchTerm') || '';
  const urlSelectedGenres = JSON.parse(urlParams.get('selectedGenres') || '[]');
  const author = urlParams.get('author') || '';
  const releaseFrom = urlParams.get('releaseFrom') || '';
  const releaseTo = urlParams.get('releaseTo') || '';

  // Build the search parameters string dynamically
  let searchParamsText = ' Search results for parameters:';

  if (searchTerm) {
    searchParamsText += `| Name: "${searchTerm}"`;
  }

  if (urlSelectedGenres.length > 0) {
    searchParamsText += `| Genres: ${urlSelectedGenres.join(', ')}`;
  }

  if (author) {
    searchParamsText += `| Author: "${author}"`;
  }

  if (releaseFrom || releaseTo) {
    searchParamsText += `| Published Between: ${releaseFrom || 'Any'} - ${releaseTo || 'Any'}`;
  }

  // Display the search parameters text above the results
  searchParamsContainer.textContent = searchParamsText;

  // Display the search results
  if (results.length === 0) {
    searchResultsContainer.innerHTML = '<p>No results found.</p>';
  } else {
    results.forEach(book => {
      const bookHTML = `
        <div class="book-entry" style="display: flex; gap: 1rem; margin-top: 1.5rem;">
          <img src="${book.image}" alt="${book.name}" style="width:100px; height:100px; object-fit:cover;" />
          <div class="book-info">
            <h3>${book.name}</h3>
            <p>by ${book.author}</p>
            <p>${book.synopsis}</p>
          </div>
        </div>
      `;
      searchResultsContainer.insertAdjacentHTML('beforeend', bookHTML);
    });
  }
});
