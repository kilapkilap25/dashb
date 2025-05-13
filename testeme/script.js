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

// Page elements
const healthPage = document.getElementById("healthPage");
const educationPage = document.getElementById("educationPage");
const taxPage = document.getElementById("taxPage");
const taxAppointmentsPage = document.getElementById("taxAppointmentsPage");
const governmentPage = document.getElementById("governmentPage");

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
      optionsHTML += `<div class="service-option" data-service="${serviceType}" data-option="${option}">${option}</div>`;
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
    const serviceType = e.target.getAttribute('data-service');
    const option = e.target.getAttribute('data-option');
    
    // Hide modal
    modal.style.display = "none";
    
    // Show appropriate page based on service type and option
    if (serviceType === 'healthcare') {
      healthPage.classList.add('active');
    } else if (serviceType === 'education') {
      educationPage.classList.add('active');
    } else if (serviceType === 'taxes') {
      if (option === 'Appointments') {
        taxAppointmentsPage.classList.add('active');
      } else {
        taxPage.classList.add('active');
      }
    } else if (serviceType === 'government') {
      if (option === 'Services') {
        governmentPage.classList.add('active');
      }
    }
  }
});

// Back button functionality
document.querySelectorAll('.back-button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.service-page').forEach(page => {
      page.classList.remove('active');
    });
  });
});

// Service item click handlers
document.querySelectorAll('.service-item').forEach(item => {
  item.addEventListener('click', () => {
    // This would typically navigate to the agency's specific page
    alert(`You selected: ${item.querySelector('.service-title').textContent}`);
  });
});