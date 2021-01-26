let kvadrat = document.querySelector('.kvadrat');
let block = document.querySelector('.block');
var kvadrat_style
var str_live = document.querySelector('.live')
var live = 3;
var sc = document.querySelector('.score')
var hero_up = false;
var hero_down = false
var hero_x = 0;

var lock = true

var score = 0;
sc.innerText = `Очки: ${score}`

var block_top = 50;
var block_bottom = 50;
var block_x = 0;
var prv = 0

/* Аnimation start */
block.animate(
    //анимауия
    [
        { left: `calc(100vw - 10px)` },
        { left: `0vw` }
    ],
    //опции
    {
        duration: 3000
    }
)
block.animate(
    //анимауия
    [
        { borderBottom: `${50}px solid black`, borderTop: `${50}px solid black`, height: `150px` },
        { borderBottom: `${block_bottom}px solid red`, borderTop: `${block_top}px solid red`, height: `${250 - block_top - block_bottom}px` }
    ],
    //опции
    {
        duration: 2500
    }
)
/* Animation end */

document.addEventListener('keydown', keydown);
document.addEventListener('keyup', keyup);

function rnd(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}

function keydown(e) {
    if (lock) {
        if (e.keyCode == 38) {
            hero_up = true;
        }
        if (e.keyCode == 40) {
            hero_down = true;
        }
    }
    // console.log(kvadrat.style.bottom)
}
function keyup(e) {
    if (e.keyCode == 38) {
        hero_up = false;
    }
    if (e.keyCode == 40) {
        hero_down = false;
    }
}
function game() {

    block_x = parseInt(window.getComputedStyle(block).getPropertyValue('left'))
    kvadrat_style = parseInt(window.getComputedStyle(kvadrat).getPropertyValue('bottom'))
    //console.log(block_x)

    if (hero_x >= 225) {
        hero_x = 224
    }
    if (hero_up) {
        hero_x++
        kvadrat.style.bottom = `${hero_x}px`
    }
    if (hero_x <= 0) {
        hero_x = 1
    }
    if (hero_down) {
        hero_x--
        kvadrat.style.bottom = `${hero_x}px`
    }

    if (block_x >= window.innerWidth / 2) { prv = 0 }
    if (block_x <= 50 && block_x > 5 && prv == 0) {
        lock = false
        hero_up = false
        hero_down = false
        //console.log("kvadrat = "+kvadrat_style)
        prv++
        block.animate(
            //анимауия
            [
                { left: `50px` },
                { left: `0vw` }
            ],
            //опции
            {
                duration: 800
            }
        )
        if (kvadrat_style < block_bottom || kvadrat_style > 250 - block_top - 25) {
            block.animate(
                //анимауия
                [
                    { left: `50px` },
                    { left: `0vw`, backgroundColor: `white` }
                ],
                //опции
                {
                    duration: 800
                }
            )
            live--
            score--
            console.log(live)
            if (live == 2) {
                str_live.style.width = `${60}px`
            }
            if (live == 1) {
                str_live.style.width = `${30}px`
            }
            if (live < 1) {
                score++
                alert(`Game Over ваш счет ${score}`);
                location.reload()
            }
        }
    }

    if (block_x <= 5 && block_x > 2) {
        prv = 0
    }
    if (block_x < 2 && prv == 0) {
        lock = true
        prv++
        score++
        sc.innerText = `Очки: ${score}`
        block_bottom = rnd(0, 220)
        block.style.borderBottom = `${block_bottom}px solid red`
        //console.log("block_bottom = "+block_bottom)
        block_top = rnd(0, (220 - block_bottom))
        block.style.borderTop = `${block_top}px solid red`
        //console.log("block_top = "+block_top)
        block.style.height = `${250 - block_top - block_bottom}px`
        /* Аnimation start */
        block.animate(
            //анимауия
            [
                { left: `calc(100vw - 10px)` },
                { left: `0vw` }
            ],
            //опции
            {
                duration: 3000
            }
        )
        block.animate(
            //анимауия
            [
                { borderBottom: `${50}px solid black`, borderTop: `${50}px solid black`, height: `150px` },
                { borderBottom: `${block_bottom}px solid red`, borderTop: `${block_top}px solid red`, height: `${250 - block_top - block_bottom}px` }
            ],
            //опции
            {
                duration: 2500
            }
        )
        /* Animation end */
    }


}

setInterval(game, 10);