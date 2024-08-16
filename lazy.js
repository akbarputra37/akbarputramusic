// Check if localStorage is supported
if (typeof (Storage) !== "undefined") {
  // Retrieve existing visitor count or initialize to 0
  let visitorCount = localStorage.getItem("visitorCount") || 0;

  // Increment visitor count
  visitorCount++;

  // Store updated visitor count
  localStorage.setItem("visitorCount", visitorCount);

  // Display visitor count on the page
  document.getElementById("visitorCount").innerText = visitorCount;
} else {
  console.log("localStorage is not supported.");
}

/*==================== ServiceWorker ====================*/
// Function to set a cookie
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get a cookie
function getCookie(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Function to erase a cookie
function eraseCookie(name) {
  document.cookie = name + '=; Max-Age=-99999999;';
}

// Example usage
setCookie('username', 'wildanakpn', 7); // Set cookie 'username' with value 'wildanakpn' for 7 days
let user = getCookie('username'); // Get cookie 'username'
console.log(user); // Log the value of the 'username' cookie
eraseCookie('username'); // Erase the 'username' cookie




// Function to cache resources
async function cacheResources() {
  if ('caches' in window) {
    const cacheName = 'wildanakpn-cache-v1';
    const cache = await caches.open(cacheName);
    await cache.addAll([
      '/index.html',
      '/styles.css',
      'assets/css/styles.css',
      '/script.js',
      '/main.js',
      '/images/logo.png',
      '.png',
      '/main.json',
      // Add other resources you want to cache
    ]);
  }
}

// Function to fetch resources from cache
async function fetchResource(event) {
  const cache = await caches.open('wildanakpn-cache-v1');
  const response = await cache.match(event.request);
  return response || fetch(event.request);
}

// Example usage with service worker
self.addEventListener('install', event => {
  event.waitUntil(cacheResources());
});

self.addEventListener('fetch', event => {
  event.respondWith(fetchResource(event));
});



async function cacheResources() {
  if ('caches' in window) {
    const cacheName = 'wildanakpn-cache-v1';
    const cache = await caches.open(cacheName);
    const response = await fetch('/cache-config.json');
    const resources = await response.json();
    await cache.addAll(resources.resources);
  }
}



if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, error => {
      console.log('ServiceWorker registration failed: ', error);
    });
  });
}

// Registering a Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").then(
      (registration) => {
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      },
      (err) => {
        console.log("ServiceWorker registration failed: ", err);
      }
    );
  });
}

const wildanakpn = "my-site-cache-v1";
const urlsToCache = ["/", "/styles/main.css", "/script/main.js"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(wildanakpn).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});


document.addEventListener("DOMContentLoaded", function () {
  var metaKeywords = document.createElement('meta');
  metaKeywords.name = "keywords";
  metaKeywords.content = "keyword1, keyword2, keyword3";
  document.getElementsByTagName('head')[0].appendChild(metaKeywords);

  var metaDescription = document.createElement('meta');
  metaDescription.name = "description";
  metaDescription.content = "Wildan Akbar Putra Nugraha | IT Product Designer Customer-Centric or UI/UX Designer";
  document.getElementsByTagName('head')[0].appendChild(metaDescription);
});


document.addEventListener("DOMContentLoaded", function () {
  var metaKeywords = document.createElement('meta');
  metaKeywords.name = "Wildan Akbar Putra Nugraha | IT Product Designer Customer-Centric or UI/UX Designer";
  metaKeywords.content = "Wildan Akbar Putra Nugraha | IT Product Designer Customer-Centric or UI/UX Designer";
  document.getElementsByTagName('head')[0].appendChild(metaKeywords);

  var metaDescription = document.createElement('meta');
  metaDescription.name = "description";
  metaDescription.content = "Wildan Akbar Putra Nugraha | IT Product Designer Customer-Centric or UI/UX Designer";
  document.getElementsByTagName('head')[0].appendChild(metaDescription);
});
/*==================== ServiceWorker ====================*/

// Requiring module
const express = require('express');

// Creating express object
const app = express();

// Handling GET request
app.get('/', (req, res) => {
  res.send('A simple Node App is ' +
    'running on this server')
  res.end()
})

// Port Number
const PORT = process.env.PORT || 5000;

// Server Setup
app.listen(PORT, console.log(
  `Server started on port ${PORT}`));


/*==================== Lazy load images ====================*/
// Lazy load images
document.addEventListener("DOMContentLoaded", function () {
  const lazyImages = document.querySelectorAll("img.lazy");
  const lazyImageObserver = new IntersectionObserver(function (
    entries,
    observer
  ) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
        lazyImage.classList.remove("lazy");
        lazyImageObserver.unobserve(lazyImage);
      }
    });
  });

  lazyImages.forEach(function (lazyImage) {
    lazyImageObserver.observe(lazyImage);
  });
});

// Asynchronously load non-critical scripts
function loadScript(src, callback) {
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  script.onload = callback;
  document.head.appendChild(script);
}


/*==================== Lazy load images ====================*/
// Lazy load images
document.addEventListener("DOMContentLoaded", function () {
  const lazyImages = document.querySelectorAll("img.lazy");
  const lazyImageObserver = new IntersectionObserver(function (
    entries,
    observer
  ) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
        lazyImage.classList.remove("lazy");
        lazyImageObserver.unobserve(lazyImage);
      }
    });
  });

  lazyImages.forEach(function (lazyImage) {
    lazyImageObserver.observe(lazyImage);
  });
});