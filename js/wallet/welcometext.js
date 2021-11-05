const welcome_texts = [
    "Welcome back!",
    "Welcome!",
    "Hey there!"
];
$("#welcometext").text(welcome_texts[Math.random() * welcome_texts.length | 0]);


const backrounds = [
    "img/yenn-sea-1.jpg",

];
$("#background").css("background-image", `url(${backrounds[Math.random() * backrounds.length | 0]})`);


function showcredits() {
    $("html").addClass("is-clipped");
    $("#modal").addClass("is-active");
};
