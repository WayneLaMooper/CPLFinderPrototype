// Wait until the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function () {

  const popup = document.getElementById('popup');
  const overlay = document.getElementById('overlay');

  // Function to display libraries in the grid
  fetch('./json/libraries.json')  // Path to your libraries.json file
    .then(response => response.json())
    .then(libraries => {
      // Get the library grid element
      const libraryGrid = document.getElementById('libraryGrid');

      // Function to display libraries in the grid
      function displayLibraries(filteredLibraries) {
        libraryGrid.innerHTML = ''; // Clear the grid before adding new libraries

        filteredLibraries.forEach(function (library) {
          const libraryItem = document.createElement('div');
          libraryItem.classList.add('library-item');

          libraryItem.innerHTML = `
          <img src="${library.image}" alt="${library.name}">
          <h3>${library.name}</h3>
          <p>${library.address}</p>
          <button class="select-library" data-name="${library.name}" data-address="${library.address}" data-image="${library.image}">
            Select Location
          </button>
        `;

          // Append to grid
          libraryGrid.appendChild(libraryItem);
        });
      }

      // Function to filter libraries by selected quadrants
      function filterLibraries() {
        // Get all checked checkboxes (selected quadrants)
        const selectedQuadrants = Array.from(document.querySelectorAll('#quadrantFilter input:checked'))
          .map(input => input.value);

        // If no quadrant is selected, show all libraries
        if (selectedQuadrants.length === 0) {
          displayLibraries(libraries);  // Display all libraries if no filters
          return;
        }

        // Filter libraries based on selected quadrants
        const filteredLibraries = libraries.filter(library => selectedQuadrants.includes(library.quadrant));

        // Display filtered libraries
        displayLibraries(filteredLibraries);
      }

      // Add event listener for quadrant filter changes (checkboxes)
      document.querySelectorAll('#quadrantFilter input').forEach(checkbox => {
        checkbox.addEventListener('change', filterLibraries);
      });

      // Add event listener to handle library selection
      libraryGrid.addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains('select-library')) {
          const selectedLibrary = event.target;
          const name = selectedLibrary.getAttribute('data-name');
          const address = selectedLibrary.getAttribute('data-address');
          const image = selectedLibrary.getAttribute('data-image');

        // Here you can save the location (e.g., local storage or server)
        console.log(`Selected Library: ${name}`);
        sessionStorage.setItem('library-name', name)
        console.log(`Address: ${address}`);
        document.getElementById('library-name').textContent = name;

          // Store selected library name for redirect usage
          localStorage.setItem('selectedLibrary', name);

          // Close the popup after selection
          popup.style.display = 'none';
          overlay.style.display = 'none';
        }
      });


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
      const closeButton = document.getElementById('closePopup');
      closeButton.addEventListener('click', function () {
        popup.style.display = 'none';
        overlay.style.display = 'none';
      });

      // Show the popup and overlay
      popup.style.display = 'block';
      overlay.style.display = 'block';

      // Initially display all libraries
      displayLibraries(libraries);

    const libraryLocationButton = document.getElementById('library-location');
    libraryLocationButton.addEventListener('click', function() {
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
  .catch(error => {
    console.error('Error loading libraries.json:', error);
  });


  // Set up event listener for genre input
  const genreInput = document.getElementById("genre");
  genreInput.addEventListener("input", function() {
      console.log(genreInput.value); // Log the genre input value
  });

  // Get the advanced search section and hide it initially
  let advanced_menu = document.getElementsByClassName("advanced_search")[0];
  advanced_menu.style.display = "none";

  // Toggle visibility of advanced search section
  function toggleAdvanced(event) {
    // Prevent toggling menu from initiating a search
    event.preventDefault();
    if (advanced_menu.style.display === "none") {
      advanced_menu.style.display = "block";
    } else {
      advanced_menu.style.display = "none";
    }
  }

  // Bind the toggle function to the button
  const advancedSearchButton = document.querySelector(".advanced_search_button");
  advancedSearchButton.addEventListener("click", toggleAdvanced);

  document.getElementById('searchInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the Enter key from triggering the advanced search button click
      document.getElementById('searchForm').submit(); // Manually submit the form
    }
  });
  
});