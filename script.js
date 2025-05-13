// Service modal content
const serviceContent = {
  healthcare: {
    title: "Health Care Services",
    description: "Access a wide range of health services designed to support your wellbeing and address your healthcare needs.",
    options: [
      "E-Consultation",
      "Person with Disability",
      "Health Services"
    ],
  },
  education: {
    title: "Educational Assistance",
    description: "Empowering minds and shaping futures through accessible and inclusive education programs for all age groups.",
    options: [
      "Scholarship Programs",
      "Online Enrollement Forms",
      "Information"
    ]
  },
  taxes: {
    title: "Taxes and Permits",
    description: "Streamlined processing for all your tax filings and permit applications to ensure compliance and ease of doing business.",
    options: [
      "Appointments",
      "Miscellanous",
      "Business",
      "Apply for permit",
      "Tax Payment"
    ]
  },
  government: {
    title: "Government Assistance and Offers",
    description: "Support programs designed to enhance economic resilience and social well-being across communities.",
    options: [
      "Appointments",
      "Services",
      "Application Forms",
      "Search Service"
    ]
  }
};

// Get modal elements
const modal = document.getElementById("serviceModal");
const modalBody = document.querySelector(".modal-body");
const closeBtn = document.querySelector(".close");

// Add click event listeners to buttons
document.querySelectorAll('.service-content button').forEach(button => {
  button.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent event bubbling
    const serviceDiv = e.target.closest('.service');
    const serviceType = serviceDiv.getAttribute('data-service');
    
    // Get content for this service
    const content = serviceContent[serviceType];
    
    // Create modal content
    let optionsHTML = '';
    content.options.forEach(option => {
      optionsHTML += `<div class="service-option">${option}</div>`;
    });
    
    modalBody.innerHTML = `
      <div class="service-details">
        <h2>${content.title}</h2>
        <p>${content.description}</p>
        <div class="service-options">
          ${optionsHTML}
        </div>
      </div>
    `;
    
    // Show modal
    modal.style.display = "block";
    
    // Add active class
    document.querySelectorAll('.service').forEach(s => {
      s.classList.remove('active');
    });
    serviceDiv.classList.add('active');
  });
});

// Close modal when X is clicked
closeBtn.addEventListener('click', () => {
  modal.style.display = "none";
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Add functionality to service options within modal
modalBody.addEventListener('click', (e) => {
  if (e.target.classList.contains('service-option')) {
    alert(`You selected: ${e.target.textContent}`);
    // Here you can add further functionality when an option is selected
  }
});