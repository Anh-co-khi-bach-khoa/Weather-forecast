

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




// function toggleModal(){
//     modal.classList.toggle('hidden')
// }

// document.querySelectorAll(".province").forEach((province) => {
//   province.addEventListener("click",toggleModal);
// });
document.querySelectorAll(".province").forEach((province) => {
    province.addEventListener("click", () => {
      const provinceId = province.getAttribute("id");
      alert("ID:" + provinceId);
    });
  });

