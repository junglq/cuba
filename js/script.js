$(document).ready(function () {
    // Slider 
    $(".photo__slider").slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        fade: true,
        autoplay: true,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="images/arrow-left.svg" alt=""></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="images/arrow-right.svg" alt=""></button>'
    });


    // Burger menu
    $('.header__burger').on('click', function (event) {
        event.preventDefault();
        $('.header__burger,.header__menu').toggleClass('active');
        $('body').toggleClass('lock');
    })

    // Fixed Header
    let scrollOffset = $(window).scrollTop();
    let intro = $('.intro');
    let introH = intro.innerHeight();
    console.log(introH);

    checkscroll(scrollOffset, introH);

    $(window).on('scroll resize', function () {
        scrollOffset = $(this).scrollTop();
        introH = intro.innerHeight();
        checkscroll(scrollOffset, introH);
    })

    function checkscroll(scrollOffset, introH) {
        if (scrollOffset > introH + 1) {
            $('.header').addClass('active');
        } else {
            $('.header').removeClass('active');
        }
    }

    // Smooth scroll
    $("[data-scroll]").on("click", function (event) {
        event.preventDefault();

        let elementId = $(this).data("scroll");
        let elementOffset = $(elementId).offset().top;

        $('.nav__link').not($(this)).removeClass('active');
        $(this).addClass('active');

        $("html,body").animate({
            scrollTop: elementOffset - 59
        }, 1000)

    })

    // Accordion
    // $('.footer__item-title').click(function () {
    //     if ($('.footer__item').hasClass('one')) {
    //         $('.footer__item-title').not($(this)).removeClass('active');
    //         $('.footer__item-list').not($(this).next()).slideUp(300);
    //     }
    //     $(this).toggleClass('active').next().slideToggle(300);
    // })

    // Animation items
    const animItems = document.querySelectorAll('.anim-items'); // Массив анимируемых элементов

    if (animItems.length > 0) { // Проверка на наличие анимируемых элементов
        window.addEventListener('scroll', animOnScroll); // Событие "скролл"
        function animOnScroll() { // Функция анимации при скролле
            for (let index = 0; index < animItems.length; index++) { // Цикл на выборку анимируемых элементов
                const animItem = animItems[index]; // Анимируемый элемент
                const animItemHeight = animItem.offsetHeight; // Высота анимируемого элемента
                const animItemOffset = offset(animItem).top; // Расстояние анимируемого элемента к верху документа
                const animStart = 4; // Старт анимации

                let animItemPoint = window.innerHeight - animItemHeight / animStart; // Точка начала анимации
                if (animItemHeight > window.innerHeight) { // Если высота элемента больше высоты окна
                    animItemPoint = window.innerHeight - window.innerHeight / animStart;
                }
                console.log(pageYOffset);
                console.log(animItemOffset);

                console.log(animItemOffset + animItemHeight);
                // прокрутили больше чем позиция элемента минус точка старта и прокрутили меньше чем позиция элемента плюс его высота
                if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                    animItem.classList.add('active');
                } else {
                    if (!animItem.classList.contains('anim-no-hide')) {
                        animItem.classList.remove('active');
                    }
                }
            }
        }
        function offset(el) {
            const rect = el.getBoundingClientRect(),
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
        }
        setTimeout(() => {
            animOnScroll();
        }, 300);
    }
})