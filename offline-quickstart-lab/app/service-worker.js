let self = this;

// cache name
let cacheName = 'cache-v1';
// resources to cache
let siteResources = [
    '/',
    'index.html',
    'styles/main.css',
    'images/space1.jpg',
    'images/space2.jpg',
    'images/space3.jpg'
];

// install service worker
self.addEventListener('install', (event)=>{
    console.log('in the event install. :-) ', event);
    event.waitUntil(
        caches.open(cacheName).then((cacheObj)=>{
           return cacheObj.addAll(siteResources);
        }).catch((err)=>{
            console.log(err);
        })
    );
});

self.addEventListener('activate', (event) =>{
    console.log('Activate event triggered!');
});

self.addEventListener('fetch', (event) => {
    console.log('fetch event triggered for ', event.request.url);
    event.respondWith(
        caches.match(event.request).then((cachedResponse)=>{
            if(cachedResponse){
                return cachedResponse;
            }
            return fetch(event.request);
        }).catch((err)=>{
            console.log('Oops.. found an error' + err);
        })
    )
});
