document.write('<script type="text/HTML" src="app.js"></script>');

let url_api_region = "http://localhost:8080/weather.api/v1/regions";
let data_region;
async function fetchAPI_search(url_api_region){

    const response = await fetch(url_api_region);
    data_region = await response.json();
  
  
}

fetchAPI_search(url_api_region);

let resultBox= document.querySelector(".result-box");
let inputBox = document.querySelector(".search-bar_input");

inputBox.addEventListener('keyup', function(){
    let result=[];
    let input = inputBox.value;

    if(input.length){
        result = data_region.filter((x)=>{
            return x.name.toLowerCase().includes(input.toLowerCase());
        })
        display(result);
    }

    if(!result.length){
        resultBox.innerHTML='';
    }
})

function display(result){
    let conttent = result.map((x)=>`<li onclick=select(this) id="${x.id_Region}">${x.name}</li>`).join('');
    resultBox.innerHTML=`<ul> ${conttent}</ul>`;
}

function select(li){
    let nameProvince=li.innerHTML;
    myArray=nameProvince.split(",");
    if(myArray.length==1){
        displayForecast(li.id,myArray[0]);    
    }else{
        displayForecast(li.id,myArray[1]);
    }
    inputBox.value=li.innerHTML;
    resultBox.innerHTML='';
}
