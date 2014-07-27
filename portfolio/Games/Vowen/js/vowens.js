
(function($)
{
    $.fn.removeStyle = function(style)
    {
        var search = new RegExp(style + '[^;]+;?', 'g');

        return this.each(function()
        {
            $(this).attr('style', function(i, style)
            {
                return style.replace(search, '');
            });
        });
    };
}(jQuery));


var letters = ["A", "E", "I", "O", "U", "C", "D", "M", "Z", "X", "R", "Q", "N", "H"], show_side = true;
var fs = false, fl = false, fn = false, play = false, game = false, music = true, musictime = 0;
var exlev, total_score = 0, levelTimer = 2500;
var gameTimer, gameTimerCounter = 0, combo = 0;
$(function() {

   


    $(document).on('click','.hsc',function(){
        var loading='<div style="text-align: center;margin-bottom: 20px">Loading..</div>';
        $('.leaderboard .self,.leaderboard .detail').html(loading);
        $.ajax({
            url:'SetScoreboard',
            type:'POST',
            success:function(data){
               if(data.status==="s"){
                    var hsdetail='';
                    for (i = 0; i < data.msg[0].length; i++) {
                        hsdetail+='<div class="row-fluid">'+
                            '<div class="leads">'+
                            '<img src="img/star.png">'+data.msg[0][i].name+
                            '<span class="pull-right">'+data.msg[0][i].score+'</span>'+
                            '</div>'+
                            '</div>';
                    }
                    $('.leaderboard .detail').html(hsdetail);
                    
                    var sfdetail='<div class="leads">'+
                        '<div class="online"></div>'+
                        '<span class="o-name">'+data.msg[1].name+'</span>'+
                        '<span class="pull-right o-score">'+data.msg[1].score+'</span>'+
                        '</div>';
                    
                    $('.leaderboard .self').html(sfdetail);
                    
                }else{
                    
                }
            }
        });
        $('.s11').removeClass('slideRight').addClass('slideLeft');
        $('.xx').fadeOut(650);
        $('.gtitle').addClass('tlf');
        setTimeout(function() {
            $('.leadbck').fadeIn(500);
        }, 750);
        
    });

    $('.leadbck').click(function() {
        $('.s11').removeClass('slideLeft').addClass('slideRight');
        $('.gtitle').removeClass('tlf');
        $('.leadbck').fadeOut(200);
        setTimeout(function() {
            $('.xx').fadeIn(500);
            $('#cmn').open();
        }, 210);
    });

    var bgSound = document.getElementById('bgSound');
    var clickSound = document.getElementById('clickSound');
    if (music)
        bgSound.play();

    $('.exitgame').click(function() {
        clearInterval(interval);
        clearInterval(exlev);
        clearTimeout(gameTimer);
        var minutes = Math.floor(gameTimerCounter / 60);
        var seconds = gameTimerCounter - minutes * 60;

        $('.s2').removeClass('open').addClass('closes');
        $('.timer,.ltmr .circle').removeClass('start');

        $('#scrb').html(total_score + (combo * 20));
        var sc = "" + seconds;
        if (sc.length == 1) {
            sc = "0" + seconds
        }
        var min = "" + minutes;
        if (min.length == 1) {
            min = "0" + minutes;
        }
        $('#gtm').html(minutes + ":" + sc);
        setTimeout(function() {

            $('.s2').hide();
            $('.s1').show();
            showscreen();
        }, 1299);

        setTimeout(function() {

        }, 2000);
        setTimeout(function() {
            $('.popup').fadeIn(600);
            $('.hbox,.ibox').hide();
            $('.gbox').show().removeClass('close').addClass('open');
        }, 2800);
        setTimeout(function() {
            $('#cmn').circleMenu('open');
            $('#combom').html(combo);
            savedata(total_score + (combo * 20), minutes, seconds);
        }, 3000);
    });

    $('.g-status.closer').click(function() {
        $('.gbox').removeClass('open').addClass('close');
        setTimeout(function() {
            $('.popup').fadeOut(700);
        }, 401);
    });

    $('.i-status.closer').click(function() {
        $('.ibox').removeClass('open').addClass('close');
        setTimeout(function() {
            $('.popup').fadeOut(700);
        }, 401);
    });

    $('.hbox .exit-button').click(function() {
        $('.hbox').removeClass('open').addClass('close');
        setTimeout(function() {
            $('.popup').fadeOut(700);
        }, 401);
    });

    showmenu();
    $('#cmn').circleMenu('open');

    function splitScreen() {
        $('.gameplay').removeClass('grad').css('background', 'rgba(0,0,0,0.4)');
        $('.s11,.s12').addClass('grad');
        $('.s11').css('overflow', 'hidden').animate({
            'marginLeft': '-50%'
        }, 800);
        $('.s12 #slide2').html($('.s11 .in').html());
        $('.s12').removeClass('hide');
        $('.s12').removeClass('hide').animate({
            'right': '-50%'
        }, 800);
    }

    function showscreen() {
        $('.s11').css('overflow', 'hidden').animate({
            'marginLeft': '0%'
        }, 1200);
        $('.s12').show().animate({
            'right': '0%'
        }, 1200);
        setTimeout(function() {
            $('.gameplay').removeStyle('background', '').addClass('grad');
            $('.s11').css('overflow', 'visible').removeClass('grad');
            $('.s12').addClass('hide').html('<div  id="slide2"></div>').removeClass('grad');
        }, 1201);
    }

    function playgame() {
        splitScreen();
        combo = 0;
        $('.timer').html('');
        $('#backside,#frontside').html('');
        setTimeout(function() {
            $('.s1').hide();
            $('.s2').show().removeClass('closes').addClass('open');
            countdown("countdown2", 3, 0);
        }, 801);
        setTimeout(function() {
            startGame();
        }, 1800);
    }

    $('#replay').click(function() {
        combo = 0;
        $('.combo .fig').html('');
        $('.timer,.ltmr .circle').removeClass('start');
        $('.g-status.closer').click();
        $('.timer').html('');
        $('#backside,#frontside').html('');
        setTimeout(function() {
            countdown("countdown2", 3, 0);
        }, 101);
        setTimeout(function() {
            $('.combo .fig').html(combo);
            startGame();
        }, 1100);
    });

    function showmenu() {
        $('#cmn').show().circleMenu({
            item_diameter: 40,
            circle_radius: 100,
            direction: 'bottom-half',
            step_in: -100,
            step_out: 100,
            speed: 300,
            trigger: 'click',
            'transition_function': 'ease-in-out',
            select: function(evt, item) {

                var index = item.index();
                var onoff = 'on';
                if (index === 3) {
                    clickSound.play();
                    $('.card').show();
                    playgame();
                } else if (index === 1) {
                    clickSound.play();
                    $('.popup').fadeIn(600);
                    //setTimeout(function(){
                    $('.gbox,.ibox').hide();
                    $('.hbox').show().removeClass('close').addClass('open');
                    // },201);
                }
                else if (index === 2) {
                    clickSound.play();
                    $('.popup').fadeIn(600);
                    //setTimeout(function(){
                    $('.gbox,.hbox').hide();
                    $('.ibox').show().removeClass('close').addClass('open');
                    // },201);
                }
                else if (index === 4) {
                    if (music) {
                        music = false;
                        onoff = 'off';
                        bgSound.pause();
                        musictime = bgSound.currentTime;
                        bgSound.currentTime = 0;
                    } else if (!music) {
                        music = true;
                        onoff = 'on';
                        bgSound.currentTime = musictime;
                        bgSound.play();
                    }
                }
                else if (index === 5) {
                    // window.close();
                }
                var str = '<ul id="cmn">\n' +
                    '<li><a><img src="img/square-outline-64.png"></a><span class="mlabel">Menu</span></li>\n' +
                    '<li><a><img src="img/question-mark-4-64.png"></a><span class="mlabel" style="left: -57px;top: 0">Instruction</span></li>\n' +
                    '<li><a><img src="img/info-64.gif"></a><span class="mlabel">About</span></li>\n' +
                    '<li><a><img src="img/play-64.png"></a><span class="mlabel">Play</span></li>\n' +
                    '<li><a><img src="img/audio-' + onoff + '.png" style="margin-top: -5px"></a><span class="mlabel">Sound</span></li>\n' +
                    '<li class="hsc"><a><img src="img/network-64.png"></a><span class="mlabel" style="left: 25px">Leaderboard</span></li>\n' +
                    '</ul>';
                $('.xx').html(str);
                showmenu();
                $('#cmn').show();
            }
        }).css('margin', '0px auto').css('margin-top', '5%');
    }

    document.addEventListener("keyup", function(e) {
        checkanswer(e);
    }, false);

    $('.btns.left').click(function() {
        if (play) {
            clearTimeout(exlev);
            $('.timer,.ltmr .circle').removeClass('start');
            $('.cscore').fadeIn(600).animate({
                'top': '-314px'
            }, 1000).fadeOut(1000);

            if (!fl && fn && !fs) {
                $('.checkans').removeClass('wrong').addClass('right');
                total_score += 10;
                combo++;

                $('.cscore').html('10');
            } else {
                $('.checkans').removeClass('right').addClass('wrong');
                if (total_score > 0) {
                    total_score -= 5;
                }
                combo = 0;
                $('.cscore').html('-5');
            }
            setTimeout(function() {
                if ($('.checkans').hasClass('right')) {
                    $('.checkans').addClass('resetright');
                } else if ($('.checkans').hasClass('wrong')) {
                    $('.checkans').addClass('resetwrong');
                }
                $('.checkans').removeClass('right wrong').addClass('hides');
            }, 1000);

            setTimeout(function() {
                $('.score').html('Score : ' + total_score);
                $('.cscore').hide();
                document.querySelector('.card').classList.toggle("flip");
                if (show_side) {
                    show_side = false;
                } else {
                    show_side = true;
                }
                $('.cscore').css('top', '-36px');
                generate();
            }, 1900);
            $('.combo .fig').html(combo);
        }
    });

    $('.btns.right').click(function() {
        if (play) {
            play = false;
            clearTimeout(exlev);
            $('.timer,.ltmr .circle').removeClass('start');
            $('.cscore').fadeIn(600).animate({
                'top': '-314px'
            }, 1000).fadeOut(1000);
            if (fl && !fn && !fs) {
                $('.checkans').removeClass('wrong').addClass('right');
                $('.cscore').html('10');
                total_score += 10;
                combo++;
            } else {
                $('.checkans').removeClass('right').addClass('wrong');
                if (total_score > 0) {
                    total_score -= 5;
                }
                combo = 0;
                $('.cscore').html('-5');
            }
            setTimeout(function() {
                if ($('.checkans').hasClass('right')) {
                    $('.checkans').addClass('resetright');
                } else if ($('.checkans').hasClass('wrong')) {
                    $('.checkans').addClass('resetwrong');
                }
                $('.checkans').removeClass('right wrong').addClass('hides');
            }, 1000);
            setTimeout(
            function() {
                $('.score').html('Score : ' + total_score);
                $('.cscore').hide();
                document.querySelector('.card').classList.toggle("flip");
                if (show_side) {
                    show_side = false;
                } else {
                    show_side = true;
                }
                $('.cscore').css('top', '-36px');
                generate();
            }, 1900);
            $('.combo .fig').html(combo);
        }
    });

    $('.btns.down').click(function() {
        if (play) {
            play = false;
            clearTimeout(exlev);
            $('.timer,.ltmr .circle').removeClass('start');
            $('.cscore').fadeIn(600).animate({
                'top': '-314px'
            }, 1000).fadeOut(1000);
            if (fs) {
                $('.checkans').removeClass('wrong').addClass('right');
                $('.cscore').html('10');
                total_score += 10;
                combo++;
            } else {
                $('.checkans').removeClass('right').addClass('wrong ');
                if (total_score > 0) {
                    total_score -= 5;
                }
                combo = 0;
                $('.cscore').html('-5');
            }
            setTimeout(function() {
                if ($('.checkans').hasClass('right')) {
                    $('.checkans').addClass('resetright');
                } else if ($('.checkans').hasClass('wrong')) {
                    $('.checkans').addClass('resetwrong');
                }
                $('.checkans').removeClass('right wrong').addClass('hides');
            }, 1000);

            setTimeout(
            function() {
                $('.score').html('Score : ' + total_score);
                $('.cscore').hide();
                document.querySelector('.card').classList.toggle("flip");
                if (show_side) {
                    show_side = false;
                } else {
                    show_side = true;
                }
                $('.cscore').css('top', '-36px');
                generate();
            }, 1900);
            $('.combo .fig').html(combo);
        }
    });

    $('.direction').hover(function() {
        $('.directionbx').hide(100);
        $('.btn-box').show(100);
    }, function() {
        $('.btn-box').hide(100);
        $('.directionbx').show(100);
    });


    function checkanswer(e) {
        if (play) {
            play = false;
            if (e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 40) {

                clearTimeout(exlev);
                $('.timer,.ltmr .circle').removeClass('start');
                $('.cscore').fadeIn(600).animate({
                    'top': '-314px'
                }, 1000).fadeOut(1000);

                if (e.keyCode == 37) {
                    if (!fl && fn && !fs) {
                        $('.checkans').removeClass('wrong').addClass('right');
                        total_score += 10;
                        combo++;
                        $('.cscore').html('10');
                    } else {
                        $('.checkans').removeClass('right').addClass('wrong');
                        if (total_score > 0) {
                            total_score -= 5;
                        }
                        combo = 0;
                        $('.cscore').html('-5');
                    }
                }
                if (e.keyCode == 39) {
                    if (fl && !fn && !fs) {
                        $('.checkans').removeClass('wrong').addClass('right');
                        $('.cscore').html('10');
                        total_score += 10;
                        combo++;
                    } else {
                        $('.checkans').removeClass('right').addClass('wrong');
                        if (total_score > 0) {
                            total_score -= 5;
                        }
                        combo = 0;
                        $('.cscore').html('-5');
                    }
                }
                if (e.keyCode == 40) {
                    if (fs) {
                        $('.checkans').removeClass('wrong').addClass('right');
                        $('.cscore').html('10');
                        total_score += 10;
                        combo++;
                    } else {
                        $('.checkans').removeClass('right').addClass('wrong ');
                        if (total_score > 0) {
                            total_score -= 5;
                        }
                        combo = 0;
                        $('.cscore').html('-5');
                    }
                }


                setTimeout(function() {
                    if ($('.checkans').hasClass('right')) {
                        $('.checkans').addClass('resetright');
                    } else if ($('.checkans').hasClass('wrong')) {
                        $('.checkans').addClass('resetwrong');
                    }
                    $('.checkans').removeClass('right wrong').addClass('hides');
                }, 1000);

                setTimeout(
                function() {
                    $('.score').html('Score : ' + total_score);
                    $('.cscore').hide();
                    document.querySelector('.card').classList.toggle("flip");
                    if (show_side) {
                        show_side = false;
                    } else {
                        show_side = true;
                    }
                    $('.cscore').css('top', '-36px');
                    generate();
                    $('.fig').removeClass('nxt');
                }, 1900);

            }
            $('.fig').addClass('nxt');
            setTimeout(function() {
                $('.combo .fig').html(combo);
            }, 350);

        }
    }

});

