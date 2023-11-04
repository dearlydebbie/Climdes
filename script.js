// Function to handle hamburger menu click
const menutoggler = document.querySelector(".menu-toggler");
const navbar = document.querySelector(".navbar");
const menu = document.querySelector(".menu");

menutoggler.addEventListener("click", () => {
  // Toggle the "show-menu" class on the navbar to show/hide the menu
  navbar.classList.toggle("show-menu");
  if (navbar.classList.contains("show-menu")) {
    // When showing the menu, set max-height to allow it to expand
    menu.style.maxHeight = menu.scrollHeight + "px";
  } else {
    // When hiding the menu, set max-height to 0 and hide overflow
    menu.style.maxHeight = "0px";
    menu.style.overflow = "hidden";
  }
});

$(document).ready(function () {
  // This code runs when the document is fully loaded and ready to be manipulated.

  // Function to fetch and display internships
  function fetchInternships(category) {
    // This function is responsible for fetching and displaying internships based on the provided category.

    // Clear existing opportunities
    $(".opportunity-card").remove();
    // Removes any previously displayed internship cards.

    // Simulate an AJAX request to fetch data from your JSON file
    fetch("internships.json")
      .then((response) => {
        // Use the fetch API to simulate an AJAX request to load data from the "internships.json" file.
        // The code below is executed once the request is resolved successfully.

        if (!response.ok) {
          // Check if the response indicates an error (e.g., a non-200 status code).
          throw new Error("Failed to fetch data. Status: ${response.status}");
          // If an error is detected, throw an error with a message.
        }
        return response.json();
        // Parse the response as JSON and return it.
      })
      .then((data) => {
        // This block is executed when the JSON data is successfully fetched and parsed.

        if (data.length > 0) {
          // Check if there is data available in the JSON response.

          $.each(data, function (index, internship) {
            // Iterate over each internship in the JSON data.

            if (category === 'all' || category === internship.category) {
              // Check if the category matches the selected category or if 'all' internships are selected.

              // Create a new opportunity card for each internship
              const opportunityCard = document.createElement('div');
              opportunityCard.classList.add('opportunity-card');
              // Create a new HTML element for displaying the internship card.

              // Populate the opportunity card with details
              opportunityCard.innerHTML = `<div class="card">
                <h3 class="title card-title">${internship.title}</h3>
                <p>${internship.description}</p>
                <p><strong>Location:</strong> ${internship.location}</p>
                <a href="#" class="button">Learn More</a></div>
              `;
              // Populate the card with internship details using HTML.

              // Append the opportunity card to the container
              document.querySelector(".card-group").appendChild(opportunityCard);
              // Add the created card to the container for display.
            }
          });
        } else {
          // If there are no internships available in the JSON data, display a message.
          $("#opportunity-list").html("<p>No internships available at the moment.</p>");
        }
      })
      .catch(function (error) {
        // This block handles errors in the fetch or data processing.

        console.error(error);
        // Log the error to the console for debugging purposes.

        $("#opportunity-list").html("<p>Failed to load internship data. Please try again later.</p>");
        // Display an error message on the webpage.
      });
  }

  // Call the fetchInternships function to load all internships initially
  fetchInternships('all');
  // Initially load all internships when the page is first loaded.

  // Function to handle filter button clicks
  $(".filter-button").click(function () {
    // This function handles the click event for filter buttons (e.g., Technical, Non-Technical).

    $(".filter-button").removeClass("active");
    // Remove the "active" class from all filter buttons.

    $(this).addClass("active");
    // Add the "active" class to the clicked filter button.

    const category = $(this).attr("data-category");
    // Get the category (e.g., Technical or Non-Technical) from the clicked button.

    fetchInternships(category);
    // Fetch and display internships based on the selected category.
  });

  // Smooth scroll to the Internship Opportunities section when "Apply Now" is clicked
  $(".button").click(function (e) {
    // This function handles the click event when the "Apply Now" button is clicked.

    e.preventDefault();
    // Prevent the default behavior of the anchor link.

    $("html, body").animate(
      {
        scrollTop: $("#intern").offset().top
      },
      800
    );
    // Animate a smooth scroll to the section with the ID "intern" over 800 milliseconds.
  });
});