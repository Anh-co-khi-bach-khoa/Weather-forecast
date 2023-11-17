
const modalSearch = document.querySelector('#modal-Search'),
    closeSearch = document.querySelector('#close-Search'),
    btnMap = document.querySelector('#Map-button'),
    modalInnerSearch = document.querySelector('modal_inner-Search');

const modalFavorite = document.querySelector('#modal-Favorite'),
    closeFavorite = document.querySelector('#close-Favorite'),
    btnFavorite = document.querySelector('#Favorite-button'),
    modalInner = document.querySelector('modal_inner-Favorite');



window.onload = () => {
    let tl = gsap.timeline({
        duration: 0.5,
        ease:"power4.out"
    })

    let e = gsap.timeline();

    e.to(btnMap,{
        display:"none"
    })

    e.to(modalSearch,{
        display:"flex"
    })
    
    e.from(modalSearch,{
        duration: 0.45,
        backgroundColor: "rgba(0, 0, 0, 0)",
        ease:"expo.out"
    },0.4)
    e.from(modalInnerSearch,{
        duration:0.5,
        opacity: 0,
        ease: "power4.out"
    },1.3)

    e.reverse();
    btnMap.onclick =() => {
        e.restart();
        closeSearch.onclick = () => {
            e.reverse();
        }
    }

    let k = gsap.timeline();

    k.to(btnFavorite,{
        display:"none"
    })
    k.to(modalFavorite,{
        display:"flex"
    })
    k.to(btnFavorite,{
        display:"none"
    })
    k.from(modalFavorite,{
        duration: 0.45,
        backgroundColor: "rgba(0, 0, 0, 0)",
        ease:"expo.out"
    },0.4)
    k.from(modalInner,{
        duration:0.5,
        opacity: 0,
        ease: "power4.out"
    },1.3)
    
    k.reverse();
    btnFavorite.onclick =() => {
        k.restart();
        closeFavorite.onclick = () => {
            k.reverse();
        }
    }

}








