// Wait until the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function() {

  const popup = document.getElementById('popup');
  const overlay = document.getElementById('overlay');
  const closeButton = document.getElementById('closePopup');
  const libraryGrid = document.getElementById('libraryGrid');

  // Simulate fetching data from libraries.json (this can be replaced with a fetch if using a real JSON file)
  const libraries = [
    {
      "name": "Shawnessy Library",
      "address": "333 Shawville Blvd SE, Calgary, AB T2Y 4H3",
      "quadrant": "SE",
      "image": "images/shawnessy_library.jpg"
    },
    {
      "name": "Village Square Library",
      "address": "2623 56 St NE, Calgary, AB T1Y 6E7",
      "quadrant": "NE",
      "image": "images/village_square_library.jpg"
    }
  ];

  // Function to display libraries in the grid
  fetch('./json/libraries.json')  // Path to your libraries.json file
  .then(response => response.json())
  .then(libraries => {
    // Get the library grid element
    const libraryGrid = document.getElementById('libraryGrid');

    // Function to display libraries in the grid
    function displayLibraries(filteredLibraries) {
      libraryGrid.innerHTML = ''; // Clear the grid before adding new libraries

      filteredLibraries.forEach(function(library) {
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
    libraryGrid.addEventListener('click', function(event) {
      if (event.target && event.target.classList.contains('select-library')) {
        const selectedLibrary = event.target;
        const name = selectedLibrary.getAttribute('data-name');
        const address = selectedLibrary.getAttribute('data-address');
        const image = selectedLibrary.getAttribute('data-image');

        // Here you can save the location (e.g., local storage or server)
        console.log(`Selected Library: ${name}`);
        console.log(`Address: ${address}`);
        document.getElementById('library-name').textContent = name;

        // You can close the popup after selection
        popup.style.display = 'none';
        overlay.style.display = 'none';
      }
    });

    // Close the popup when the close button is clicked
    const closeButton = document.getElementById('closePopup');
    closeButton.addEventListener('click', function() {
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
    function toggleAdvanced() {
      if (advanced_menu.style.display === "none") {
        advanced_menu.style.display = "block";
      } else {
        advanced_menu.style.display = "none";
      }
    }
  
    // Bind the toggle function to the button
    const advancedSearchButton = document.querySelector(".advanced_search_button");
    advancedSearchButton.addEventListener("click", toggleAdvanced);
  
  });