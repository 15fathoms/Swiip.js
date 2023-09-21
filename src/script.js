function animateHeader() {
    let text = [...document.querySelector('h1').textContent];
    let spans = [];
    document.querySelector('h1').textContent = '';
    text.forEach((letter) => {
        let span = document.createElement('span');
        span.textContent = letter;
        spans.push(span);
        document.querySelector('h1').appendChild(span);
    });

    spans.forEach((span, index) => {
        setTimeout(() => {
            span.classList.add('animated');
        }, 100 * index);
    });
}

function animateSectionTitle(selector) {
    let position = document.querySelector(selector).getBoundingClientRect();
    if(document.querySelector(selector).innerHTML.includes('<br>')) console.log('br');
    if(document.querySelector(selector).classList.contains('animated')) return;
    if (position.top < window.innerHeight * 0.5 && position.top > 0 && position.bottom >= 0) {
        document.querySelector(selector).classList.add('animated');
        let title = [...document.querySelector(selector).textContent];
        let spans = [];
        document.querySelector(selector).textContent = '';
        title.forEach((letter) => {
            let span = document.createElement('span');
            span.textContent = letter;
            spans.push(span);
            document.querySelector(selector).appendChild(span);
        }
        );

        spans.forEach((span, index) => {
            setTimeout(() => {
                span.classList.add('animated');
            }, 100 * index);
        }
        );
    }

}

function animateSectionTitleWithBr(selector) {
    if(document.querySelector(selector).classList.contains('animated')) return;
    if(!document.querySelector(selector).innerHTML.includes('<br>')) return;
    let element = document.querySelector(selector);
    let br = element.innerHTML.split('<br>');
    let firstPart = br[0];
    let secondPart = br[1];
    console.log(firstPart, secondPart);
    let arrayToAnimate = [...firstPart, '<br>', ...secondPart];
    let position = element.getBoundingClientRect();
    if (position.top < window.innerHeight * 0.5 && position.top > 0 && position.bottom >= 0) {
        element.classList.add('animated');
        let spans = [];
        element.innerHTML = '';
        arrayToAnimate.forEach((letter) => {
            let span = document.createElement('span');
            span.innerHTML = letter;
            spans.push(span);
            element.appendChild(span);
        });

        spans.forEach((span, index) => {
            setTimeout(() => {
                span.classList.add('animated');
            }, 100 * index);
        });
    }
}

    

function animateSectionElements(section) {
    let items = section.querySelectorAll('.item');
    items.forEach(elm => {
        let title = elm.querySelector('h3');
        let paragraph = elm.querySelector('p');

        titlePositon = title.getBoundingClientRect();
        paragraphPosition = paragraph.getBoundingClientRect();

        if (titlePositon.top < window.innerHeight * 0.5 && titlePositon.bottom >= 0) {
            title.classList.add("animated");
        }
        if (paragraphPosition.top < window.innerHeight * 0.5 && paragraphPosition.bottom >= 0) {
            paragraph.classList.add("animated");
        }
    })
}

function animateSectionMultipleElements(section) {
    let items = section.querySelectorAll('.item');
    items.forEach(elm => {
        let title = elm.querySelectorAll('h3');
        let paragraph = elm.querySelectorAll('p');

        title.forEach((title) => {
            titlePositon = title.getBoundingClientRect();
            if (titlePositon.top < window.innerHeight * 0.5 && titlePositon.bottom >= 0) {
                title.classList.add("animated");
            }
        })

        paragraph.forEach((paragraph) => {
            paragraphPosition = paragraph.getBoundingClientRect();
            if (paragraphPosition.top < window.innerHeight * 0.5 && paragraphPosition.bottom >= 0) {
                paragraph.classList.add("animated");
            }
        })
    })
}

function animateTitles(selector){
    let titles = document.querySelectorAll(`${selector} h3`);
    titles.forEach((title) => {
        let titlePositon = title.getBoundingClientRect();
        if (titlePositon.top < window.innerHeight * 0.5 && titlePositon.bottom >= 0) {
            title.classList.add("animated");
        }
    })
}

animateHeader();
animateSectionTitle('.exemple-1 h2');
animateSectionTitleWithBr('.exemple-2 h2');
animateSectionElements(document.querySelector('.exemple-1'));
animateSectionMultipleElements(document.querySelector('.exemple-2'));
window.onscroll = () => {
    animateSectionElements(document.querySelector('.exemple-1'));
}
window.addEventListener('scroll', (e) => {
    let distance = window.scrollY;
    animateSectionElements(document.querySelector('.exemple-1'));
    animateSectionMultipleElements(document.querySelector('.exemple-2'));
    animateSectionTitle('.exemple-1 h2');
    animateSectionTitleWithBr('.exemple-2 h2');
    animateTitles('.exemples');
})

document.querySelector('.basic-exemple').Swiip();
document.querySelector('.buttons-exemple').Swiip({
    prevBtn : document.querySelector('.prev'),
    nextBtn : document.querySelector('.next')
});

document.querySelector('.advanced').Swiip({
    slidesVisible : 3,
    slidesToScroll : 1,
    autoPlay : true,
    autoplaySpeed : 2000,
    gap: 2,
    responsive : [
        {
            breakpoint: 1024,
            slidesVisible: 2,
            slidesToScroll: 2,
            gap: 2,
        },
        {
            breakpoint: 768,
            slidesVisible: 1,
            slidesToScroll: 1,
            gap: 1,
            autoplay: false,
        }
    ]
});
