$(document).ready(function () {
    start();
});

function start() {
    /////////////
    // Using super slides for the showcase section
    if ($("main").attr("id") === "home") {

        $('#slides').superslides({
            animation: "fade",
            animation_speed: "slow",
            animation_easing: "linear",
            play: 5000,
            pagination: false,
            inherit_height_from: ".showcase"
        });
    }

    ////////////////
    // Making the gallery functionality
    let allImages = $(".photo-list__item--img img").toArray();
    let imgFromFrame = $(".img-frame a img");
    let imgFrame = $(".img-frame");
    let leftArrow = $(".left-arrow");
    let rightArrow = $(".right-arrow");

    allImages.forEach((el, index) => {
        $(el).on("click", showTheFirstPhoto)
    });

    leftArrow.on("click", function () {
        changeThePicture(1)
    });


    rightArrow.on("click", function () {
        changeThePicture(-1);
    });

    //////////////
    // Soft scroll
    let allLinks = $(".navbar__item--link").toArray();
    //if element = gallery link do nothing
    if ($("main").attr("id") === "home") {

        allLinks.forEach((el, index) => {

            if (index !== 2) {
                $(el).on("click", function (event) {
                    event.preventDefault();

                    let targetHref = $(this).attr("href");
                    let targetPossition = $(targetHref).offset().top;

                    $("html, body").animate({scrollTop: targetPossition - 50}, "slow")
                })
            }


        });

    }

    ///////////////
    // Add inner nav bar
    let innerNavbarEl = $(".inner-nav-members");
    let arrowLinkEl = $(".members-arrow").parent();

    arrowLinkEl.on("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        $(".members-arrow").toggleClass("rotate-deg");
        innerNavbarEl.slideToggle();

    });

    ////////////////
    // Add mobile menu functionality
    let logoEl = $(".mobile-btn__icon");

    logoEl.on("click", function () {
       $(".navbar").slideToggle()
    });

    function changeThePicture(sign) {
        // event.preventDefault();
        // event.stopPropagation();

        let currentImgAttribute = imgFromFrame.attr("src");

        allImages.forEach((el, index) => {
            if ($(el).attr("src") === currentImgAttribute) {

                console.log(imgFromFrame.attr("src", $(allImages[index + sign]).attr("src")));

                imgFromFrame.css("animation", "fadeIn 1s");

                setTimeout(function () {
                    imgFromFrame.css("animation", "none");
                }, 1000);

            }

        });
    }

    function showTheFirstPhoto(event) {
        event.preventDefault();
        event.stopPropagation();

        let currentAttribute = $(event.target).attr("src");
        imgFromFrame.attr("src", currentAttribute);
        imgFromFrame.css("animation", "fadeIn 1s");
        setTimeout(function () {
            imgFromFrame.css("animation", "none");
        }, 1000)
        imgFrame.css("display", "block");
    }

}