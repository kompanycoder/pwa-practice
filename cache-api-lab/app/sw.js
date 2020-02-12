// reference the service worker
const self = this;

// give a name for version 1
// let cacheNameGiven = 'cache-name-v1';

// cache name version 2
let cacheNameGiven = 'cache-name-v2';



// eclare files given
let filesToCache = [
    '/',
    'style/main.css',
    'images/still_life_medium.jpg',
    'index.html',
    'pages/offline.html',
    'pages/404.html'
];

// add listener for install
self.addEventListener('install', (event)=>{
    console.log('Attempting to install service worker into app', event);
    event.waitUntil(
        caches.open(cacheNameGiven).then((cacheObject)=>{
            return cacheObject.addAll(filesToCache);
        }).catch((err)=>{
            console.log(err);
        })
    )
});

// activate listener
self.addEventListener('activate', (event)=>{
    console.log('Activating service worker', event);
    let cacheWhiteList = [cacheNameGiven];

    event.waitUntil(
        caches.keys().then((cacheNamesFound)=>{
            cacheNamesFound.map((cacheName)=>{
                if(cacheWhiteList.indexOf(cacheName) === -1) {
                    return caches.delete(cacheName);
                };
            });
        }).catch((err)=>{
            console.log('Found err in activate event', err);
        })
    );
});

//fetch listener
self.addEventListener('fetch', (event)=>{
    console.log('fetch event triggired: ', event.request.url);
    event.respondWith(
        caches.match(event.request).then((cachedResponse)=>{
            if(cachedResponse){
                // console.log(cachedResponse);
                return cachedResponse;
            }
            
            return fetch(event.request).then((response)=>{
                // console.log(response);
                // check if status is 404
                if (response.status === 404){
                    // console.log(response);
                    return caches.match('pages/404.html');
                }
                // else show something else
                return caches.open(cacheNameGiven).then((newCache)=>{
                    newCache.put(event.request.url, cachedResponse.clone());
                    return cachedResponse;
                });
            })
        }).catch((err)=>{
            // console.log('Ooops cache adding found an error in the process of addding new files', err); 
            return caches.match('pages/offline.html'); 
        })
    );
});