
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
        let inputValue = e.target.value.replace(/\+\D/g, ''); // Remove all non-numeric characters
        inputValue = inputValue.substring(0, 16); // Ensure max of 16 digits

        if(inputValue.length === 1) inputValue = '+7 ' + inputValue;

        if(inputValue.length === 6 || inputValue.length === 10 || inputValue.length === 13) inputValue = inputValue + '-'

        e.target.value = inputValue;
    });
}

// form validation
const form = document.querySelector('.form')
const submitButton = form.querySelector('[type="submit"]');
const requiredInputs = form.querySelectorAll('input[type="text"]')
submitButton.addEventListener('click', function(e){
    e.preventDefault();
    let errorsCount = requiredInputs.length;
    requiredInputs.forEach(input => {
        const wrap = input.closest('.form-field-wrap');

        if(input.value.length === 0){
            wrap.classList.add('form-field-wrap--error');
        }else{
            wrap.classList.remove('form-field-wrap--error');
            errorsCount--;
        }

        if(errorsCount === 0) {
            form.classList.add('form--submitted')
            form.reset()
        }
    })
});

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


jQuery(function($){
    function debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
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
