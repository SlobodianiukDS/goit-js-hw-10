const BASIS_URL = `https://restcountries.com/v3.1/`;
const filter = `name,capital,population,flags,languages`;

export function fetchCountries(name) {
  return fetch(`${BASIS_URL}name/${name}?fields=${filter}`).then(r => {
    if (!r.ok) {
      throw new Error(r.status);
    }
    return r.json();
  });
}
