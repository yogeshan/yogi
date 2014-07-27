var json = [{
    level: 1,
    matrix: 3,
    questions: [
    "cn", "cc"
    ],
    time: 8000
}, //  0
{
    level: 2,
    matrix: 3,
    questions: [
    "cn", "cc", "ccn"
    ],
    time: 10000
}, //   1
{
    level: 3,
    matrix: 4,
    questions: [
    "cn", "cc"
    ],
    time: 10000
}, //   2
{
    level: 4,
    matrix: 4,
    questions: [
    "cn", "cc", "ccn"
    ],
    time: 12000
}, //   3
{
    level: 5,
    matrix: 4,
    questions: [
    "cn", "cc", "ccn", "cr"
    ],
    time: 15000
}, //   4
{
    level: 6,
    matrix: 4,
    questions: [
    "cn", "cc", "ccn", "cr", "crn"
    ],
    time: 12000
}, //  5
{
    level: 7,
    matrix: 4,
    questions: [
    "ccn", "cr", "ct"                       // 6  
    ],
    time: 10000
},
{
    level: 8,
    matrix: 4,
    questions: [
    "ccn", "cr", "cm", "crn"
    ],
    time: 10000
}, // 7
{
    level: 9,
    matrix: 4,
    questions: [
    "ccn", "cr", "cm", "crn", "cmn"
    ],
    time: 12000
}, //8
{
    level: 10,
    matrix: 4,
    questions: [
    "cn", "cc", "ccn", "cr", "cm", "ct"
    ],
    time: 12000
}, //9
{
    level: 11,
    matrix: 4,
    questions: [
    "cn", "cc", "ccn", "cr", "cm", "crn", "cmn"
    ],
    time: 15000
}, //10
{
    level: 12,
    matrix: 4,
    questions: [
    "cn", "cc", "ccn", "cr", "cm", "crn", "cmn", "ct"
    ],
    time: 15000                          //11
}]


