// Save data to local storage
function saveToLocalStorage() {
    const websiteData = {
        name: "AkbarPutraMusic",
        url: "https://akbarputramusic.vercel.app",
        // Add more data as needed
    };
    localStorage.setItem('websiteData', JSON.stringify(websiteData));
}

// Load data from local storage
function loadFromLocalStorage() {
    const data = localStorage.getItem('websiteData');
    if (data) {
        const websiteData = JSON.parse(data);
        console.log('Website data loaded from local storage:', websiteData);
    } else {
        console.log('No website data found in local storage');
    }
}

// Call the save function on page load
document.addEventListener('DOMContentLoaded', (event) => {
    saveToLocalStorage();
    loadFromLocalStorage();
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}


const CACHE_NAME = 'AkbarPutraMusic';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles/main.css',
    '/scripts/main.js',
    // Add more assets as needed
];

// Install the service worker and cache assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

// Intercept fetch requests and serve cached assets
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            if (response) {
                return response;
            }
            return fetch(event.request).then(
                response => {
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });
                    return response;
                }
            );
        })
    );
});

// Update the service worker and clear old caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});


document.addEventListener("DOMContentLoaded", function () {
    let lazyloadImages = document.querySelectorAll("img.lazyload");
    if ("IntersectionObserver" in window) {
        let imageObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    let image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.remove("lazyload");
                    imageObserver.unobserve(image);
                }
            });
        });
        lazyloadImages.forEach(function (image) {
            imageObserver.observe(image);
        });
    } else {
        // Fallback for older browsers
        let lazyloadThrottleTimeout;

        function lazyload() {
            if (lazyloadThrottleTimeout) {
                clearTimeout(lazyloadThrottleTimeout);
            }
            lazyloadThrottleTimeout = setTimeout(function () {
                let scrollTop = window.pageYOffset;
                lazyloadImages.forEach(function (img) {
                    if (img.offsetTop < (window.innerHeight + scrollTop)) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazyload');
                    }
                });
                if (lazyloadImages.length == 0) {
                    document.removeEventListener("scroll", lazyload);
                    window.removeEventListener("resize", lazyload);
                    window.removeEventListener("orientationChange", lazyload);
                }
            }, 20);
        }
        document.addEventListener("scroll", lazyload);
        window.addEventListener("resize", lazyload);
        window.addEventListener("orientationChange", lazyload);
    }
});