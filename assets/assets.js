const totalCards = 14;
let cards = [];
let selectedCards = [];
let valuesUsed = [];
let currentMove  = 0;

let cardTemplate = '<div class="card"><div class="back"></div><div class="face"></div></div>';

let imagePaths = [
    './images/61WWQKnYD3L._AC_UY1000_.jpg',
    './images/foot_protection_ppe.jpg',
    './images/hand.jpg',
    './images/head.jpg',
    './images/overol.jpg',
    './images/respiratory.jpg',
    './images/shutterstock_277843652.jpg'
];

function activate(e) {
    if (currentMove < 2) {
        e.target.classList.add('active');

        if (selectedCards[0] || selectedCards[0] !== e.target) {
            selectedCards.push(e.target);

            if (++currentMove == 2) {
                if (selectedCards[0].querySelectorAll('.face')[0].innerHTML == selectedCards[1].querySelectorAll('.face')[0].innerHTML) {
                    selectedCards = [];
                    currentMove = 0;

                } else {
                    setTimeout(() => {
                        selectedCards[0].classList.remove('active');
                        selectedCards[1].classList.remove('active');
                        selectedCards = [];
                        currentMove = 0;
                    }, 600);
                }
            }
        }
    }
}

function randomValue() {
    let rnd = Math.floor(Math.random() * (totalCards * 0.5));
    let values = valuesUsed.filter(value => value === rnd);
    if (values.length < 2) {
        valuesUsed.push(rnd);
    } else {
        randomValue();
    }
}

for (let i = 0; i < totalCards; i++) {
    let div = document.createElement('div');
    div.innerHTML = cardTemplate;
    cards.push(div);
    document.querySelector('#game').append(cards[i]);
    randomValue();

    
    let imgIndex = valuesUsed[i];
    cards[i].querySelectorAll('.face')[0].innerHTML = `<img src="${imagePaths[imgIndex]}" alt="Card image">`;

    cards[i].querySelectorAll('.card')[0].addEventListener('click', activate);
}