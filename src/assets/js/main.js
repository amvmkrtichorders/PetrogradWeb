
function toggleClassOnScroll(className){
    const elements = document.querySelectorAll(`.${className}`);
    if(!elements.length) return;

    elements.forEach(el => {
        let counter = 0;
        for(const child of el.children){
            child.style.setProperty('--anim-delay', `${counter * .1}s`);
            counter++;
        }

        const {scrollTop, clientHeight} = document.documentElement;

        const topElementToTopViewport = el.getBoundingClientRect().top;

        if(scrollTop > (scrollTop + topElementToTopViewport).toFixed() - clientHeight){
            el.classList.add('is-visible');
        }
    });
}

toggleClassOnScroll('section-bg-text');

window.addEventListener('scroll', function (){
    toggleClassOnScroll('section-bg-text');
});

function closeMenu(){
    document.body.classList.remove('mobile-menu-open');
}

document.body.addEventListener('click', e => {
    if(!e.target.closest('.mobile-nav') && !e.target.closest('.menu-toggle')){
        closeMenu()
    }
})

// mobile menu toggle
const menuTogglers = document.querySelectorAll('.menu-toggle');
if(menuTogglers.length) {
    menuTogglers.forEach(menuToggler => {
        toggleMobileMenu(menuToggler)
    })
}


function toggleMobileMenu(menuToggler, button){
    menuToggler.addEventListener('click', function (e) {
        e.preventDefault();
        document.body.classList.toggle('mobile-menu-open');
    });
}

// phone input mask
const phone = document.getElementById('inputPhone');

if(phone) {
    phone.addEventListener('input', function(e) {
        phone.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, ''); // Remove all non-numeric characters
            value = value.substring(0, 10); // Ensure max of 10 digits

            // Apply mask
            if (value.length > 0) {
                value = '+7 ' + value;
                if (value.length > 6) {
                    value = value.slice(0, 6) + '-' + value.slice(6);
                }
                if (value.length > 10) {
                    value = value.slice(0, 10) + '-' + value.slice(10);
                }
                if (value.length > 13) {
                    value = value.slice(0, 13) + '-' + value.slice(13);
                }
            }

            e.target.value = value;
        });
    });
}

// clone text
function cloneText(text){
    const elements = document.querySelectorAll('.text-repeat');
    if(!elements?.length) return;

    elements.forEach(element => {
        let content = '';
        const count = element.dataset.count ? element.dataset.count : 5;
        for(let i = 0; i < count; i++){
            content += `<span>${text}</span>`
        }
        element.innerHTML = content;
    })
}
// cloneText("Видео");

// let currentIndex = 1;
// document.addEventListener('wheel', (event) => {
//     const container = document.querySelector('.scroll-effect');
//     const sections = container.querySelectorAll('.section');
//     const sectionHeight = sections[0].offsetHeight;
//     const currentScroll = container.scrollTop;
//     let targetSection;
//     const rect = container.getBoundingClientRect();
//
//     if (event.deltaY > 0) {
//         currentIndex = currentIndex < sections.length ? currentIndex + 1 : currentIndex;
//         targetSection = Math.min(sections.length - 1, Math.floor(currentScroll / sectionHeight) + 1);
//     } else {
//         currentIndex = currentIndex > 1 ? currentIndex - 1 : currentIndex;
//         targetSection = Math.max(0, Math.floor(currentScroll / sectionHeight) - 1);
//     }
//     console.log(currentIndex)
//     sections[currentIndex - 1].classList.add('is-visible');
//
//     if(currentIndex === 2 || currentIndex === 3){
//         document.body.classList.add('transparent-section-in');
//     }else{
//         document.body.classList.remove('transparent-section-in');
//     }
//
//     container.scrollTo({
//         top: targetSection * sectionHeight,
//         behavior: 'smooth'
//     });
//
//     if(currentScroll > 0){
//         cloneText("Велосипед")
//
//     }
//
//     if(currentScroll === 0){
//         cloneText("Машина");
//     }
// });

jQuery(function($){
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    function slick_handle_wheel_event(e, slick_instance, slick_is_animating) {
        if (!slick_is_animating) {
            const direction = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

            if (direction > 0) {
                slick_instance.slick("slickNext");
            } else {
                slick_instance.slick("slickPrev");
            }
        }
    }

    const slick_handle_wheel_event_debounced = debounce(
        slick_handle_wheel_event
        , 100, true
    );

    const scrollSlider = $('#scrollSlider')
    if(typeof $.fn.slick === "function"){
        scrollSlider.slick({
            verticalSwiping: true,
            vertical: true,
            infinite: false,
            arrows: false,
            speed: 500
        })

        scrollSlider.on("wheel", function(e) {
            slick_handle_wheel_event_debounced(e.originalEvent, scrollSlider, false);
        });
        scrollSlider.on("beforeChange", function(event, slick, currentSlide, next) {
            slick.$slides[next].classList.add('is-visible')

            if(slick.$slides[next].dataset.label){
                cloneText(slick.$slides[next].dataset.label);
            }

            if(next === 1 || next === 2){
                document.body.classList.add('transparent-section-in');
            }else{
                document.body.classList.remove('transparent-section-in');
            }

            if (slick.$slides.length-1 === next) {
                document.body.classList.add('last-slide');
            }else{
                document.body.classList.remove('last-slide');
            }
        });
    }
})


// alert(`Your screen resolution is: ${window.innerWidth} X ${window.innerHeight}`)