var cn = 0, cc, question, color, result = 0, coins = 0, count = 0, tmpqt = [];
var expiretime, expireanimation, totalwrong = 0, qtime = 10000, attempt = 0;
var classes = ["sltr1", "sltr2", "sltr3"];
var finish = false, loose = false;
function generate() {

    count = 0;
    finish = false;
    loose = false;
    expire();
    $('.ansinput').val('');
    $('.num-wrap').empty();
    $('.ansinput').removeAttr('disabled');
    $('.ric,.wic').removeClass('check');
    var numbers = [];
    for (i = 0; i < (matrix * matrix); i++) {
        numbers.push(_.random(1, 9));
    }

    cn = numbers[Math.round(_.random(numbers.length - 1))];
    cc = classes[Math.round(_.random(classes.length - 1))];
    question = qtype[Math.round(_.random(qtype.length - 1))];
    tmpqt.push("" + question);
    if (qtype.length >= 1 && wrongs < 2) {   /////    qtype length check
        if (cc == "sltr1") {
            color = "Red";
        }
        if (cc == "sltr2") {
            color = "Yellow";
        }
        if (cc == "sltr3") {
            color = "Green";
        }
        var index = 0;
        for (i = 0; i < matrix; i++) {
            var str = '<div class="row-fluid display"></div>';
            $('.num-wrap').append(str);
            for (j = 0; j < matrix; j++) {

                var sclass = "" + classes[Math.round(_.random(classes.length - 1))];
                var currentnum = numbers[index];
                var span = "";
                if (question === "cn") {
                    if (currentnum === cn) {
                        count++;
                    }
                } else if (question === "ccn") {
                    if (sclass === cc && currentnum === cn) {
                        count++;
                    }
                } else if (question === "cc") {
                    if (sclass === cc) {
                        count++;
                    }
                }

                if (matrix === 3) {
                    span = "span4";
                    $('.display').css('margin', '30px 0px');
                    var row = '<div class="' + span + ' box  ' + sclass + '"><span>' + currentnum + '</span></div>';
                    $('.display').eq(i).append(row);
                    index++;
                }
                if (matrix === 4) {
                    var data = '';
                    if (j < 3 && i < matrix - 1) {
                        data = ' data-ant="move1"';
                    }
                    if (j < 3 && i === matrix - 1) {
                        data = ' data-ant="move2"';
                    }
                    if (j === 3 && i === 0) {
                        data = ' data-ant="move4"';
                    }
                    if (j === 3 && i > 0) {
                        data = ' data-ant="move3"';
                    }

                    row = '<div class=" span3 box  ' + sclass + '" ' + data + '><span>' + currentnum + '</span></div>';
                    $('.display').eq(i).append(row);
                    $('.display').eq(0).css("margin-top", '0px');
                    index++;
                }

            }
        }



        // count colored number

        if (question === "ccn") {
            if (count === 0) {
                var rpl = _.random(1, 5);
                var vals = [];
                for (i = 0; i < rpl; i++) {
                    var flag = true;
                    var n = _.random((matrix * matrix) - 1);
                    if (vals.length > 0) {
                        for (i = 0; i < vals.length; i++) {
                            if (n == vals[i]) {
                                flag = false;
                            }
                        }
                    }
                    if (flag) {
                        vals.push(n);
                    }
                }
                for (i = 0; i < vals.length; i++) {
                    $('.box').eq(vals[i]).replaceWith('<div class="span3 box ' + cc + '"><span>' + cn + '</span></div>');
                }
                count = vals.length;
            }
            $('.question').html(' How many ' + cn + " in " + color + "?");
        }

        // count number

        if (question === "cn") {
            $('.question').html(' How many ' + cn + '?');
        }


        //   count color

        if (question === "cc") {
            if (count === 0) {
                rpl = _.random(1, 5);
                vals = [];
                for (i = 0; i < rpl; i++) {
                    flag = true;
                    n = _.random((matrix * matrix) - 1);
                    if (vals.length > 0) {
                        for (i = 0; i < vals.length; i++) {
                            if (n == vals[i]) {
                                flag = false;
                            }
                        }
                    }
                    if (flag) {
                        vals.push(n);
                    }
                }
                for (i = 0; i < vals.length; i++) {
                    $('.box').eq(vals[i]).addClass(cc);
                }
                count = vals.length;
            }
            $('.question').html(' How many ' + color + '? ');
        }


        // count rotating element

        if (question === "cr") {
            rpl = _.random(1, 5);
            vals = [];
            for (i = 0; i < rpl; i++) {
                flag = true;
                n = _.random((matrix * matrix) - 1);
                if (vals.length > 0) {
                    for (i = 0; i < vals.length; i++) {
                        if (n === vals[i]) {
                            flag = false;
                        }
                    }
                }
                if (flag) {
                    vals.push(n);
                }
            }
            for (i = 0; i < vals.length; i++) {
                $('.box').eq(vals[i]).addClass('rotating');
            }
            count = vals.length;
            if (level >= 8) {
                rpl = _.random(2, 5);
                var rtn = [];
                for (i = 0; i < rpl; i++) {
                    flag = true;
                    n = _.random((matrix * matrix) - 1);
                    if (vals.length > 0) {
                        for (i = 0; i < vals.length; i++) {
                            if (n === vals[i]) {
                                flag = false;
                            }
                        }
                    }
                    if (rtn.length > 0) {
                        for (i = 0; i < rtn.length; i++) {
                            if (n === rtn[i]) {
                                flag = false;
                            }
                        }
                    }
                    if (flag) {
                        rtn.push(n);
                    }
                }

                for (i = 0; i < rtn.length; i++) {
                    $('.box').eq(rtn[i]).addClass($('.box').eq(rtn[i]).data("ant"));
                }
            }

            $('.question').html(' How many rotating? ');
        }

        // count moving element

        if (question == "cm") {
            rpl = _.random(1, 5);
            vals = [];
            for (i = 0; i < rpl; i++) {
                flag = true;
                n = _.random((matrix * matrix) - 1);
                if (vals.length > 0) {
                    for (i = 0; i < vals.length; i++) {
                        if (n == vals[i]) {
                            flag = false;
                        }
                    }
                }
                if (flag) {
                    vals.push(n);
                }
            }
            for (i = 0; i < vals.length; i++) {
                $('.box').eq(vals[i]).addClass($('.box').eq(vals[i]).data("ant"));
            }
            count = vals.length;
            if (level >= 8) {
                rpl = _.random(2, 5);
                var rtn = [];
                for (i = 0; i < rpl; i++) {
                    flag = true;
                    n = _.random((matrix * matrix) - 1);
                    if (vals.length > 0) {
                        for (i = 0; i < vals.length; i++) {
                            if (n === vals[i]) {
                                flag = false;
                            }
                        }
                    }
                    if (rtn.length > 0) {
                        for (i = 0; i < rtn.length; i++) {
                            if (n === rtn[i]) {
                                flag = false;
                            }
                        }
                    }
                    if (flag) {
                        rtn.push(n);
                    }
                }

                for (i = 0; i < rtn.length; i++) {
                    $('.box').eq(rtn[i]).addClass("rotating");
                }
            }


            $('.question').html(' How many moving? ');
        }

        // count specific number rotating

        if (question === "crn") {

            var current = [];
            $('.display .box').each(function() {
                if (parseInt($(this).children('span').html()) == cn) {
                    var bxin = $(this).index();
                    var bxpin = $(this).parent().index();
                    current.push([bxpin, bxin]);
                }
            });
            if (current.length > 2) {
                rpl = _.random(2, current.length - 1);
            }
            if (current.length <= 2) {
                rpl = _.random(1, current.length - 1);
            }
            var temp = [];
            for (i = 0; i < rpl; i++) {
                var ind = current[_.random(current.length - 1)];
                current = _.without(current, ind);
                $('.display').eq(ind[0]).children('.box').eq(ind[1]).addClass('rotating');
                ;
                count++;
            }
            $('.question').html(' How many ' + cn + ' rotating? ');
        }

        // count specific number moving

        if (question === "cmn") {

            var current = [];
            $('.display .box').each(function() {
                if (parseInt($(this).children('span').html()) === cn) {
                    var bxin = $(this).index();
                    var bxpin = $(this).parent().index();
                    current.push([bxpin, bxin]);
                }
            });
            if (current.length > 2) {
                rpl = _.random(2, current.length - 1);
            }
            if (current.length <= 2) {
                rpl = _.random(1, current.length - 1);
            }
            var temp = [];
            for (i = 0; i < rpl; i++) {
                var ind = current[_.random(current.length - 1)];
                current = _.without(current, ind);
                $('.display').eq(ind[0]).children('.box').eq(ind[1]).addClass($('.display').eq(ind[0]).children('.box').eq(ind[1]).data("ant"));
                count++;
            }
            $('.question').html(' How many ' + cn + ' moving? ');
        }

        if (question === "ct") {
            rpl = _.random(3, 7);
            vals = [];
            for (i = 0; i < rpl; i++) {

                flag = true;
                n = _.random((matrix * matrix) - 1);
                if (vals.length > 0) {
                    for (i = 0; i < vals.length; i++) {
                        if (n === vals[i]) {
                            flag = false;
                        }
                    }
                }
                if (flag) {
                    vals.push(n);
                }

            }

            //var cts=["rotating","move"];
            for (i = 0; i < vals.length; i++) {
                var cls = "";
                if (i % 2 === 0) {
                    cls = "rotating";
                } else {
                    cls = $('.box').eq(vals[i]).data("ant");
                }

                $('.box').eq(vals[i]).addClass(cls);
                count++;
            }

            $('.question').html(' How many animating? ');
        }/// end of CT

    }           ////  qtype length check
    else {
        $('.question').html('');
        if (attempt > 0) {
            if (level < 11 && wrongs < 2) {
                level++;
                getLevel(level);
                generate();
            }
            if (level === 11 && wrongs < 2) {
                $('.exit').click();
            }
        } else {
            
            $('.exit').click();
        }
    }
    qtype = _.difference(qtype, tmpqt);
}

