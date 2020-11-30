const API = "/api/";
const TOKEN = document.getElementsByName('csrf-token')[0].content; //Provided by RoR

export function get(endpoint) {
  return fetch(API+endpoint)
    .then(handleErrors)
}

export function fetcher(endpoint, params, method = 'POST') {
  return fetch(API+endpoint, {
    method: method,
    headers: {
      'Content-Type': 'application/json', 
      'Accept': 'application/json',
      'X-CSRF-Token': TOKEN},
    body: JSON.stringify(params)
  })
    .then(handleErrors)
}

function handleErrors(response) {
  if (!response.ok){
    throw response;
  }
  return response.json();
}