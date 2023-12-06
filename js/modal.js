var btnOpenSearch = document.querySelector('#Map-button');
var modal1 = document.querySelector('.modal-Search');

var iconCloseSearch = document.querySelector('#close-Search');

function toggleModal1(e){
    // console.log(e.currentTarget);
    modal1.classList.toggle('hidden');
}
function showModal1(){
    document.getElementById("btn1").style.display ='none';
    document.getElementById("svg1").style.display ='none';
    document.getElementById("Map-button").style.display ='none';
}
function closeModal1(){
    document.getElementById("btn1").style.display ='block';
    document.getElementById("svg1").style.display ='block';
    document.getElementById("Map-button").style.display ='block';

    
}

btnOpenSearch.addEventListener('click', toggleModal1);
btnOpenSearch.addEventListener('click', showModal1);
iconCloseSearch.addEventListener('click',toggleModal1);
iconCloseSearch.addEventListener('click',closeModal1);



var btnOpenFavorite = document.querySelector('#Favorite-button');
var modal2 = document.querySelector('.modal-Favorite');
var iconCloseFavorite = document.querySelector('#close-Favorite');

function toggleModal2(e){
    console.log(e.currentTarget);

    modal2.classList.toggle('hidden');
}
function showModal2(){
    document.getElementById("btn2").style.display ='none';
    document.getElementById("svg2").style.display ='none';
    document.getElementById("Favorite-button").style.display ='none';
}
function closeModal2(){
    document.getElementById("btn2").style.display ='block';
    document.getElementById("svg2").style.display ='block';
    document.getElementById("Favorite-button").style.display ='block';
}

btnOpenFavorite.addEventListener('click', toggleModal2);
btnOpenFavorite.addEventListener('click', showModal2);
iconCloseFavorite.addEventListener('click',toggleModal2);
iconCloseFavorite.addEventListener('click',closeModal2);


