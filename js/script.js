//----------Search form---------//
let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
}



//---------------Hide navbar-----------------//

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    

}

//-------Remove onScroll------//
window.onscroll = () => {
    searchForm.classList.remove('active');
    navbar.classList.remove('active');
}

let filterBtn = document.querySelectorAll('.filter-buttons .buttons');
let filterItem = document.querySelectorAll('.products .box-container .box');

filterBtn.forEach(button => {
    button.onclick = () =>{
        filterBtn.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        let dataFilter = button.getAttribute('data-filter');

        filterItem.forEach(item =>{

            item.classList.remove('active');
            item.classList.add('hide');

            if(item.getAttribute('data-item') == dataFilter || dataFilter =='all'){

                item.classList.remove('hide');
                item.classList.add('active');
            }
        });
    };
}

);

//--------------------Swiper JS ----------------------//
//-----For home-----//
var swiper = new Swiper(".home-slider", {
    
    centerSlides:true,
    loop:true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
//-----For featured----//

var swiper = new Swiper(".featured-slider", {
    
    centerSlides:true,
    loop:true,
    spaceBetween:20,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
        
      },
      768: {
        slidesPerView: 2,
      
      },
      1024: {
        slidesPerView: 3,
        
      },
    },
  });
  //-----Slider for Reviews---//
  var swiper = new Swiper(".review-slide", {
    
    centerSlides:true,
    loop:true,
    spaceBetween:20,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
   
    breakpoints: {
      640: {
        slidesPerView: 1,
        
      },
      768: {
        slidesPerView: 2,
      
      },
      
    },
  });