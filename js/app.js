gsap.set (".province", {scale:1});

document.querySelectorAll(".province").forEach((province)=>{
  province.addEventListener("mouseover", (event)=>{
    gsap.to(province, {scale: 1.15, duration:0.5});
    province.style.fillOpacity = "1";
    let name = province.getAttribute('name');
    var tooltip = document.getElementById('tooltip1');

    var mouseX = event.clientX-360;
    var mouseY = event.clientY +50;
  
    tooltip.style.display = 'block';
    tooltip.style.left = mouseX + 'px';
    tooltip.style.top = mouseY  + 'px';
    tooltip.innerHTML=name;

  })
  province.addEventListener("mouseout", ()=>{
    gsap.to(province, {scale:1, duration:0.5});
    province.style.fillOpacity = "0.56";
    var tooltip = document.getElementById('tooltip1');
    tooltip.style.display='none';
  })
  
});


var modalMap = document.querySelector('.map-overlay')
var modalMapclose = document.querySelector('.close-div i')
var modalCalendar = document.querySelector('.calendar-outer-container')
var modalTable = document.querySelector('.table')

// function openMap(){
//     // modalMap.style.display = 'flex';
//     // modalCalendar.style.display ='flex';
//     // modalTable.style.display = 'flex'
// }
function openMap() {
  let masterTimeline = gsap.timeline();

  let mapTimeline = gsap.timeline();
  mapTimeline.to(".map-overlay", {
      display: "flex"
  });
  mapTimeline.from(".map-overlay", {
      duration: 0.5,
      backgroundColor: "rgba(0, 0, 0, 0)",
      ease: "power4.out"
  });
  mapTimeline.from(".map-inner-box", {
    duration: 0.5,
    opacity: 0,
    ease: "power4.out"
});

  mapTimeline.from(".fade-animate", {
      duration: 0.5,
      opacity: 0,
      ease: "power4.out"
  });

  let calendarTimeline = gsap.timeline();
  calendarTimeline.to(".calendar-outer-container", {
    display: "flex"
  });
  calendarTimeline.from(".calendar-outer-container", {
      duration: 0.5,
      opacity: 0,
      ease: "power4.out"
  });

  let tableTimeline = gsap.timeline();
  tableTimeline.to(".table", {
    display: "flex"
  });
  tableTimeline.from(".table", {
      duration: 0.5,
      opacity: 0,
      ease: "power4.out"
  });
  

  masterTimeline.add(mapTimeline, 0);
  masterTimeline.add(calendarTimeline, 0.5);
  masterTimeline.add(tableTimeline, 0.5);

  masterTimeline.reverse();
  masterTimeline.restart();
}
function closeMap(){
  modalMap.style.display ='none';
  modalCalendar.style.display ='none';
  modalTable.style.display = 'none'; 

}