function startGame() {
    game = true;
    total_score = 0;
    generate();
    startGameTimer();
}


function generate() {

    var number = _.random(1, 9);
    var letter = letters[_.random(letters.length - 1)];

    setTimeout(function() {
        play = true;
    }, 650);

    //    if (total_score >= 100) {
    //        levelTimer = 1500;
    //    }

    $('.timer,.ltmr .circle').addClass('start');

    $('.checkans').css('opacity', '0').removeClass('wrong right hides resetright resetwrong');

    if ((letter == "A" || letter == "O" || letter == "E" || letter == "I" || letter == "U") && (number % 2 == 0)) {
        fs = true;
        fl = false;
        fn = false;
    } else if (letter == "A" || letter == "O" || letter == "E" || letter == "I" || letter == "U") {
        fl = true;
        fs = false;
        fn = false;
    }
    else if (number % 2 == 0) {
        fn = true;
        fs = false;
        fl = false;
    } else {
        var type = _.random(1, 3);
        //1 - number //2- vowel  //3 - both
        if (type === 1) {
            var arr = [2, 4, 6, 8];
            var rough = arr[_.random(arr.length - 1)];
            number = rough;
            fn = true;
            fl = false;
            fs = false;
        } else if (type === 2) {
            var arrlet = ["A", "E", "I", "O", "U"];
            var rough = arrlet[_.random(arrlet.length - 1)];
            letter = rough;
            fl = true;
            fn = false;
            fs = false;
        } else if (type === 3) {
            var arr = [2, 4, 6, 8];
            var roughnum = arr[_.random(arr.length - 1)];
            number = roughnum;
            var arrlet = ["A", "E", "I", "O", "U"];
            var roughlet = arrlet[_.random(arrlet.length - 1)];
            letter = roughlet;
            fs = true;
            fn = false;
            fl = false;
        }

    }

    if (show_side) {
        var txt = number + "" + letter;
        $('#frontside').html(txt);
    } else {
        txt = number + "" + letter;
        $('#backside').html(txt);
    }

    expireLevel();

}

