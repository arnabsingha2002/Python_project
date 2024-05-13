const navbarMenu = document.querySelector(".navbar .links");
const hamburgerBtn = document.querySelector(".hamburger-btn");
const hideMenuBtn = navbarMenu.querySelector(".close-btn");

// Show mobile menu
hamburgerBtn.addEventListener("click", () => {
    navbarMenu.classList.toggle("show-menu");
});

// Hide mobile menu
hideMenuBtn.addEventListener("click", () =>  hamburgerBtn.click());

// Add event listener to form submission
document.getElementById('ratingForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Disable form submission button
    document.querySelector('.send').disabled = true;

    try {
        // Get rating value
        const rating = document.querySelector('input[name="rating"]:checked').value;

        // Get comment
        const comment = document.querySelector('.comment-area textarea').value;

        // Send data to backend
        const response = await fetch('/rate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ rating, comment })
        });

        if (response.ok) {
            // Handle success
            alert('Rating submitted successfully');
            window.location.reload(); // Reload the current page to clear the form and allow for another submission
        } else {
            // Handle error
            alert('Failed to submit rating');
        }
    } catch (error) {
        // Handle any unexpected errors
        console.error('Error:', error);
        alert('An unexpected error occurred. Please try again.');
    } finally {
        // Re-enable form submission button
        document.querySelector('.send').disabled = false;
    }
});

// Add event listener to cancel button
// Add event listener to cancel button
document.getElementById('cancelButton').addEventListener('click', () => {
    document.getElementById('ratingForm').reset(); // Reset the form
});