/*level specific*/

var level = 0, wrongs = 0, music = true, bgtime = 0;
var qtype = [], matrix, leveltime;
function getLevel(level) {

    tmpqt = [];
    attempt=0;
    $('.gamebox #level').html(level + 1);
    wrongs = 0;
    qtype = json[level].questions;
    matrix = json[level].matrix;
    leveltime = json[level].time;
}

/* end level info*/
getLevel(level);
$(function() {
    $('.yhs').css('visibility','hidden');
    $('.yhs').html('Something went wrong. Please Try Later.');
    //    $.ajax({
    //        url:'GetUserScore',
    //        type:'POST',
    //        success:function(data){
    //            if(data.status==="s"){
    //                $('.yhs').html('<span>Highscore : '+data.msg.score+' &nbsp;&nbsp;&nbsp; Level : '+data.msg.level+'</span>');
    //            }else{
    //                $('.yhs').html('Something went wrong. Please Try Later.');
    //            }
    //        }
    //    });


    var bgSound = document.getElementById('bgSound');
    var clickSound = document.getElementById('clickSound');
    var wrongSound = document.getElementById('wrongSound');
    var coinsSound = document.getElementById('coinsSound');
    if (music) {
        bgSound.play();
    }

    bgSound.addEventListener('ended', function() {
        this.currentTime = 0;
        this.pause();
        this.play();
    }, false);
    $('.back,.play,#restart,.menu,.exit,.howto,.hidepane').click(function() {
        if (music)
            clickSound.play();
    });
    $('.sound,.vol-state').click(function() {
        clickSound.play();
    });
    $('.back').click(function() {

        $('#summary').hide();
        $('.lvl,.nxt,.sc').removeClass('appear');
    });
    $('.ansinput').live("keypress", function(e) {

        if (e.keyCode === 13) {
            expire();
            attempt++;
            var val = $(this).val();
            if ($.trim(val).length > 0) {

                $('.ansinput').attr('disabled', 'true').css('background', '#fff');
                $('.box').addClass('blow');
                if (parseInt(val) === count) {
                    $('.ric').addClass('check');
                    $('.ansinput').val('');
                    if (music) {
                        coinsSound.play();
                    }
                    coins += 10;
                } else {
                    if (music) {
                        wrongSound.play();
                    }
                    $('.wic').addClass('check');
                    $('.ansinput').val('');
                    wrongs++;
                    totalwrong++;
                    if (totalwrong == 10) {
                        $('.exit').click();
                    }

                    if (coins > 0) {
                        coins -= 5;
                    }
                    if (wrongs >= 2) {

                        if (level > 0) {
                            level--;
                        } else {
                            level = 0
                        }

                        getLevel(level);
                        generate();
                        $('.gameplay').show();
                        $('.scorepanel').show();
                    }
                }
                setTimeout(function() {
                    $('#dscr').html(coins);
                }, 200);
                setTimeout(function() {
                    $('.ansinput').removeAttr('disabled');
                    $('.box').removeClass('blow');
                    generate();
                }, 1000);
            }

        }
    });
    $('.play').click(function() {

        $('.s1').removeClass('mainopen').addClass('mainclose');
        setTimeout(function() {
            level = 0;
            coins = 0;
            totalwrong = 0;
            wrongs = 0;
            startGameTimer();
            getLevel(level);
            $('#dscr').html(coins);
            generate();
            $('.s3').hide();
            $('.s2').removeClass('closegame').addClass('opengame');
            $('.color').addClass('colorit ');
            $('#cover,#color-left').addClass('startpie');
            countdown(3, 0);
        }, 9);
    });
    $('#restart').click(function() {
        clearTimeout(expiretime);
        clearTimeout(expireanimation);
        clearTimeout(gameTimer);
        clearTimeout(countDown);
        level = 0;
        coins = 0;
        totalwrong = 0;
        wrongs = 0;
        $('.ansinput').val('');
        startGameTimer();
        getLevel(level);
        generate();
        countdown(1, 0);
    });
    $('.menu').click(function() {
        $('.menu .menu-item').toggleClass('openenav');
    });
    $('.menu .setting').click(function() {
        
        $('.leaderboard .details').html("Something went wrong. Please try later.");
        
        
        $('.gameover').hide();
        $('.howtoplay').hide();
        $('.leaderboard').css('color', '#fff').show();
        $('.gtitle').removeClass('shiftb').addClass('shift');
        $('.s3').removeClass('closes3').addClass('open');
        setTimeout(function() {
            $('.gtitle,.s3').addClass('fixit');
        }, 1000);
        $('.mainmenu').hide();
        return 0;
        $.ajax({
            url: 'GetHighScore',
            type: 'POST',
            success: function(data) {
                var html='';
                if (data.status === "s") {
                    for (i = 0; i < data.data.length; i++) {
                        
                        
                        if( data.reqst!='-'){
                            html+= 
                            '<div class="span4">' +
                            '   <div class="row-fluid"><img src="http://openseesame.tcs.com/OpenIgnite/Portfolio/struts/common/GetImage.action?usersId='+data.data[i].user+'&dmns=140&reqst='+data.data[i].reqst+'"></div>' +
                            '  <div class="row-fluid hname">' +
                            data.data[i].name +
                            '</div>' +
                            '<div class="row-fluid hscore">' +
                            data.data[i].score +
                            '</div>' +
                            '</div>';
                        }else{
                            html+= 
                            '<div class="span4">' +
                            '   <div class="row-fluid"><img src="../img/contacts-64.png"></div>' +
                            '  <div class="row-fluid hname">' +
                            data.data[i].name +
                            '</div>' +
                            '<div class="row-fluid hscore">' +
                            data.data[i].score +
                            '</div>' +
                            '</div>';
                        }
                         
                    }
                    $('.leaderboard .details .blocks').html(html);
                } else {
                    $('.leaderboard .details').html("Something went wrong. Please try later.");
                }
            }
        });
    });
    
    $('.exit').click(function() {
        clearTimeout(expiretime);
        clearTimeout(expireanimation);
        clearTimeout(gameTimer);
        clearTimeout(countDown);
        var minutes = Math.floor(gameTimerCounter / 60);
        var seconds = gameTimerCounter - minutes * 60;
        $('.s1').removeClass('mainclose').addClass('mainopen');
        setTimeout(function() {
            $('.s2').removeClass('opengame').addClass('closegame');
        }, 9);
        setTimeout(function() {
            $('.mainmenu').hide();
            $('.howtoplay').hide();
            $('.leaderboard').hide();
            $('.gameover,.s3').show();
            $('#totalscore').html(coins);
            $('.gtitle').removeClass('shiftb').addClass('shift');
            $('.s3').removeClass('closes3').addClass('open');
            setTimeout(function() {
                $('.gtitle,.s3').addClass('fixit');
            }, 1000);
            savedata(level, coins, minutes, seconds);
        }, 1000);
        $('.color').removeClass('colorit');
        $('#cover,#color-left').css('-webkit-transform', 'rotate(0deg)').removeClass('startpie');
    });
    var vo = false;
    $('.sound,.vol-state').click(function() {
        if (music) {
            $('.vol-state i').stop().animate({
                "opacity": "0.3"
            }, 500);
            bgSound.pause();
            bgtime = bgSound.currentTime;
            bgSound.currentTime = 0;
            music = false;
        } else {
            bgSound.currentTime = bgtime;
            bgSound.play();
            $('.vol-state i').stop().animate({
                "opacity": "1"
            }, 500);
            music = true;
        }
    });
    $('.howto').click(function() {
        $('.gameover').hide();
        $('.leaderboard').hide();
        $('.howtoplay').show();
        $('.gtitle').removeClass('shiftb').addClass('shift');
        $('.s3').removeClass('closes3').addClass('open');
        setTimeout(function() {
            $('.gtitle,.s3').addClass('fixit');
        }, 1000);
        $('.mainmenu').hide();
    });
    $('.hidepane').click(function() {
        $('.gtitle,.s3').removeClass('fixit');
        $('.gtitle').removeClass('shift').addClass('shiftb');
        $('.s3').removeClass('open').addClass('closes3');
        setTimeout(function() {
            $('.mainmenu').show();
        }, 1000);
    });
});
function expire() {
    clearTimeout(expiretime);
    clearTimeout(expireanimation);
    expireanimation = setTimeout(function() {
        $('.ansinput').attr('disabled', 'true');
        $('.box').addClass('blow');
    }, qtime - 1000);
    expiretime = setTimeout(function() {
        generate();
    }, qtime);
}

