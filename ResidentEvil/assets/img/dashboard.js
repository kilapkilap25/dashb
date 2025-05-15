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
    providers: {
      "Health Services": [
        {
          name: "PhilHealth",
          icon: "assets/pngs/philhealth.png",
          description: "Philippine Health Insurance Corporation - National Health Insurance Program",
          url: "https://www.philhealth.gov.ph/"
        }
      ],
      "E-Consultation": [
        {
          name: "Online Doctor Consultation",
          icon: "assets/pngs/consult.avif",
          description: "Connect with healthcare professionals online",
          url: "https://www.seriousmd.com/"
        },
        {
          name: "Telehealth Services",
          icon: "assets/pngs/tele.webp",
          description: "Remote healthcare services",
          url: "https://www.medgate.ph/"
        }
      ],
      "Person with Disability": [
        {
          name: "PWD ID Application",
          icon: "assets/pngs/pwd.png",
          description: "Apply for Person with Disability identification card",
          url: "https://www.ncda.gov.ph/disability-id/"
        },
        {
          name: "PWD Benefits Information",
          icon: "assets/pngs/pwd.png",
          description: "Information about benefits for persons with disabilities",
          url: "https://www.ncda.gov.ph/"
        }
      ]
    }
  },
  education: {
    title: "Educational Assistance",
    description: "Empowering minds and shaping futures through accessible and inclusive education programs for all age groups.",
    options: [
      "Scholarship Programs",
      "Online Enrollment Forms",
      "Information"
    ],
    providers: {
      "Information": [
        {
          name: "DepEd (Department of Education)",
          icon: "assets/pngs/deped.png",
          description: "K-12 education information and resources",
          url: "https://www.deped.gov.ph/"
        },
        {
          name: "CHED (Commission on Higher Education)",
          icon: "assets/pngs/ched.png",
          description: "Higher education information and resources",
          url: "https://ched.gov.ph/"
        },
        {
          name: "TESDA (Technical Education and Skills Development Authority)",
          icon: "assets/pngs/tesda.png",
          description: "Technical and vocational education information",
          url: "https://www.tesda.gov.ph/"
        }
      ]
    }
  },
  taxes: {
    title: "Taxes and Permits",
    description: "Streamlined processing for all your tax filings and permit applications to ensure compliance and ease of doing business.",
    options: [
      "Appointments",
      "Miscellaneous",
      "Business",
      "Apply for permit",
      "Tax Payment"
    ],
    providers: {
      "Appointments": [
        {
          name: "SEC (Securities and Exchange Commission) Appointment System",
          icon: "assets/pngs/sec.png",
          description: "Schedule appointments for SEC services",
          url: "https://appointment.sec.gov.ph/"
        }
      ],
      "Business": [
        {
          name: "BIR (Bureau of Internal Revenue)",
          icon: "assets/pngs/bir.png",
          description: "Tax filing and payment services",
          url: "https://www.bir.gov.ph/"
        },
        {
          name: "DTI (Business Name Registration - BNRS Portal)",
          icon: "assets/pngs/dti.png",
          description: "Business name registration services",
          url: "https://bnrs.dti.gov.ph/"
        },
        {
          name: "SEC (Securities and Exchange Commission) - Services",
          icon: "assets/pngs/sec.png",
          description: "Corporate registration and compliance services",
          url: "https://www.sec.gov.ph/"
        }
      ]
    }
  },
  government: {
    title: "Government Assistance and Offers",
    description: "Support programs designed to enhance economic resilience and social well-being across communities.",
    options: [
      "Appointments",
      "Services",
      "Application Forms",
      "Search Service"
    ],
    providers: {
      "Services": [
        {
          name: "DOLE (Department of Labor and Employment)",
          icon: "assets/pngs/dole.png",
          description: "Employment and labor services",
          url: "https://www.dole.gov.ph/"
        },
        {
          name: "Philippine Overseas Employment Administration",
          icon: "assets/pngs/poea.png",
          description: "Overseas employment services",
          url: "https://www.poea.gov.ph/"
        },
        {
          name: "Overseas Workers Welfare Administration",
          icon: "assets/pngs/owwa.png",
          description: "Welfare services for overseas Filipino workers",
          url: "https://owwa.gov.ph/"
        },
        {
          name: "DSWD (Department of Social Welfare and Development)",
          icon: "assets/pngs/dswd.png",
          description: "Social welfare and development services",
          url: "https://www.dswd.gov.ph/"
        },
        {
          name: "Land Transportation Office",
          icon: "assets/pngs/lto.png",
          description: "Driver's licensing and vehicle registration services",
          url: "https://www.lto.gov.ph/"
        },
        {
          name: "LAND TRANSPORTATION FRANCHISING AND REGULATORY BOARD NATIONAL CAPITAL REGION",
          icon: "assets/pngs/ltfrb.png",
          description: "Public transportation franchising and regulation services",
          url: "https://ncr.ltfrb.gov.ph/"
        },
        {
          name: "DOJ (Department of Justice)",
          icon: "assets/pngs/doj.png",
          description: "Legal and justice services",
          url: "https://www.doj.gov.ph/"
        }
      ]
    }
  }
};

