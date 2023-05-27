const countriesContainer = document.querySelector(".countries");
const regionFilters = document.querySelectorAll(".region");
const dropDownButton =document.querySelector(".dropDown");
const drop = document.querySelector(".drop");
const searchInput =document.getElementById("search-input");
searchInput.addEventListener("change", async() => {
   
   try{
    const searchValue = searchInput.value;
    const response = await fetch(
        `https://restcountries.com/v3.1/name/${searchValue}`
    );
    const data = await response.json();
    const countriesHtml = getCountriesHtml(data);
    countriesContainer.innerHTML = countriesHtml;

   } catch {
    alert("countries with given name were not found");
   }
});
dropDownButton.addEventListener("click" , ()=> {
    drop.classList.toggle("showDropDown");
});
regionFilters.forEach((region) => {
    region.addEventListener("click",async ()=> {
        const response = await fetch(`https://restcountries.com/v3.1/region/${region.textContent}`)
        const data = await response.json();
        const countriesHtml = getCountriesHtml(data);
        countriesContainer.innerHTML = countriesHtml;
        console.log(data)
    }
        );
    });


const getCountries = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all/");
    data = await response.json();
    return data;
};
function getCountriesHtml(countries) {
    let countriesHtml ="";
    countries.map((country) => { 
        const countryHtml = getOneCountryHtml(country);
        countriesHtml  += countryHtml;

        
    });
    return countriesHtml;
}
function getOneCountryHtml(country) {
    
    return `
    <div>
    <div class="country-img">
        <img src="${country?.flags?.png}" alt="country" />
    </div>
    <div class="country-info">
        <h5>${country?.name?.common}</h5>
        <p><strong>${country?.population}</strong></p>
        <p><strong>Region</strong>${country?.region}</p>
        <p><strong>Capital</strong>${country?.capital}</p>
    </div>
    </div>`
    ;
}

async function main() {
    const countries = await getCountries();
    const country = getOneCountryHtml(countries[0]);
    const countriesHtml = getCountriesHtml(countries);
    countriesContainer.innerHTML = countriesHtml;
    console.log("drop:",drop);
    console.log("drop classList:", drop.classList)

}
main();
console.log("regionFilters:", regionFilters);
// 1st step : get the element with id of
// add one country to it using the getOneCountryHtml funciton