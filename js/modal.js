var btnOpenSearch = document.querySelector('#Map-button');
var modal1 = document.querySelector('.modal-Search');

var iconCloseSearch = document.querySelector('#close-Search');

function toggleModal1(e){
    // console.log(e.currentTarget);
    modal1.classList.toggle('hidden');
}
btnOpenSearch.addEventListener('click', function () {
    toggleModal1();
    showModalSearch(modal1);
  });

  iconCloseSearch.addEventListener('click', function () {
    toggleModal1();
    closeModalSearch(modal1);
  });

  function showModalSearch(modal) {
    modal.style.display = 'flex';
    document.getElementById("btn-Search").style.display ='none';
    document.getElementById("svg1").style.display ='none';
    document.getElementById("Map-button").style.display ='none';
    modal.style.animation = 'leftBtnFadeIn 0.3s ease-in-out';
  }

  function closeModalSearch(modal) {
    modal.style.animation = 'leftBtnFadeOut 0.3s ease-in-out';
    setTimeout(function () {
      modal.style.display = 'none';
      document.getElementById("btn-Search").style.display ='block';
    document.getElementById("svg1").style.display ='block';
    document.getElementById("Map-button").style.display ='block';
    }, 300);
    
  }

// btnOpenSearch.addEventListener('click', toggleModal1);
// btnOpenSearch.addEventListener('click', showModal1);
// iconCloseSearch.addEventListener('click',toggleModal1);
// iconCloseSearch.addEventListener('click',closeModal1);


var btnOpenFavorite = document.querySelector('#Favorite-button');
var modal2 = document.querySelector('.modal-Favorite');
var iconCloseFavorite = document.querySelector('#close-Favorite');

function toggleModal2(e){
    // console.log(e.currentTarget);

    modal2.classList.toggle('hidden');
}
btnOpenFavorite.addEventListener('click', function () {
    toggleModal2();
    showModalFavorite(modal2);
  });

  iconCloseFavorite.addEventListener('click', function () {
    toggleModal2();
    closeModalFavorite(modal2);
  });

  function showModalFavorite(modal) {
    modal.style.display = 'flex';
    document.getElementById("btn-Favorite").style.display ='none';
    document.getElementById("svg2").style.display ='none';
    document.getElementById("Favorite-button").style.display ='none';
    modal.style.animation = 'leftBtnFadeIn 0.3s ease-in-out';

  }

  function closeModalFavorite(modal) {
    modal.style.animation = 'leftBtnFadeOut 0.3s ease-in-out';
    setTimeout(function () {
      modal.style.display = 'none';
    document.getElementById("btn-Favorite").style.display ='block';
    document.getElementById("svg2").style.display ='block';
    document.getElementById("Favorite-button").style.display ='block';
    }, 300);
    
  }

var btnOpenCalendar = document.querySelector('#btnCalendar');
var modalCalendar = document.querySelector('.calendar-outer-container');
var iconCloseCalendar = document.querySelector('#close-calendar');
var modalToday = document.querySelector('.today-outer-container');

btnOpenCalendar.addEventListener('click',modal3Handler);

function modal3Handler(){
    if (modalCalendar.style.display === 'none' || modalCalendar.style.display === '') {
        modalCalendar.style.animation = 'calendarFadeIn 0.3s ease-out forwards';
        modalCalendar.style.display = 'block';
    }
    else 
    {
        modalCalendar.style.animation = 'calendarFadeOut 0.3s ease-in-out';
        modalToday.style.animation = 'leftBtnFadeOut 0.3s ease-in-out';

        setTimeout(function () {
            modalCalendar.style.display = 'none';
            modalToday.style.display = 'none';

          }, 300);
    }
}


var btnOpenChart = document.querySelector("#chart-icon");
var modalChart = document.querySelector('.chart-outer-container');
btnOpenChart.addEventListener('click',modal4Handler);
function modal4Handler(){
    if (modalChart.style.display === 'none' || modalChart.style.display === '') 
    {   modalChart.style.animation ='fadeIn 0.3s ease-out forwards';
    setTimeout(function () {
        document.querySelector('.chart-wrapper').style.animation = 'chartFadeIn 0.3s ease-out forwards';
        document.querySelector('.chart-wrapper').style.display = 'block';
      }, 300);
      modalChart.style.display = 'block';
    // document.querySelector('.chart-wrapper').style.display = 'block'
}
    else {
        modalChart.style.animation = 'leftBtnFadeOut 0.3s ease-in-out';
    setTimeout(function () {
        modalChart.style.display = 'none';
      }, 300);
    }

}


