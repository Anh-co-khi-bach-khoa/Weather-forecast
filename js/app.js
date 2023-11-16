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

function openMap(){
    modalMap.style.display = 'flex';
}
function closeMap(){
  modalMap.style.display ='none';
}

 document.querySelectorAll(".province").forEach((province) => {
  province.addEventListener("click",openMap);
  modalMapclose.addEventListener("click",closeMap);
  modalMap.addEventListener("click", function(e){
    if (e.target == e.currentTarget){
      closeMap()
    }
  });

 });




document.querySelectorAll(".province").forEach((province) => {
    province.addEventListener("click", () => {
      const provinceId = province.getAttribute("id");
      alert("ID:" + provinceId);
    });
  });