// Document ready function to ensure all DOM elements are loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get modal elements
  const modal = document.getElementById("serviceModal");
  const modalBody = document.querySelector(".modal-body");
  const closeBtn = document.querySelector(".close");

  // Get provider modal elements
  const providerModal = document.getElementById("serviceProviderModal");
  const providerBody = document.querySelector(".provider-body");
  const providerTitle = document.getElementById("providerTitle");
  const providerCloseBtn = document.querySelector(".provider-close");

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

  // Modal option click event
  if (modalBody) {
    modalBody.addEventListener('click', (e) => {
      if (e.target.classList.contains('service-option')) {
        const serviceType = e.target.getAttribute('data-service');
        const option = e.target.getAttribute('data-option');
        const content = serviceContent[serviceType];
        
        // Check if providers exist for this option
        if (content.providers && content.providers[option]) {
          const providers = content.providers[option];
          
          // Create provider list HTML
          let providersHTML = '<div class="services-list">';
          providers.forEach(provider => {
            providersHTML += `
              <div class="service-item" data-url="${provider.url}">
                <div class="service-icon">
                  <img src="${provider.icon}" alt="${provider.name}" />
                </div>
                <div class="service-text">
                  <div class="service-title">${provider.name}</div>
                  <div class="service-description">${provider.description || ''}</div>
                </div>
              </div>
            `;
          });
          providersHTML += '</div>';
          
          // Update provider modal
          providerTitle.textContent = option;
          providerBody.innerHTML = providersHTML;
          
          // Show provider modal
          providerModal.style.display = "block";
          
          // Hide the service modal
          modal.style.display = "none";
        }
      }
    });
  }

  // Service provider item click event
  document.addEventListener('click', (e) => {
    const serviceItem = e.target.closest('.service-item');
    if (serviceItem) {
      const url = serviceItem.getAttribute('data-url');
      if (url && url !== "#") {
        window.open(url, '_blank');
      }
    }
  });

  // Close modal when X is clicked
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = "none";
    });
  }

  // Close provider modal when X is clicked
  if (providerCloseBtn) {
    providerCloseBtn.addEventListener('click', () => {
      providerModal.style.display = "none";
    });
  }

  // Close modals when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
    if (e.target === providerModal) {
      providerModal.style.display = "none";
    }
  });
  
  // =======================================================
  // Profile Dropdown Functionality
  // =======================================================
  const profileDropdownBtn = document.getElementById('profileDropdownBtn');
  const profileDropdown = document.getElementById('profileDropdown');
  
  if (profileDropdownBtn && profileDropdown) {
    // Toggle dropdown when clicking the profile button
    profileDropdownBtn.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent event from bubbling up
      profileDropdown.classList.toggle('show');
    });
    
    // Close dropdown when clicking anywhere else on the page
    document.addEventListener('click', function(e) {
      if (!profileDropdownBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
        profileDropdown.classList.remove('show');
      }
    });
    
    // Handle logout button click
    const logoutButton = document.querySelector('.logout-item');
    if (logoutButton) {
      logoutButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // You can add a confirmation here if needed
        const confirmLogout = confirm("Are you sure you want to log out?");
        
        if (confirmLogout) {
          // Redirect to login page
          window.location.href = 'login.html';
          
          // Optional: Clear any session storage or cookies here
          // localStorage.removeItem('user');
          // sessionStorage.clear();
        }
      });
    }
    
    // Add keyboard accessibility (close dropdown on Escape key)
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && profileDropdown.classList.contains('show')) {
        profileDropdown.classList.remove('show');
      }
    });
  }
});