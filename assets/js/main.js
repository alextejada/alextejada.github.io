/**
 * Template Name: FlexStart
 * Updated: Jul 27 2023 with Bootstrap v5.3.1
 * Template URL: https://bootstrapmade.com/flexstart-bootstrap-startup-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function () {
    "use strict";

    // Function to remove a class based on screen width
    function removeClassBasedOnWidth() {
        let elements = $('.portfolio-container-mobile .portfolio-item');

        if (window.innerWidth <= 768) { // Check if the screen width is less than or equal to 768px
           elements.each(function() {
               $(this).removeClass('col-lg-3');
               $(this).removeClass('col-lg-4');
               $(this).removeClass('col-md-3');
               $(this).removeClass('col-md-4');
               $(this).removeClass('col-sm-3');
               $(this).removeClass('col-sm-4');
               $(this).addClass('col');
           });
        } else {
            // If the screen width is greater than 768px, you can add the class back if needed
            //element.classList.add("example-class");
        }
    }

    // Initial call to the function
    removeClassBasedOnWidth();
    /*
        // Listen for window resize events and call the function when the window size changes
        window.addEventListener("resize", removeClassBasedOnWidth);*/

    $(document).click(function (e) {
        if ($(e.target).is('#modalOffer')) {
            $('#modalOffer').toggle();
        }
    });

    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0; // Start with the center slide

    function updateCarousel() {
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${(0 - currentIndex) * 100}%)`;
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    }

    $(".prev").click(function (e) {
        prevSlide();
    });

    $(".next").click(function (e) {
        nextSlide();
    });

    setInterval(nextSlide, 6000);

    /*function showModal() {
        $('#modalOffer').toggle();
    }

    // Set a timeout to show the modal after 10 seconds
    setTimeout(showModal, 10000);*/

    function showModal() {
        $('#modalOffer').toggle();
    }

    function hasModalBeenShown() {
        //return localStorage.getItem('modalShown');
        // return document.cookie.split(';').some(function (cookie) {
        //     return cookie.trim().startsWith('modalShown2=');
        // });
        return sessionStorage.getItem('modalShown');
    }

    if (!hasModalBeenShown()) {
        setTimeout(function () {
            showModal();
            //document.cookie = 'modalShown2=true; path=/';
            //localStorage.setItem('modalShown', 'true');
            sessionStorage.setItem('modalShown', 'true');
        }, 10000);
    }

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        if (all) {
            select(el, all).forEach(e => e.addEventListener(type, listener))
        } else {
            select(el, all).addEventListener(type, listener)
        }
    }

    /**
     * Easy on scroll event listener
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
        let position = window.scrollY + 200
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            if (!section) return
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
            } else {
                navbarlink.classList.remove('active')
            }
        })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
        let header = select('#header')
        let offset = header.offsetHeight

        if (!header.classList.contains('header-scrolled')) {
            offset -= 10
        }

        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos - offset,
            behavior: 'smooth'
        })
    }

    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select('#header')
    if (selectHeader) {
        const headerScrolled = () => {
            if (window.scrollY > 100) {
                selectHeader.classList.add('header-scrolled')
            } else {
                selectHeader.classList.remove('header-scrolled')
            }
        }
        window.addEventListener('load', headerScrolled)
        onscroll(document, headerScrolled)
    }

    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active')
            } else {
                backtotop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBacktotop)
        onscroll(document, toggleBacktotop)
    }

    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function (e) {
        select('#navbar').classList.toggle('navbar-mobile')
        this.classList.toggle('bi-list')
        this.classList.toggle('bi-x')
    })

    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function (e) {
        if (select(this.hash)) {
            e.preventDefault()

            let navbar = select('#navbar')
            if (navbar.classList.contains('navbar-mobile')) {
                navbar.classList.remove('navbar-mobile')
                let navbarToggle = select('.mobile-nav-toggle')
                navbarToggle.classList.toggle('bi-list')
                navbarToggle.classList.toggle('bi-x')
            }
            scrollto(this.hash)
        }
    }, true)

    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash)
            }
        }
    });

    /**
     * Porfolio isotope and filter
     */
    window.addEventListener('load', () => {
        let portfolioContainer = select('.portfolio-container');
        let portfolioContainerMobile = select('.portfolio-container-mobile');
        if (portfolioContainer) {
            let portfolioIsotope = new Isotope(portfolioContainer, {
                itemSelector: '.portfolio-item',
                //layoutMode: 'fitRows',
                filter: '.filter-slots'
            });

            let portfolioFilters = select('#portfolio-filters li', true);

            on('click', '#portfolio-filters li:not(:last-child)', function (e) {
                e.preventDefault();
                portfolioFilters.forEach(function (el) {
                    el.classList.remove('filter-active');
                });
                this.classList.add('filter-active');

                portfolioIsotope.arrange({
                    filter: this.getAttribute('data-filter')
                });
                aos_init();
            }, true);
        }

        if (portfolioContainerMobile) {
            let portfolioIsotope = new Isotope(portfolioContainerMobile, {
                itemSelector: '.portfolio-item',
                layoutMode: 'horiz',
                filter: '.filter-slots'
            });

            let portfolioFilters = select('#portfolio-filters li', true);

            on('click', '#portfolio-filters li:not(:last-child)', function (e) {
                e.preventDefault();
                portfolioFilters.forEach(function (el) {
                    el.classList.remove('filter-active');
                });
                this.classList.add('filter-active');

                portfolioIsotope.arrange({
                    filter: this.getAttribute('data-filter')
                });
                aos_init();
            }, true);
        }

    });

    $(window).on('resize', function () {
        $('.portfolio').isotope('layout');
    });

    /**
     * Initiate portfolio lightbox
     */
    const portfolioLightbox = GLightbox({
        selector: '.portfolio-lightbox'
    });

    /**
     * Portfolio details slider
     */
    new Swiper('.portfolio-details-slider', {
        speed: 400,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        }
    });

    /**
     * Animation on scroll
     */
    function aos_init() {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true,
            mirror: false
        });
    }

    window.addEventListener('load', () => {
        aos_init();
    });

/*
    const scrollableArea = document.getElementById('games-mobil');

    let isDragging = false;
    let startX;

    scrollableArea.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - scrollableArea.scrollLeft;
    });

    scrollableArea.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const newX = e.pageX - startX;
        scrollableArea.scrollLeft = newX;
    });

    scrollableArea.addEventListener('mouseup', () => {
        isDragging = false;
    });

    scrollableArea.addEventListener('mouseleave', () => {
        isDragging = false;
    });*/
})();