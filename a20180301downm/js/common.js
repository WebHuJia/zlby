// ¶¥²¿µ¼º½²Ëµ¥
var menuBtn = true;
$(".top-menu").on("touchend", function() {
    if (menuBtn) {
        $('.common-nav').animate({
            right: 0,
            top: 0
        }, 300, 'ease-out')
        // bar1
        $('.top-menu-bar1').css({
            transformOrigin:'10% 40%',
            transform: 'rotateZ(45deg)',
            backgroundColor: "#fceec5"
        })
        //
        $('.top-menu-bar2').css({
            width: 0,
            backgroundColor: "#fceec5"
        })
        // bar3
        $('.top-menu-bar3').css({
            transformOrigin:'10% 40%',
            transform: 'rotateZ(-45deg)',
            backgroundColor: "#fceec5"
        })

        menuBtn = false;
    } else {
        $('.common-nav').animate({
            right: "-100%",
            top: "-100%"
        }, 300, 'ease-out')

        // bar1
        $('.top-menu-bar1').css({
            transform: 'rotateZ(0)',
            backgroundColor: "#fff"
        })
        // bar2
        $('.top-menu-bar2').css({
            width:'.33rem',
            backgroundColor: "#fff"
        })
        // bar3
        $('.top-menu-bar3').css({
            transform: 'rotateZ(0)',
            backgroundColor: "#fff"
        })
        menuBtn = true;
    }
});
