
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
var modalTable = document.querySelector('.table');


function openMap(){
    modalMap.style.display = 'flex';

    
}
function closeMap(){
  modalTable.style.display='none';
  modalMap.style.display ='none';

}

 document.querySelectorAll(".province").forEach((province) => {
  // province.addEventListener("click",openMap());
  province.addEventListener("click",()=>{
    modalTable.style.display = 'flex';
    modalMap.style.display = 'flex';

    const provinceId = province.getAttribute("id");
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








