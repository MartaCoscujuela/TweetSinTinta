tweets = [{
        nombre: "Ademas",
        arroba: "ademas13",
        tweet: "Que los 650.000 niños que viven en riesgo de pobreza puedan escribir su historia",
        img: "img/user1.jpg"
    },
    {
        nombre: "Eva Romero",
        arroba: "eromero",
        tweet: "Este tweet se ha quedado sin tinta por una buena causa.",
        img: "img/user2.jpg"
    },
    {
        nombre: "HelloSar",
        arroba: "sara18",
        tweet: "1 tweet = 1 pack de material escolar para 1 niño.",
        img: "img/user3.jpg"
    },
    {
        nombre: "ElBarto",
        arroba: "bartoss",
        tweet: "¿Y si solo con 1 tweet pudiésemos ayudar a 1 niño a escribir su historia?",
        img: "img/user4.jpg"
    }
];

var user;
grid = $("#grid-tweets");
singedIn = false;

$(document).ready(function() {
    user = getUrlVars();

    launchcount();
    loading = $("#loading");
    footer = $("footer");
    hide = $("#hide");
    hide.removeClass("displaynone");
    hide.fadeOut(1);
    footer.fadeOut(1000);
    loading.fadeOut(1000, function() {
        hide.fadeIn(1000);
        footer.fadeIn(1000);
        if (user != "") {
            part();
            showBox();
        } else {
            hideBox();
        }
    });



});
$(function() {

    positionTweets();
    createTweets();

    var text = [" tweets sin tinta", " packs de material escolar"];
    var counter = 1;
    const elem = $("#change-text");
    setInterval(change, 5000);

    function change() {
        elem.fadeOut(500, () => {
            elem.fadeIn(500);
            elem.html(text[counter]);
            counter++;

            if (counter >= text.length) {
                counter = 0;
            }
        });
    }
});

$(window).resize(function() {
    positionTweets();
});

window.addEventListener("scroll", function() {
    var elementTarget = document.getElementById("part");
    if (window.scrollY > (elementTarget.offsetTop)) {
        selectPart();

    } else {
        selectHome();
    }
});

$("#btn-publica").click(function() {

    var blank = "%E3%85%A4%E3%85%A4";
    for (var i = 0; i < $('#tweettext').val().length; i++) {
        blank = blank + " "
    }

    console.log("publica");

    blank = blank + "%23PoweredByTweets";
    $('#myModal').modal('show');

    url = "http://www.tweetsintinta.com/twitterCosc/tweet?text=" + blank;
    $.get(url, function(data) {
        count();
        $('#tweettext').val("")

        $('#modalTitle').html("¡Gracias!");
        $('.modal-body').html("Tu tweet se ha publicado sin tinta.");
        $('#myModal').modal('show');
    }).fail(function() {
        $('#modalTitle').html("¡Ha ocurrido un error!");
        $('.modal-body').html("Vuelve a intentarlo más tarde.");
        $('#myModal').modal('show');
    });
});

$("#singin").click(function() {
    location.href = "http://www.tweetsintinta.com/twitterCosc/login";
});

$("#logout").click(function() {
    location.href = "./logout.php";
});

$("#load-more").click(() => {});

$("#btn-home").click(() => {
    home();
});
$("#btn-part").click(() => {
    part();
});
$("#btn-pro").click(() => {
    pro();
});
$("#btn-home-sm").click(() => {
    home();
});
$("#btn-part-sm").click(() => {
    part();
});
$("#btn-pro-sm").click(() => {
    pro();
});

$("#load-more").click(() => {
    loadMore();
});

$("#btn-escribe").click(() => {
    part();
});

function getUrlVars() {

    var value = window.location.search.substr(1);
    if (value != null && value != "") {
        value = value.substr(2);

        value = hex_to_ascii(value);
        value = value.replace("|", ",");
        value = value.replace("|", ",");


        value = "{\"" + value;
        value = value.replace(/:\"/g, "\":\"");
        value = value.replace(/\",/g, "\",\"");
        value = value + "}";
        value = JSON.parse(value);
    }

    return value;
}

function hex_to_ascii(str1) {
    var hex = str1.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
}

function showBox() {
    console.log(user);
    $(".only-logged").show();
    $(".no-logged").hide();

    $("#th-name").html(user.name);
    $("#th-arroba").html("@" + user.screenName);
    $("#th-foto").attr("src", user.profileImageUrl);
    $("#tweettext").focus();
}

function hideBox() {
    $(".only-logged").hide();
    $(".no-logged").show();
}

function home() {
    console.log("home");
    $('html,body').animate({ scrollTop: $("#top").offset().top - 100 }, 'slow', () => {
        selectHome();
    });
}

function part() {
    console.log("part");
    $('html,body').animate({ scrollTop: $("#part").offset().top - 10 }, 'slow', () => {
        selectPart();
    });
}

function selectHome() {
    $(".btn-menu").removeClass("selected");
    $(".nav-item").removeClass("active");
    $("#btn-home").addClass("selected");
    $("#btn-home-sm").addClass("active");
    $('.navbar-collapse').collapse('hide');
}

function selectPart() {

    $(".btn-menu").removeClass("selected");
    $(".nav-item").removeClass("active");
    $("#btn-part").addClass("selected");
    $("#btn-part-sm").addClass("active");
    $('.navbar-collapse').collapse('hide');
}

function selectPro() {
    console.log("pro");
    $(".nav-item").removeClass("active");
    $(".btn-menu").removeClass("selected");
    $("#btn-pro").addClass("selected");
    $("#btn-pro-sm").addClass("active");
    $('.navbar-collapse').collapse('hide');
}

function pro() {
    selectPro();
}


function positionTweets() {
    if ($(window).width() > 795) {
        $(".recent").addClass("smalltweet");
        $(".master").addClass("bigtweet");
        $(".recent").removeClass("bigtweet");
        $(".master").removeClass("smalltweet");
    } else if ($(window).width() < 795 && $(window).width() > 519) {
        $(".recent").addClass("bigtweet");
        $(".master").addClass("bigtweet");
        $(".recent").removeClass("smalltweet");
        $(".master").removeClass("smalltweet");
    } else if ($(window).width() < 480) {
        $(".recent").addClass("smalltweet");
        $(".master").addClass("smalltweet");
        $(".recent").removeClass("bigtweet");
        $(".master").removeClass("bigtweet");
    }
}

function loadMore() {
    grid.fadeOut(500, () => {
        for (let i = tweets.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tweets[i], tweets[j]] = [tweets[j], tweets[i]];
        }
        createTweets();
    });

}

function createTweets() {
    grid.html("");

    i = 0;
    tweets.forEach(tweet => {
        if (i < 4) {

            grid.append(`<div class="twitterbox recent smalltweet">
        <div id="twitter-header">
            <div class="left">
                <img id="th-foto" src="${tweet.img}"/>
                <div id="th-user">
                    <div id="th-name">${tweet.nombre}</div>
                    <div id="th-arroba">@${tweet.arroba}</div>
                </div>
            </div>
            <img class="right" src="img/twicon.jpg" alt="">
        </div>
        <div class="tweettxt">${tweet.tweet} <span class="hashtag">#tweetsintinta</span></div>
    </div>`);
        }
        i++;

    })
    grid.fadeIn(500);
}


function launchcount() {
    count();
    setInterval(() => {
        count();
    }, 6000);

}

function count() {
    $.get("http://www.tweetsintinta.com/twitterCosc/count", function(data) {
        $("#number").html(JSON.parse(data).count);
    });
}