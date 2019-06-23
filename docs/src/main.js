var cards = [
    { name: "aquaman", img: "aquaman.jpg" },
    { name: "batman", img: "batman.jpg" },
    { name: "captain america", img: "captain-america.jpg" },
    { name: "fantastic four", img: "fantastic-four.jpg" },
    { name: "flash", img: "flash.jpg" },
    { name: "green arrow", img: "green-arrow.jpg" },
    { name: "green lantern", img: "green-lantern.jpg" },
    { name: "ironman", img: "ironman.jpg" },
    { name: "spiderman", img: "spiderman.jpg" },
    { name: "superman", img: "superman.jpg" },
    { name: "the avengers", img: "the-avengers.jpg" },
    { name: "thor", img: "thor.jpg" },
    { name: "aquaman", img: "aquaman.jpg" },
    { name: "batman", img: "batman.jpg" },
    { name: "captain america", img: "captain-america.jpg" },
    { name: "fantastic four", img: "fantastic-four.jpg" },
    { name: "flash", img: "flash.jpg" },
    { name: "green arrow", img: "green-arrow.jpg" },
    { name: "green lantern", img: "green-lantern.jpg" },
    { name: "ironman", img: "ironman.jpg" },
    { name: "spiderman", img: "spiderman.jpg" },
    { name: "superman", img: "superman.jpg" },
    { name: "the avengers", img: "the-avengers.jpg" },
    { name: "thor", img: "thor.jpg" }
];
var memoryGame = new MemoryGame(cards);

const flipCard = card => {
    let cardSelected = card.children[0];
    let frontCart = cardSelected.classList[0];
    let backCart = card.children[1].classList[0];

    //flips the cards
    cardSelected.classList = backCart;
    card.children[1].classList = frontCart;
};

document.addEventListener("DOMContentLoaded", function(event) {
    var html = "";
    memoryGame.shuffleCards();
    memoryGame.cards.forEach(function(pic) {
        html += '<div class="card" data-card-name="' + pic.name + '">';
        html += '  <div class="back" name="' + pic.img + '"></div>';
        html +=
            '  <div class="front" style="background: url(img/' +
            pic.img +
            ') no-repeat"></div>';
        html += "</div>";
    });

    // Add all the div's to the HTML
    document.querySelector("#memory_board").innerHTML = html;

    // Bind the click event of each element to a function
    document.querySelectorAll(".card").forEach(function(card) {
        card.onclick = function(e) {
            // TODO: write some code here
            if (
                memoryGame.pairsClicked < 2 &&
                memoryGame.pairsGuessed <= 12 &&
                !memoryGame.IsGuessed(card.getAttribute("data-card-name")) &&
                !memoryGame.isSelected(card)
            ) {
                flipCard(card);
                memoryGame.pickedCards.push(card);
                memoryGame.pairsClicked += 1;
                document.querySelector("#pairs_clicked").innerHTML =
                    memoryGame.pairsClicked;
                if (memoryGame.pairsClicked == 2) {
                    let valueCardOne = memoryGame.pickedCards[0].getAttribute(
                        "data-card-name"
                    );
                    let valueCardTwo = memoryGame.pickedCards[1].getAttribute(
                        "data-card-name"
                    );
                    if (memoryGame.checkIfPair(valueCardOne, valueCardTwo)) {
                        if (memoryGame.isFinished()) {
                            document.querySelector("#score").children[2].innerHTML =
                                "YOU WIN!";
                        } else {
                            document.querySelector("#pairs_guessed").innerHTML =
                                memoryGame.pairsGuessed;
                            memoryGame.pairsClicked = 0;
                            memoryGame.pairsCardsGuessed.push(valueCardOne);
                        }
                    } else {
                        memoryGame.pickedCards.forEach(pickedCard => {
                            var matches = document.querySelectorAll(
                                `div[data-card-name='${pickedCard.getAttribute(
                  "data-card-name"
                )}'`
                            );
                            matches.forEach(match => {
                                setTimeout(() => {
                                    if (match.children[0].classList[0] == "front") {
                                        flipCard(match);
                                        memoryGame.pairsClicked = 0;
                                        document.querySelector("#pairs_clicked").innerHTML =
                                            memoryGame.pairsClicked;
                                    }
                                }, 500);
                            });
                        });
                    }
                    memoryGame.pickedCards = [];
                }
            }
        };
    });
});