//click vao tinh tren ban do Viet Nam co the lay ra id
 document.querySelectorAll(".province").forEach((province) => {


  province.addEventListener("click",()=>{

    const provinceId = province.getAttribute("id");
    const nameProvince= province.getAttribute("name");
    //  document.getElementById('heart-icon').dataset.currentProvince = provinceId;
    displayForecast(provinceId);
    document.querySelector("#header-province").innerHTML=nameProvince;

  });
  modalMapclose.addEventListener("click",closeMap);
  modalMap.addEventListener("click", function(e){
    if (e.target == e.currentTarget){
      closeMap();
      
    }
  });

 });

 function displayForecast(provinceId){

    openMap();
    let districtId= provinceId;

    provinceId = provinceId.slice(0,2);
    //  document.getElementById('heart-icon').dataset.currentProvince = provinceId;
    document.querySelector("#heart-icon").setAttribute("data-index", provinceId);
    updateFavoriteButtonInModal();

    


  

    var container = document.getElementById("svg-Container");
    container.innerHTML="";
      
    var svgObject = document.createElement('object');
    svgObject.data = '../assets/SVG/DetailProvince/'+provinceId+'.svg';
    svgObject.type = 'image/svg+xml';
    container.appendChild(svgObject);


    let url_API="http://localhost:8080/weather.api/v1/data/forecast/hourly/"+districtId;

    console.log(url_API);
    fetchAPI_data(url_API);


    svgObject.addEventListener('load', function() {

    const svgDocument = svgObject.contentDocument;
    eventDetailProvince(svgDocument);

          
  });
 }

 function eventDetailProvince(svgDocument){
  if (!svgDocument) {
    console.error('Content document is null or undefined.');
    return;
  }


  const paths = svgDocument.getElementsByClassName('district');


  // lap qua tung path va them su kien click
  for (const path of paths) {
    path.style.cursor= "pointer";
    path.addEventListener('mouseover', function(event) {
      // alert(path.getAttribute("name"));
      let name = path.getAttribute('name');
      var tooltip = document.getElementById('tooltip2');
  
      var mouseX = event.clientX +100 ;
      var mouseY = event.clientY +120;
    
      tooltip.style.display = 'block';
      tooltip.style.left = mouseX + 'px';
      tooltip.style.top = mouseY  + 'px';
      tooltip.innerHTML=name;
    });

    path.addEventListener('mouseout', function(event){
      var tooltip = document.getElementById('tooltip2');
      tooltip.style.display='none';
    })

    path.addEventListener('click', function(event){
      let districtId = path.getAttribute("id");
      let districtName=path.getAttribute("name");
      showLocationIcon(event);
      document.querySelector("#header-province").innerHTML=districtName;
      let url="http://localhost:8080/weather.api/v1/data/forecast/hourly/"+districtId;
      fetchAPI_data(url);
      console.log(url);
      showData();
    })
    
  }
 }

 function showLocationIcon(event) {
  let locationIcon = document.querySelector(".icon-location");

  // Kiểm tra xem thẻ có tồn tại không
  if (locationIcon) {


    // Thiết lập vị trí của thẻ img tại vị trí xảy ra sự kiện click
    locationIcon.style.left = event.x+ "px";
    locationIcon.style.top = event.y+ "px";
    
    console.log(event.x);
    console.log(event.y);
    // Thiết lập style cho thẻ img để hiển thị
    locationIcon.style.display = "flex";
  }
}

 var data;
 async function fetchAPI_data(url){

  const response = await fetch(url);
  var json_data = await response.json();

  data =json_data.data;

  showData();


 }



 async function fetchAPI_region(url){
  const response = await fetch(url);
  let data= await response.json();
  // console.log(data.name);
  document.querySelector("#header-province").innerHTML=data.name;
 }

var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let day_after = new Array();

for(var i=0; i<=10; i++){
  var day = new Date();
  day.setDate(day.getDate()+i);
  var weekday = day.getDay();
  let date = day.getDate();
  var st = daysOfWeek[weekday] + " "+ date;
  day_after.push(st);
}

//hien thi du lieu vao bang
 function showData(){
  let colspan=[];
  let count =0;

  data.forEach((x,index,array) =>{
    if(x.TimeForecasted.split('T')[1].split(':')[0]=="00") {
      colspan.push(count);
      count=0;
    }
    count++;
    if(index === array.length-1){
      colspan.push(count);
    }
  });
  // console.log(colspan);
  let i=0;
  
  let html = 
    `<thead> <tr>
    ${colspan.map((x)=>`<th colspan='${x}'  style="border-bottom: 1px solid #ccc; white-space:nowrap;"> ${day_after[i++]} </th>`).join('')}
    </tr></thead>
    <tbody>
      <tr>${data.map((x)=>`<td> ${x.TimeForecasted.split('T')[1].split(':')[0]} </td>`).join('')}</tr>
      <tr>${data.map((x)=>`<td><img src="${x.Icon}" alt="" style="max-width:100%; height:33px;display:block; margin:auto;">`).join('')}</tr>
      <tr>${data.map((x)=>`<td>${x.Temp}`).join('')}</tr>
      <tr>${data.map((x)=>`<td>${x.Wind}`).join('')}</tr>
      <tr>${data.map((x)=>`<td>${x.Cloud}`).join('')}</tr>
      <tr>${data.map((x)=>`<td>${x.Precip.toFixed(2)}`).join('')}</tr>
    </tbody>`;

    document.querySelector('.data-table').innerHTML = html;
  };


 function likeToggle(){
      const curentProvince = document.querySelector("#heart-icon").getAttribute("data-index");
      const currentProvinceName = document.querySelector('#header-province').textContent;
      let favoriteList = JSON.parse(localStorage.getItem('favoriteList')) || [];

      // const isFavorite = favoriteList.includes(curentProvince);
      const isFavorite = favoriteList.some(item => item.id === curentProvince)

      if (!isFavorite){
          // favoriteList.push(curentProvince);
          favoriteList.push({id:curentProvince, name: currentProvinceName})

          localStorage.setItem('favoriteList', JSON.stringify(favoriteList));
          alert(`${curentProvince} added to favorite list!`);
          updateFavoriteButtonInModal();
          
      }
      else{
          favoriteList = favoriteList.filter(item => item.id !== curentProvince);
          localStorage.setItem('favoriteList', JSON.stringify(favoriteList));
          alert(`${curentProvince} removed from favorite list!`);
          updateFavoriteButtonInModal();
      }
  
}

