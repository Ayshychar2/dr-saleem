// Shared application script for Dr. Saleem MBBS Admission website

document.addEventListener("DOMContentLoaded", function() {
    // 1. Initialize scroll fade-in animations
    initFadeInAnimations();

    // 2. Initialize mobile navigation drawers
    initMobileNav();

    // 3. Inject and setup the dynamic booking modal
    initBookingModal();

    // 4. Bind dynamic filters if on universities page
    if (document.getElementById("university-grid") || document.querySelector('input[placeholder="Search universities..."]')) {
        initUniversityFilters();
    }
});

// Scroll fade-in animations
function initFadeInAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });
}

// Mobile navigation drawer toggle
function initMobileNav() {
    const openBtn = document.getElementById('open-nav') || document.getElementById('openNav') || document.querySelector('nav button:last-child') || document.querySelector('.md\\:hidden button');
    const closeBtn = document.getElementById('close-nav') || document.getElementById('closeNav') || document.querySelector('#mobile-nav button') || document.querySelector('#mobile-sidebar button') || document.querySelector('#mobileNav button');
    const mobileNav = document.getElementById('mobile-nav') || document.getElementById('mobile-sidebar') || document.getElementById('mobileNav');

    if (openBtn && mobileNav) {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            mobileNav.classList.remove('-translate-x-full');
        });
    }

    if (closeBtn && mobileNav) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            mobileNav.classList.add('-translate-x-full');
        });
    }

    // Close when clicking links in mobile nav
    if (mobileNav) {
        const links = mobileNav.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.add('-translate-x-full');
            });
        });
    }
}

