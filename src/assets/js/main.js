
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
cloneText("Видео");

document.addEventListener('wheel', (event) => {
    const container = document.querySelector('.scroll-effect');
    const sections = container.querySelectorAll('.section');
    const sectionHeight = sections[0].offsetHeight;
    const currentScroll = container.scrollTop;
    const top = container.querySelector("#top");
    let targetSection;
    const rect = container.getBoundingClientRect();
    const topRect = top.getBoundingClientRect();
    console.log(currentScroll);

    if(rect.top < 0){
        document.body.classList.add("enable-scroll-effect");
        if (event.deltaY > 0) {
            targetSection = Math.min(sections.length - 1, Math.floor(currentScroll / sectionHeight) + 1);
        } else {
            targetSection = Math.max(0, Math.floor(currentScroll / sectionHeight) - 1);
        }
        console.log(targetSection)
        container.scrollTo({
            top: targetSection * sectionHeight,
            behavior: 'smooth'
        });

        if(currentScroll > 0){
            cloneText("Велосипед")

        }

        // event.preventDefault();
    }else{
        document.body.classList.remove("enable-scroll-effect");
    }
});


// alert(`Your screen resolution is: ${window.innerWidth} X ${window.innerHeight}`)


