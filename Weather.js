let btnElem = document.querySelector("#btn");
let input = document.querySelector("#input");
let tempElem = document.querySelector("#temp");
let cityElem = document.querySelector(".city");
let imageElem = document.querySelector(".image");
let timeElem = document.querySelector(".time");
let conditionElem = document.querySelector(".condition");

let apikey = "50bda143cf434ac2b20165333232110";

btnElem.addEventListener("click", function () {
    let locationCity = input.value;
    if (locationCity == "")
        return;
    fetchResponse(locationCity);
})
async function fetchResponse(locationCity) {
    try {
        let url = `http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${locationCity}&aqi=no`;
        let response = await fetch(url);
        let json = await response.json();
        if (json.error) {
            window.alert("Please Enter a Valid Location");
            return;
        }

        let temp = json.current.temp_c;
        let location = json.location.name;
        let timestamp = json.current.last_updated;
        let condition = json.current.condition.text;
        let image = json.current.condition.icon;
        let background = json.current.is_day;

        updateUI(temp, location, timestamp, condition, image, background);
    } catch (err) {
        console.log("err", err);
    }
}

function updateUI(temp, location, timestamp, condition, image, background) {
    tempElem.textContent = temp;
    cityElem.textContent = location;
    timeElem.textContent = timestamp;
    conditionElem.textContent = condition;
    imageElem.setAttribute("src", image);
    let backgroundimage = "";
    if (background == 0)
        backgroundimage = "https://cdn.pixabay.com/photo/2017/06/08/06/03/british-columbia-2382640_1280.jpg"
    else
        backgroundimage = "https://cdn.pixabay.com/photo/2018/08/06/22/55/sun-3588618_1280.jpg"

    let styleNode = document.createElement("style");
    document.head.appendChild(styleNode);
    styleNode.innerHTML = `html body { background-image: url('${backgroundimage}')}`;
}