var over, gameTimer, gameTimerCounter = 0;

var countDown;
function countdown(minutes, seconds) {
    clearInterval(countDown);
    var time = minutes * 60 + seconds;
    countDown = setInterval(function() {
        if (time === 0) {
            $('.exit').click();
            return;
        }
        var minutes = Math.floor(time / 60);
        if (minutes < 10)
            minutes = "0" + minutes;
        var seconds = time % 60;
        if (seconds < 10)
            seconds = "0" + seconds;
        var text = minutes + ':' + seconds;
        $('#gtym').html(text);
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


function savedata(l, s, m, sec) {
    $('.ackn').show().children('div').html('Saved');
//    
//    $.ajax({
//        url: 'SubmitScoreMemorizor',
//        type: 'POST',
//        data: {
//            l: l,
//            s: s,
//            m: m,
//            sec: sec
//        },
//        success: function(data) {
//            if (data.status == 'e') {
//                $('.ackn').show().children('div').html('Something went wrong. Please try later.');
//            } else if (data.status == 'se') {
//                top.location.href = 'Game.html';
//            } else if (data.status == 'f') {
//                $('.ackn').show().children('div').html('Failed to save your score.');
//            } else if (data.status == 's') {
//                $('.ackn').show().children('div').html('Saved');
//            }
//        }
//    });
}


    