function expireLevel() {
    clearTimeout(exlev);
    if (game) {
        exlev = setTimeout(function() {
            $('.timer,.ltmr .circle').removeClass('start');
            document.querySelector('.card').classList.toggle("flip");
            if (show_side) {
                show_side = false;
            } else {
                show_side = true;
            }
            generate();
        }, levelTimer);
    }
}

var gameover;

var interval;

function countdown(element, minutes, seconds) {
    clearTimeout(exlev);
    clearInterval(interval);
    var time = minutes * 60 + seconds;
    interval = setInterval(function() {
        var el = document.getElementById(element);
        if (time == 0) {
            clearInterval(interval);
            clearTimeout(exlev);
            $('.timer,.ltmr .circle').removeClass('start');
            $('.exitgame').click();
            return;
        }
        var minutes = Math.floor(time / 60);
        if (minutes < 10)
            minutes = "0" + minutes;
        var seconds = time % 60;
        if (seconds < 10)
            seconds = "0" + seconds;
        var text = minutes + ':' + seconds;
        $('.timer').html(text);
        time--;
    }, 1000);
}

function startGameTimer() {
    gameTimer = setTimeout(
    function() {
        startGameTimer();
        gameTimerCounter++;
    }, 1000);
}

function savedata(s, m, sec) {
    $('.ackn').show().children('div').html('Saving. . .');
    $.ajax({
        url: 'SaveVowenGame',
        type: 'POST',
        data: {
            s: s, 
            m: m, 
            sec: sec
        },
        success: function(data) {
            if(data==="s"){
             $('.ackn').show().children('div').html('Saved!!!');   
            }
        }
    });
}
