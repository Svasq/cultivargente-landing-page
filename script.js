document.addEventListener('DOMContentLoaded', () => {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarClose = document.getElementById('sidebar-close');
    const sidebar = document.getElementById('sidebar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sidebarLinks = document.querySelectorAll('#sidebar ul li a'); // Corrected selector for sidebar links

    // Sidebar Toggle Functionality
    if (sidebarToggle && sidebar && sidebarClose) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.add('open');
        });

        sidebarClose.addEventListener('click', () => {
            sidebar.classList.remove('open');
        });
    }

    // Smooth Scrolling for Anchor Links & Close Sidebar on Click (for mobile)
    const smoothScrollAndCloseSidebar = (event) => {
        const targetId = event.currentTarget.getAttribute('href');
        // Ensure it's an internal link
        if (targetId && targetId.startsWith('#')) {
            event.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
            // Close sidebar if it's open (useful for mobile navigation)
            if (sidebar && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
            }
        }
        // For the "Subscribe Now" button in sidebar, if it's not an anchor link but should close sidebar
        else if (event.currentTarget.classList.contains('cta-button-sidebar') && sidebar && sidebar.classList.contains('open')) {
             // If it's the main subscribe button, it will be handled by Stripe link later.
             // For now, just ensure sidebar closes if it's not an anchor.
             // If it IS an anchor (e.g. to #pricing), the above block handles it.
             // This handles the case where it might be a direct link off-page or a JS action.
            if (!targetId || !targetId.startsWith('#')) {
                 sidebar.classList.remove('open');
            }
        }
    };

    navLinks.forEach(link => {
        link.addEventListener('click', smoothScrollAndCloseSidebar);
    });

    sidebarLinks.forEach(link => {
        link.addEventListener('click', smoothScrollAndCloseSidebar);
    });

    // Optional: Close sidebar if clicking outside of it
    document.addEventListener('click', (event) => {
        if (sidebar && sidebar.classList.contains('open')) {
            const isClickInsideSidebar = sidebar.contains(event.target);
            const isClickOnToggle = sidebarToggle ? sidebarToggle.contains(event.target) : false;

            if (!isClickInsideSidebar && !isClickOnToggle) {
                sidebar.classList.remove('open');
            }
        }
    });

    // The Stripe payment links are now directly in the HTML href attributes.
    // No JavaScript update needed for them here.
});
