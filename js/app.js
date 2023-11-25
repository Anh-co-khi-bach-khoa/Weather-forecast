gsap.set (".province", {scale:1});

document.querySelectorAll(".province").forEach((province)=>{
  province.addEventListener("mouseover", ()=>{
    gsap.to(province, {scale: 1.5, duration:0.5});
    province.style.fillOpacity = "1";
    // province.style.zIndex = "1";
    
    // province.setAttribute("opacity", "1");
  })
  province.addEventListener("mouseout", ()=>{
    gsap.to(province, {scale:1, duration:0.5});
    province.style.fillOpacity = "0.56";
    // province.style.zIndex = "0";
    // province.setAttribute("opacity", "0.56");
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
  modalTable.style.display = 'none'

}

<<<<<<< HEAD
//click vao tinh tren ban do Viet Nam co the lay ra id
=======
>>>>>>> bdd2e8650e1b9398b474cb5965129e8abe199c0c
 document.querySelectorAll(".province").forEach((province) => {


  province.addEventListener("click",()=>{

    openMap();
    
    const provinceId = province.getAttribute("id");
    //  document.getElementById('heart-icon').dataset.currentProvince = provinceId;
    document.querySelector("#heart-icon").setAttribute("data-index", provinceId);
    updateFavoriteButtonInModal();

    var container = document.getElementById("svg-Container");
        container.innerHTML="";
      
        var svgObject = document.createElement('object');
        svgObject.data = '../assets/SVG/DetailProvince/'+provinceId+'.svg';
        svgObject.type = 'image/svg+xml';
        container.appendChild(svgObject);


        let url_API="http://localhost:8080/weather.api/v1/data/forecast/hourly/"+provinceId;
        fetchAPI(url_API);


        svgObject.addEventListener('load', function() {

          const svgDocument = svgObject.contentDocument;
        

          if (!svgDocument) {
            console.error('Content document is null or undefined.');
            return;
          }
        

          const paths = svgDocument.getElementsByClassName('district');

        
          // lap qua tung path va them su kien click
          for (const path of paths) {
            path.style.cursor= "pointer";
            path.addEventListener('click', function() {
              alert(path.getAttribute("name"));
            });
          }
        });
  

  });
  modalMapclose.addEventListener("click",closeMap);
  modalMap.addEventListener("click", function(e){
    if (e.target == e.currentTarget){
      closeMap()
      
    }
  });

 });

 var data;
 async function fetchAPI(url){

  const response = await fetch(url);
  var json_data = await response.json();

  data =json_data.data;

  showData();


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
      let favoriteList = JSON.parse(localStorage.getItem('favoriteList')) || [];

      const isFavorite = favoriteList.includes(curentProvince);

      if (!isFavorite){
          favoriteList.push(curentProvince);

          localStorage.setItem('favoriteList', JSON.stringify(favoriteList));
          alert(`${curentProvince} added to favorite list!`);
          updateFavoriteButtonInModal();
          
      }
      else{
          favoriteList = favoriteList.filter(item => item !== curentProvince);
          localStorage.setItem('favoriteList', JSON.stringify(favoriteList));
          alert(`${curentProvince} removed from favorite list!`);
          updateFavoriteButtonInModal();
      }
  
}

function updateFavoriteButtonInModal(){
      const curentProvince = document.querySelector("#heart-icon").getAttribute("data-index");
      let favoriteList = JSON.parse(localStorage.getItem('favoriteList')) || [];
      const isFavorite = favoriteList.includes(curentProvince);
      var heartIcon = document.querySelector("#heart-icon");
      if (isFavorite){
        heartIcon.style.color = "pink";
      
      }else{
        heartIcon.style.color = "grey";
      }


}