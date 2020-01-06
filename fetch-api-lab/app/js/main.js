/*
Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// helper functions ----------

function logResult(result) {
  console.log(result);
}

function logError(error) {
  console.log('Looks like there was a problem:', error);
}


// Fetch JSON ----------
function validateResponse(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function readResponseAsJSON(response) {
  return response.json();
}

function fetchJSON() {
  // TODO
  fetch('examples/animals.json')
  .then(validateResponse)
  .then(readResponseAsJSON)
  .then(logResult)
  .catch(logError)
}
const jsonButton = document.getElementById('json-btn');
jsonButton.addEventListener('click', fetchJSON);


// Fetch Image ----------
function showImage(responseAsBlob) {
  const container = document.getElementById('img-container');
  const imgElem = document.createElement('img');
  container.appendChild(imgElem);
  const imgUrl = URL.createObjectURL(responseAsBlob);
  imgElem.src = imgUrl;
}

function fetchImage() {
  // TODO
  fetch('examples/fetching.jpg')
    .then(validateResponse)
    .then(readResponseAsBlob)
    .then(showImage)
    .catch(logError);
}

function readResponseAsBlob(response) {
  return response.blob();
}

const imgButton = document.getElementById('img-btn');
imgButton.addEventListener('click', fetchImage);


// Fetch text ----------

function fetchText() {
  // TODO
  fetch('/examples/words.txt')
  .then(validateResponse)
  .then(readResponseAsText)
  .then(showText)
  .then(logResult)
  .catch(logError)
}
function readResponseAsText(response){
  console.log("Response headers returned : "+response.headers.get('Content-Type'));
  return response.text();
}
function showText(responseAsText) {
  const message = document.getElementById('message');
  message.textContent = responseAsText;
}

const textButton = document.getElementById('text-btn');
textButton.addEventListener('click', fetchText);


// HEAD request ----------

function headRequest() {
  // TODO
  fetch('examples/words.txt', {
    method: 'HEAD'
  })
  .then(validateResponse)
  .then(readResponseAsText)
  .then(logResult)
  .catch(logError);
}
const headButton = document.getElementById('head-btn');
headButton.addEventListener('click', headRequest);


// POST request ----------

/* NOTE: Never send unencrypted user credentials in production! */
function postRequest() {
  // TODO
  const headerContent = {'Content-Type':'application/json', 'X-CUSTOM': 'hello world', 'Y-Custom': 'oh no'};
  const messageHeaders = new Headers(headerContent); 
  const formData = new FormData(document.getElementById('msg-form'));
  fetch('http://localhost:5000/', {
    method: 'POST',
    headers: messageHeaders,
    body: JSON.stringify({ lab: 'fetch', status: 'fun' })
  })
    .then(validateResponse)
    .then(readResponseAsText)
    .then(showText)
    .catch(logError);
}
// function postRequest() {
//   const formData = new FormData(document.getElementById('msg-form'));
//   fetch('http://localhost:5001/', {
//     method: 'POST',
//     body: formData,
//     mode: 'no-cors'
//   })
//     .then(logResult)
//     .catch(logError);
// }

const postButton = document.getElementById('post-btn');
postButton.addEventListener('click', postRequest);
