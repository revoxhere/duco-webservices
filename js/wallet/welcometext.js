const welcome_texts = [
    "Welcome back!",
    "Welcome!",
    "Hey there!"
];

/*
    https://game-guide.fr/wp-content/uploads/2020/06/AmongTreesScreenshot5.jpg
    https://i.imgur.com/csou8q3.jpeg

    Using the external url makes the background dark during load time.
*/

const backrounds = [
    "img/yenn-sea-1.jpg",
    "backgrounds/wallet/yenn-mountains-1.jpg",
    "img/AmongTreesScreenshot5.jpg",
    "img/csou8q3.jpeg",
    //"img/halloween1.jpg",
    //"img/halloween2.jpg",
    //"img/halloween3.jpg"
];

function showcredits() {
    $("html").addClass("is-clipped");
    $("#modal").addClass("is-active");
};

// background

let img = backrounds[Math.random() * backrounds.length | 0];

document.querySelector("#background").setAttribute("data-background", img);

// preload background image

let preload = document.createElement('link');
preload.rel = "preload";
preload.as = "image";
preload.href = img;
document.head.appendChild(preload);

loadImages();
