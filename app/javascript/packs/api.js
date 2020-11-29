const api = "/api/";

export function get(endpoint) {
  return fetch(api+endpoint)
    .then(handleErrors)
}

export function post(endpoint, params) {
  const token = document.getElementsByName('csrf-token')[0].content;
  return fetch(api+endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
      'Accept': 'application/json',
      'X-CSRF-Token': token},
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