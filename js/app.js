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

 document.querySelectorAll(".province").forEach((province) => {

  // var modalProvince = document.querySelector('#Detail-Province')
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

        svgObject.addEventListener('load', function() {
          // Lấy document của thẻ object
          const svgDocument = svgObject.contentDocument;
        
          // Kiểm tra xem contentDocument có tồn tại không
          if (!svgDocument) {
            console.error('Content document is null or undefined.');
            return;
          }
        

          const paths = svgDocument.getElementsByClassName('district');

        
          // Lặp qua từng path và thêm lắng nghe sự kiện mouseover
          for (const path of paths) {
            path.style.cursor= "pointer";
            path.addEventListener('click', function() {
              alert(path.getAttribute("id"));
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