// Global modal booking script
function initBookingModal() {
    // Create the modal DOM elements if they don't exist
    if (!document.getElementById('booking-modal')) {
        const modalHTML = `
            <div id="booking-modal" class="fixed inset-0 z-50 flex items-center justify-center opacity-0 pointer-events-none transition-all duration-300">
                <!-- Overlay -->
                <div class="absolute inset-0 bg-[#0b1c30]/70 backdrop-blur-md modal-overlay"></div>
                
                <!-- Content Container -->
                <div class="relative w-full max-w-xl mx-4 bg-white rounded-xl shadow-2xl overflow-hidden transform scale-95 transition-all duration-300 z-10 border border-outline-variant/30 modal-container">
                    
                    <!-- Header -->
                    <div class="bg-[#001b44] text-white p-6 relative">
                        <h3 class="font-headline-sm text-2xl font-bold">Book Free Session</h3>
                        <p class="text-sm text-surface-bright opacity-90 mt-1">Get custom guidance from Dr. Saleem & team</p>
                        <button id="close-modal-btn" class="absolute top-6 right-6 text-white hover:text-secondary-fixed transition-colors">
                            <span class="material-symbols-outlined text-2xl">close</span>
                        </button>
                    </div>

                    <!-- Form Body -->
                    <form id="modal-booking-form" class="p-6 space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block font-label-caps text-xs text-on-surface font-semibold mb-1" for="modal-first-name">First Name *</label>
                                <input id="modal-first-name" class="w-full px-4 py-2 border border-[#c4c6d2] rounded bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body-md text-sm text-[#0b1c30] outline-none" placeholder="John" required type="text" />
                            </div>
                            <div>
                                <label class="block font-label-caps text-xs text-on-surface font-semibold mb-1" for="modal-last-name">Last Name *</label>
                                <input id="modal-last-name" class="w-full px-4 py-2 border border-[#c4c6d2] rounded bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body-md text-sm text-[#0b1c30] outline-none" placeholder="Doe" required type="text" />
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block font-label-caps text-xs text-on-surface font-semibold mb-1" for="modal-email">Email Address *</label>
                                <input id="modal-email" class="w-full px-4 py-2 border border-[#c4c6d2] rounded bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body-md text-sm text-[#0b1c30] outline-none" placeholder="john@example.com" required type="email" />
                            </div>
                            <div>
                                <label class="block font-label-caps text-xs text-on-surface font-semibold mb-1" for="modal-phone">Phone Number *</label>
                                <input id="modal-phone" class="w-full px-4 py-2 border border-[#c4c6d2] rounded bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body-md text-sm text-[#0b1c30] outline-none" placeholder="+91 XXXXX XXXXX" required type="tel" />
                            </div>
                        </div>
                        <div>
                            <label class="block font-label-caps text-xs text-on-surface font-semibold mb-1" for="modal-destination">Preferred Destination *</label>
                            <select id="modal-destination" class="w-full px-4 py-2 border border-[#c4c6d2] rounded bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body-md text-sm text-[#0b1c30] outline-none" required>
                                <option value="" disabled selected>Select destination...</option>
                                <option value="georgia">Georgia</option>
                                <option value="russia">Russia</option>
                                <option value="kazakhstan">Kazakhstan</option>
                                <option value="undecided">Undecided / Other</option>
                            </select>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block font-label-caps text-xs text-on-surface font-semibold mb-1" for="modal-neet">Estimated NEET Score (Optional)</label>
                                <input id="modal-neet" class="w-full px-4 py-2 border border-[#c4c6d2] rounded bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body-md text-sm text-[#0b1c30] outline-none" placeholder="e.g. 350" type="number" />
                            </div>
                            <div>
                                <label class="block font-label-caps text-xs text-on-surface font-semibold mb-1" for="modal-whatsapp">WhatsApp updates?</label>
                                <div class="flex items-center mt-2">
                                    <input id="modal-whatsapp" type="checkbox" checked class="w-4 h-4 text-[#006d30] border-[#c4c6d2] rounded focus:ring-[#006d30]/20" />
                                    <span class="ml-2 text-xs text-[#434750] font-body-md">Yes, send updates via WhatsApp</span>
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="w-full bg-[#006d30] text-white font-label-caps text-sm font-bold py-3 rounded hover:bg-[#005322] transition-colors shadow-md mt-2 flex items-center justify-center gap-2">
                            <span class="material-symbols-outlined text-sm">event_available</span>
                            Submit Consultation Request
                        </button>
                    </form>
                    
                    <!-- Success screen -->
                    <div id="modal-success-screen" class="hidden p-8 flex flex-col items-center justify-center text-center space-y-4">
                        <div class="w-16 h-16 bg-[#006d30]/15 text-[#006d30] rounded-full flex items-center justify-center animate-bounce">
                            <span class="material-symbols-outlined text-4xl" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                        </div>
                        <h4 class="font-headline-sm text-2xl font-bold text-primary">Booking Submitted!</h4>
                        <p class="font-body-md text-sm text-on-surface-variant max-w-sm">Thank you. Dr. Saleem's team will contact you shortly on your phone/email to confirm your slot.</p>
                        <button id="modal-success-close-btn" class="border border-[#c4c6d2] px-6 py-2 rounded text-sm hover:bg-surface-container font-semibold transition-colors">Close Window</button>
                    </div>

                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    const modal = document.getElementById('booking-modal');
    const overlay = modal.querySelector('.modal-overlay');
    const container = modal.querySelector('.modal-container');
    const closeBtn = document.getElementById('close-modal-btn');
    const successScreen = document.getElementById('modal-success-screen');
    const form = document.getElementById('modal-booking-form');
    const successCloseBtn = document.getElementById('modal-success-close-btn');

    // Function to open modal
    window.openBookingModal = function(preSelectedDest = '') {
        successScreen.classList.add('hidden');
        form.classList.remove('hidden');
        form.reset();
        
        if (preSelectedDest) {
            const selectEl = document.getElementById('modal-destination');
            if (selectEl) selectEl.value = preSelectedDest.toLowerCase();
        }

        modal.classList.remove('opacity-0', 'pointer-events-none');
        container.classList.remove('scale-95');
        container.classList.add('scale-100');
    };

    // Function to close modal
    window.closeBookingModal = function() {
        modal.classList.add('opacity-0', 'pointer-events-none');
        container.classList.remove('scale-100');
        container.classList.add('scale-95');
    };

    // Bind close events
    closeBtn.addEventListener('click', closeBookingModal);
    overlay.addEventListener('click', closeBookingModal);
    successCloseBtn.addEventListener('click', closeBookingModal);

    // Form Submission Action
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple form validation
        const firstName = document.getElementById('modal-first-name').value;
        const phone = document.getElementById('modal-phone').value;
        
        if (!firstName || !phone) return;

        // Perform mock API call or submit state
        form.classList.add('hidden');
        successScreen.classList.remove('hidden');

        // Auto close after 5 seconds
        setTimeout(() => {
            closeBookingModal();
        }, 5000);
    });

    // Attach trigger classes
    // Bind all buttons with custom actions
    document.querySelectorAll('.cta-book-btn, [href="#counseling-form"]').forEach(btn => {
        // If it's index.html and goes to counseling-form, we don't block if there is a form, 
        // but if there isn't we can trigger the modal.
        if (btn.tagName === 'A' && btn.getAttribute('href') === '#counseling-form') {
            if (!document.getElementById('counseling-form')) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    window.openBookingModal();
                });
            }
        } else {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                window.openBookingModal();
            });
        }
    });

    // Also support "Apply Now" buttons triggering modal with prefilled destinations
    document.querySelectorAll('.cta-apply-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            // Try to figure out country from the card context
            let country = '';
            const card = btn.closest('article') || btn.closest('.bg-surface-lowest');
            if (card) {
                const text = card.textContent.toLowerCase();
                if (text.includes('georgia')) country = 'georgia';
                else if (text.includes('russia')) country = 'russia';
                else if (text.includes('kazakhstan')) country = 'kazakhstan';
            }
            window.openBookingModal(country);
        });
    });
}

// Setup live search & filtering on universities page
function initUniversityFilters() {
    const searchInput = document.querySelector('input[placeholder="Search universities..."]');
    const filterButtons = document.querySelectorAll('button[class*="font-label-caps"]');
    const universityGrid = document.getElementById('university-grid') || document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3');
    
    if (!universityGrid) return;
    
    universityGrid.id = 'university-grid';
    const cards = universityGrid.querySelectorAll('article');
    let currentFilter = 'all';
    let searchQuery = '';

    function applyFilterAndSearch() {
        cards.forEach(card => {
            const cardText = card.textContent.toLowerCase();
            
            // Get location text specifically
            const locationEl = card.querySelector('.material-symbols-outlined[class*="text-outline"]') || card.querySelector('.material-symbols-outlined');
            let location = '';
            if (locationEl && locationEl.nextSibling) {
                location = locationEl.nextSibling.textContent.trim().toLowerCase();
            } else {
                location = cardText; // Fallback
            }

            const matchesFilter = (currentFilter === 'all' || location.includes(currentFilter));
            const matchesSearch = cardText.includes(searchQuery);

            if (matchesFilter && matchesSearch) {
                card.style.display = 'flex';
                // Add fade-in transition
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transition = 'opacity 0.3s ease';
                }, 50);
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Set up search listener
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            searchQuery = e.target.value.toLowerCase().trim();
            applyFilterAndSearch();
        });
    }

    // Set up filter buttons listeners
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Reset active styles
            filterButtons.forEach(b => {
                b.className = "px-4 py-2 bg-surface-lowest border border-[#c4c6d2] text-[#434750] rounded font-label-caps text-label-caps hover:bg-surface-container-low whitespace-nowrap transition-colors";
            });
            
            // Set active class on clicked button
            btn.className = "px-4 py-2 bg-[#001b44] text-white rounded font-label-caps text-label-caps whitespace-nowrap transition-colors";
            
            currentFilter = btn.textContent.trim().toLowerCase();
            if (currentFilter === 'all') currentFilter = 'all';
            
            applyFilterAndSearch();
        });
    });
}
