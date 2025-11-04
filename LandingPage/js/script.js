var menu = document.querySelector('.burger-menu');
var navbar = document.querySelector('.menu__list');
var close_menu = document.querySelector('.menu__navigation')
var uncover_arrow = document.querySelectorAll('.arrow-down');
var process_block_description = document.querySelector('.process__block__description');
var prices = document.querySelector('.prices');

menu.addEventListener('click', function() {
    navbar.classList.add('active');
  })
  
  close_menu.addEventListener('click', function(event) {
    event.stopPropagation(); 
    navbar.classList.remove('active');
  });
  
document.querySelectorAll('.menu__link').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        const navbar = document.querySelector('.menu__list');

        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });

            setTimeout(() => {
                navbar.classList.remove('active');
            }, 300);
        }
    });
});



  uncover_arrow.forEach(arrow => {
    arrow.addEventListener('click', (event) => {
      var parentBlock = arrow.closest('.process__block');
      var process_block_description = parentBlock.querySelector('.process__block__description');
      process_block_description.classList.toggle('active');
      arrow.classList.toggle('active');
      if(process_block_description.classList.contains('active') ) {
        const descriptionHeight = process_block_description.offsetHeight;
        parentBlock.style.marginBottom = `${descriptionHeight + 20}px`;
      } else {
        parentBlock.style.marginBottom = '0px';
      }

    });
  });
 

  if (prices) {
    var prices_block_label = prices.querySelector('.label__all__prices');
    var label_rolled_up = prices.querySelector('.label__rolled_up');
    var prices_block_firstcard = prices.querySelector('.price__card.first__card');
    var prices_block_thirdcard = prices.querySelector('.price__card.third__card');

    function toggleClasses() {
        prices_block_label?.classList.toggle('active');
        label_rolled_up?.classList.toggle('active');
        prices_block_firstcard?.classList.toggle('active');
        prices_block_thirdcard?.classList.toggle('active');
    }

    if (prices_block_label) {
        prices_block_label.addEventListener('click', function(event) {
            event.stopPropagation();
            toggleClasses();
        });
    }

    if (label_rolled_up) {
        label_rolled_up.addEventListener('click', function(event) {
            event.stopPropagation();
            toggleClasses();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.carPark__card');
  const prevButton = document.querySelector('.carPark__arrow--left');
  const nextButton = document.querySelector('.carPark__arrow--right');
  const labels = document.querySelectorAll('.carPark__category');
  const frame = document.querySelector('.carPark__list');    
  const paginationItems = document.querySelectorAll('.pagination__item');
  let currentIndex = 0;
  let startX = 0;
  let endX = 0;

  function showCard(index) {
    cards.forEach(card => card.classList.remove('active'));
    cards[index].classList.add('active');
    labels.forEach(label => label.classList.remove('active'));
    labels[index].classList.add('active');
    paginationItems.forEach(item => item.classList.remove('active'));
    paginationItems[index].classList.add('active');
  }

  //swipe
  frame.addEventListener('touchmove', (event) => {
     event.preventDefault();
    startX = event.touches[0].clientX;
  });

   frame.addEventListener('touchstart', (event) => {
     event.preventDefault();
    endX = event.touches[0].clientX;
  });

  frame.addEventListener('touchend', () => {
    if (startX - endX > 50) {
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    } else if (endX - startX > 50) {
      currentIndex = (currentIndex + 1)%cards.length;
    }
    showCard(currentIndex);
  });

  labels.forEach((label,index) => {
    label.addEventListener('click', () => {
      requestAnimationFrame( () => {
        currentIndex = index;
        showCard(currentIndex);
      });
    });
  });


  prevButton.addEventListener('click', () =>{
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    showCard(currentIndex);
  });
  nextButton.addEventListener('click', () =>{
    currentIndex = (currentIndex + 1 ) % cards.length;
    showCard(currentIndex);
  });

  showCard(currentIndex);
});

/*SWIPER*/

new Swiper('.reviews-slider', {
  
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return `<span class="${className}" style="margin: 0 10px;"></span>`;
    },
  },

  slidesPerView: 1.3,

  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 1.3,
    },
     1920: {
      slidesPerView: 3,
    }
  },

  spaceBetween: 30,

  
});

const townsByRegion = {
    "br": ["Брест", "Барановичи", "Пинск"],
    "vt": ["Витебск", "Орша", "Полоцк"],
    "gm": ["Гомель", "Речица", "Житковичи"],
    "gr": ["Гродно", "Лида", "Слоним"],
    "m": ["Минск", "Заславль", "Солигорск"],
    "mg": ["Могилев", "Бобруйск", "Горки"]
};

const regionSelect = document.getElementById("region");
const townSelect = document.getElementById("town");

regionSelect.addEventListener("change", function() {
    const selectedRegion = this.value;
    townSelect.innerHTML = ""; 

    if (selectedRegion in townsByRegion) {
        townsByRegion[selectedRegion].forEach(town => {
            const option = document.createElement("option");
            option.value = town.toLowerCase().replace(" ", "-");
            option.textContent = town;
            townSelect.appendChild(option);
        });
    } else {
        const option = document.createElement("option");
        option.value = "";
        option.textContent = "Сначала выберите область";
        townSelect.appendChild(option);
    }
});


function startCountDown(duration) {
  let timer = duration, minutes, seconds;
  const display = document.getElementById("countdown");

  const interval = setInterval(() => {
    minutes = Math.floor(timer / 60);
    seconds = timer % 60;

    display.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (--timer < 0) {
        clearInterval(interval);
    }

  },1000);
}

startCountDown(600);

let form_arrow = document.querySelector(".form-icon-arrow-down")
    form_arrow.addEventListener('click', (event) => {
      var parentBlock = form_arrow.closest('.form__additional');
      var options = parentBlock.querySelector('.additional__services');
      options.classList.toggle('active');
      form_arrow.classList.toggle('active');
});

document.querySelector(".submit__order__button").addEventListener("click", function(event) {
    
    const form = document.querySelector("form");
    const popUp = document.querySelector('.succesful-registration-wrapper');

    if (form.checkValidity()) {
      form.reset(); 
      popUp.classList.add('active');

      setTimeout(() => {
        popUp.classList.remove('active');
      },1500);
    }
        
});



let order_button = document.querySelector('.order-button');
document.querySelectorAll('.order-button').forEach(button => {
  button.addEventListener('click',(event) =>{
  event.preventDefault();
  document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
} );
});

document.querySelectorAll('.navigation_item').forEach(item => {
    item.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        var navbar = document.querySelector('.menu__list');

        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            navbar.classList.remove('active');
        }
    });
});


document.querySelectorAll('.menu__link').forEach(item => {
    item.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