function updateFavoriteButtonInModal(){
      const curentProvince = document.querySelector("#heart-icon").getAttribute("data-index");
      let favoriteList = JSON.parse(localStorage.getItem('favoriteList')) || [];
      // const isFavorite = favoriteList.includes(curentProvince);
      const isFavorite = favoriteList.some(item => item.id === curentProvince)
      var heartIcon = document.querySelector("#heart-icon");
      if (isFavorite){
        heartIcon.style.color = "pink";
        updateFavoriteProvincesList();
      
      }else{
        heartIcon.style.color = "grey";
        updateFavoriteProvincesList();
      }
}

async function fetchAPI_data_daily(url) {
  const response = await fetch(url);
  var json_data = await response.json();

  data = json_data.data;
}

async function updateFavoriteProvincesList() {
  let favoriteList = JSON.parse(localStorage.getItem('favoriteList')) || [];
  const favoriteProvincesListElement = document.getElementById('favoriteProvincesList');

  const shortDoW = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  let shortDA = new Array();

  for (var i = 0; i <= 4; i++) {
    var day = new Date();
    day.setDate(day.getDate() + i);
    var weekday = day.getDay();
    var st = shortDoW[weekday];
    shortDA.push(st);
  }


 const html = await Promise.all(favoriteList.map(async(item) => {
  const currentDate = new Date();
    const startDate = currentDate.toISOString().split('T')[0];
    const endDate = new Date(currentDate.getTime() + 4 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];
      const url_API_daily = `http://localhost:8080/weather.api/v1/data/forecast/daily/${item.id}?start_date=${startDate}&end_date=${endDate}`;

    await fetchAPI_data_daily(url_API_daily);


    return `
    <li class="favs-line">
      <div class="favs-title">
        <span><i class="fa-solid fa-heart" id="heart2"></i></span>
        <span class="favs-province-name" onclick="testHeader(${item.id})" style="cursor:pointer;">${item.name }</span>   
        <span class="favs-deleter" onclick="removeFavorite(${item.id})"><i class="fa-regular fa-trash-can" style="cursor: pointer;"></i></span>
      </div>
      <div class="favs-weather">
        <table>
          <tbody>
            <tr>
              ${shortDA.map((day, index) => `
                <td>
                  ${day}
                  <img src="${data[index].Icon}" alt="img">
                    <big>${data[index].Temp}°</big>
                </td>
              `).join('')}
            </tr>
          </tbody>
        </table>
      </div>
    </li>`;
  }));

  favoriteProvincesListElement.innerHTML = html.join('');
}


function removeFavorite(id) {
  let favoriteList = JSON.parse(localStorage.getItem('favoriteList')) || [];

  const indexToRemove = favoriteList.findIndex(item => item.id === String(id));
  

  if (indexToRemove !== -1) {
    console.log(`Removing item with id: ${id}`);
    favoriteList.splice(indexToRemove, 1);
    localStorage.setItem('favoriteList', JSON.stringify(favoriteList));
    alert(`${id} removed from favorite list!`);
    updateFavoriteProvincesList();

  } else {
    console.log(`Item with id ${id} not found.`);
    // console.log(indexToRemove);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  updateFavoriteProvincesList();
});


function testHeader(provinceId){
  // console.log(provinceId);
  displayForecast(provinceId);
}

