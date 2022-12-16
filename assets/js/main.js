/**
 * Template Name: Hidayah - v4.9.0
 * Template URL: https://bootstrapmade.com/hidayah-free-simple-html-template-for-corporate/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 *
 * @format
 */

(function () {
	'use strict';

	/**
	 * Easy selector helper function
	 */
	const select = (el, all = false) => {
		el = el.trim();
		if (all) {
			return [...document.querySelectorAll(el)];
		} else {
			return document.querySelector(el);
		}
	};

	/**
	 * Easy event listener function
	 */
	const on = (type, el, listener, all = false) => {
		let selectEl = select(el, all);
		if (selectEl) {
			if (all) {
				selectEl.forEach((e) => e.addEventListener(type, listener));
			} else {
				selectEl.addEventListener(type, listener);
			}
		}
	};

	/**
	 * Easy on scroll event listener
	 */
	const onscroll = (el, listener) => {
		el.addEventListener('scroll', listener);
	};

	/**
	 * Navbar links active state on scroll
	 */
	let navbarlinks = select('#navbar .scrollto', true);
	const navbarlinksActive = () => {
		let position = window.scrollY + 200;
		navbarlinks.forEach((navbarlink) => {
			if (!navbarlink.hash) return;
			let section = select(navbarlink.hash);
			if (!section) return;
			if (
				position >= section.offsetTop &&
				position <= section.offsetTop + section.offsetHeight
			) {
				navbarlink.classList.add('active');
			} else {
				navbarlink.classList.remove('active');
			}
		});
	};
	window.addEventListener('load', navbarlinksActive);
	onscroll(document, navbarlinksActive);

	/**
	 * Scrolls to an element with header offset
	 */
	const scrollto = (el) => {
		let header = select('#header');
		let offset = header.offsetHeight;

		let elementPos = select(el).offsetTop;
		window.scrollTo({
			top: elementPos - offset,
			behavior: 'smooth',
		});
	};

	/**
	 * Preloader
	 */
	let preloader = select('#preloader');
	if (preloader) {
		window.addEventListener('load', () => {
			preloader.remove();
		});
	}

	/**
	 * Back to top button
	 */
	let backtotop = select('.back-to-top');
	if (backtotop) {
		const toggleBacktotop = () => {
			if (window.scrollY > 100) {
				backtotop.classList.add('active');
			} else {
				backtotop.classList.remove('active');
			}
		};
		window.addEventListener('load', toggleBacktotop);
		onscroll(document, toggleBacktotop);
	}

	/**
	 * Mobile nav toggle
	 */
	on('click', '.mobile-nav-toggle', function (e) {
		select('#navbar').classList.toggle('navbar-mobile');
		this.classList.toggle('bi-list');
		this.classList.toggle('bi-x');
	});

	/**
	 * Mobile nav dropdowns activate
	 */
	on(
		'click',
		'.navbar .dropdown > a',
		function (e) {
			if (select('#navbar').classList.contains('navbar-mobile')) {
				e.preventDefault();
				this.nextElementSibling.classList.toggle('dropdown-active');
			}
		},
		true,
	);

	/**
	 * Scrool with ofset on links with a class name .scrollto
	 */
	on(
		'click',
		'.scrollto',
		function (e) {
			if (select(this.hash)) {
				e.preventDefault();

				let navbar = select('#navbar');
				if (navbar.classList.contains('navbar-mobile')) {
					navbar.classList.remove('navbar-mobile');
					let navbarToggle = select('.mobile-nav-toggle');
					navbarToggle.classList.toggle('bi-list');
					navbarToggle.classList.toggle('bi-x');
				}
				scrollto(this.hash);
			}
		},
		true,
	);

	/**
	 * Scroll with ofset on page load with hash links in the url
	 */
	window.addEventListener('load', () => {
		if (window.location.hash) {
			if (select(window.location.hash)) {
				scrollto(window.location.hash);
			}
		}
	});

	/**
	 * Hero carousel indicators
	 */
	let heroCarouselIndicators = select('#hero-carousel-indicators');
	let heroCarouselItems = select('#heroCarousel .carousel-item', true);

	heroCarouselItems.forEach((item, index) => {
		index === 0
			? (heroCarouselIndicators.innerHTML +=
					"<li data-bs-target='#heroCarousel' data-bs-slide-to='" +
					index +
					"' class='active'></li>")
			: (heroCarouselIndicators.innerHTML +=
					"<li data-bs-target='#heroCarousel' data-bs-slide-to='" +
					index +
					"'></li>");
	});

	/**
	 * Initiate glightbox
	 */
	const glightbox = GLightbox({
		selector: '.glightbox',
	});

	/**
	 * Skills animation
	 */
	let skilsContent = select('.skills-content');
	if (skilsContent) {
		new Waypoint({
			element: skilsContent,
			offset: '80%',
			handler: function (direction) {
				let progress = select('.progress .progress-bar', true);
				progress.forEach((el) => {
					el.style.width = el.getAttribute('aria-valuenow') + '%';
				});
			},
		});
	}

	/**
	 * Initiate portfolio lightbox
	 */
	const portfolioLightbox = GLightbox({
		selector: '.portfolio-lightbox',
	});

	/**
	 * Portfolio details slider
	 */
	new Swiper('.portfolio-details-slider', {
		speed: 400,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
	});

	/**
	 * Initiate Pure Counter
	 */
	new PureCounter();
})();

    /* events show and hide function */

    const events = document.querySelectorAll(".event");
    const eventsOverflow = document.querySelectorAll(".event:nth-child(n + 3)");
    const eventsModalBody = document.getElementById("events-modal-body");
    
    if (events.length > 2) {
        eventsOverflow.forEach( element => {
            eventsModalBody.appendChild(element);
            element.className = "events-overflow";
            const eventHr = document.createElement("hr");
            eventHr.className = "events-separator";
            element.appendChild(eventHr);
        })
        const seeOverflow = document.createElement("button");

        seeOverflow.className = "see-overflow";
        seeOverflow.style.margin = "0px 0px 0px 0px";
        seeOverflow.innerText = "More events ->";
        seeOverflow.setAttribute("data-bs-toggle", "modal");
        seeOverflow.setAttribute("data-bs-target", "#events-overflow");

        document.getElementById("events-container").appendChild(seeOverflow);

    } else if (eventsOverflow.length === 0) {
        console.log("there are no overflow events");
    }