const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
const dropdowns = document.querySelectorAll(".dropdown select");
const button = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".final-msg");


for(let select of dropdowns){
  for (currCode in countryList){
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD"){
      newOption.selected = "selected";
    }else if (select.name === "to" && currCode === "INR"){
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change",(e) => {
    updateFlag(e.target);
  })
}

const updateExchangeRate = async() =>{
  let ammount = document.querySelector(".ammount input");
  let amtValue = ammount.value;
  if(amtValue === "" || amtValue < 1){
    amtValue = 1;
    ammount.value = "1";
  }
  // console.log(fromCurr.value,toCurr.value);
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];

  let finalAmt = amtValue * rate;
  msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc =  `https://flagsapi.com/${countryCode}/shiny/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}

button.addEventListener("click", async(evt)=>{
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
})




