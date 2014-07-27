var ans = [], c1 = "", c2 = "", clicked = 0, play = true, volOn = true, musicOn = true;
var desctm, totalscore = 0, bucket = 10, data = [], domain = 'Programming', musictime = 0, vclr = true, pltime = false;
var leveltag = '', prev, cur, finish = true, saved = false;
$(document).ready(function() {
    
    
    var clickSound = document.getElementById('clickSound');
    var flipSound = document.getElementById('flipSound');
    var doomSound = document.getElementById('doomSound');
    var openSound = document.getElementById('openSound');
    var slideSound = document.getElementById('slideSound');
    var slideupSound = document.getElementById('slideupSound');
    var bgSound = document.getElementById('bgSound');
    
    bgSound.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    $('.h-menus .span2,.tile,button,.butn,.m-mu,.cls-control').click(function() {
        if (volOn) {
            clickSound.play();
        }
    });
    
    $('.m-scr').hover(function(){
//        $('.scr .highscore').html('Loading your score...');
//        $.ajax({
//            url:'GetScore',
//            type:'POST',
//            success:function(data){
//                $('.scr .highscore').html('Your score: '+data);
//            }
//        });
        $('.scr').fadeIn(500);
    },function(){
        $('.scr').fadeOut(600);
    });
    
    $('.music span').click(function() {
        if (musicOn) {
            bgSound.pause();
            musictime = bgSound.currentTime;
            bgSound.currentTime = 0;
            $(this).find('img').attr('src', 'img/music-off.png');
            musicOn = false;
        } else {
            bgSound.currentTime = musictime;
            bgSound.play();
            $(this).find('img').attr('src', 'img/music-on.png');
            musicOn = true;
        }
    });
    $('.audio span').click(function() {
        if (volOn) {
            $(this).find('img').attr('src', 'img/audio-wave-off.png');
            volOn = false;
        } else {
            $(this).find('img').attr('src', 'img/audio-wave-on.png');
            volOn = true;
        }
    });
    
    $('.m-inst').click(function() {
        $('.s1').css('pointer-events', 'none').removeClass('hth opens1 closes1').addClass('hts1');
        $('.howto').removeClass('hide inactive').addClass('active');
    });
    $('.m-scr').click(function() {
        alert('Sorry! This feature is not available.')
        return 0;
        $('#leaders').html('<div style="text-align:center;padding:20px 0px;color:#fff;font-size:20px">Loading..</div>');
        $.ajax({
            url: 'GetHighScores',
            type: 'POST',
            success: function(data) {
                if (data.status === "s") {
                    var html = "";
                    for (i = 0; i < data.leaders.length; i++) {
                        var style="";
                        if(i===data.leaders.length-1){
                            style='style="margin-bottom:15px"';
                        }
                        html += '<div class="row-fluid winner" '+style+'>' +
                        '<div class="span3 offset1">' + (i + 1) + '</div>' +
                        '<div class="span6">' +
                        '<div class="row-fluid name"> ' + data.leaders[i].name + ' </div>' +
                        '<div class="row-fluid score"> Score : ' + data.leaders[i].score + ' </div>' +
                        '</div>' +
                        '</div>';
                    }
                    setTimeout(function() {
                        $('#leaders').html(html);
                    },1000);
                } else if (data.status === "f") {
                    $('#leaders').html('<div style="text-align:center;line-height:22pt;padding:20px 0px;color:#fff;font-size:20px"><div><img src="img/sad-128.png" style="margin-bottom:17px;"></div>Opps something went wrong!! <div>Please try again later</div></div>');
                }
            }
        });
        $('.s1').css('pointer-events', 'none').removeClass('hth opens1 closes1').addClass('hts1');
        $('.leaders').removeClass('hide inactive').addClass('active');
    });
    $('.btn-bck.ht').click(function() {
        $('.s1').css('pointer-events', 'auto').removeClass('hts1').addClass('hth');
        $('.howto').removeClass('active').addClass('inactive');
    });
    $('.btn-bck.ld').click(function() {
        $('.s1').css('pointer-events', 'auto').removeClass('hts1').addClass('hth');
        $('.leaders').removeClass('active').addClass('inactive');
    });
    setTimeout(function() {
        $('.loader').fadeOut(400);
        $('.s1').delay(500).queue(function(doit) {
            $(this).removeClass('hide');
            if (musicOn) {
                bgSound.play();
            }
            doit();
        });
    }, 1000);
    $('.clinf').click(function() {
        clearTimeout(desctm);
        $('.info-modal .container').removeClass('open ').addClass('closein').delay(2000).queue(function(doit) {
            $(this).parent().addClass('hide');
            $(this).removeClass('closein').addClass('hide');
            doit();
        });
        setTimeout(function() {
            if (finish) {
                $('.shuffle').empty().css('top','16%').html('<div><img src="img/happy-128.png"></div><div>Well Done !!</div><div class="saving">Saving Game</div>');
                if (saved) {
                    $('.saving').html('Saved');
                } else {
                    $('.saving').html('Saving Game');
                }
                $('.card').removeClass('flip').fadeOut(500).delay(300).queue(function(doit) {
                    $('.p2').slideDown(400);
                    $('.p1').slideUp(400);
                    doit();
                });
            }
        }, 1901);
    });
    $('.m-exit').click(function() {
        window.close();
    });
    $('.m-vol').click(function() {

        if (vclr) {
            $('.vol-control').removeClass('hide inactive').addClass('active');
            vclr = false;
        } else {
            $('.vol-control').removeClass('active').addClass('inactive');
            setTimeout(function() {
                $('.vol-control').addClass('hide');
            }, 1000);
            vclr = true;
        }
    });
    $('.cls-control').click(function() {
        $('.vol-control').removeClass('active').addClass('inactive');
        setTimeout(function() {
            $('.vol-control').addClass('hide');
        }, 1000);
        vclr = true;
    });
    $('.m-play').click(function() {

        $('.vol-control').removeClass('active').addClass('inactive');
        setTimeout(function() {
            $('.vol-control').addClass('hide');
        }, 1000);
        vclr = true;
        $('.m-vol').addClass('FLout');
        $('.m-exit').addClass('FLout');
        $('.m-inst').addClass('SSLout');
        $('.m-scr').addClass('SSLout');
        $('.m-play').addClass('Mout');
        setTimeout(function() {
            $('.m-vol,.m-exit').css('opacity', '0');
        }, 1500);
        setTimeout(function() {
            $('.m-inst,.m-scr').css('opacity', '0');
        }, 1800);
        setTimeout(function() {
            $('.m-play').css('opacity', '0');
        }, 2100);
        setTimeout(function() {
            $('.h-menus').hide();
            $('.lvls').show();
            $('.tile').css('display', 'block').removeClass('bnco').addClass('bnc').css('opacity', '0');
        }, 2103);
        setTimeout(function() {
            $('.bnc').css('margin-top', '0px').css('opacity', '1');
        }, 2900);
        setTimeout(function() {
            $('.m-mu').css('display', 'block').css('opacity', '0').addClass('show').delay(1000).queue(function(doit) {
                $(this).removeClass('show').css('opacity', '1');
                doit();
            });
        }, 3300);
    });
    mnubub(1900);
    function mnubub(time) {
        setTimeout(function() {
            $('.h-menus .span2').css('display', 'block').css('opacity', '0').addClass('open');
            setTimeout(function() {
                $('.m-vol').css('opacity', '1').removeClass('open');
            }, 400);
            setTimeout(function() {
                $('.m-inst').css('opacity', '1').removeClass('open');
            }, 500);
            setTimeout(function() {
                $('.m-play').css('opacity', '1').removeClass('open');
            }, 600);
            setTimeout(function() {
                $('.m-exit').css('opacity', '1').removeClass('open');
            }, 1000);
            setTimeout(function() {
                $('.m-scr').css('opacity', '1').removeClass('open');
            }, 800);
        }, time);
    }
    $('.icn').hover(function() {
        $(this).addClass('this').parent(':eq(0)').children('.lbl').addClass('this');
    }, function() {
        $(this).removeClass('this').parent(':eq(0)').children('.lbl').removeClass('this');
    });
    $('.tile').click(function() {
        totalscore=0;
        var param = $(this).data('catg');
        $('.card').removeClass('hide');
        var index = $(this).index();
        if (index === 0) {
            setCards(ProgrammingData, param);
            leveltag = 'Programming';
        }
        if (index === 1) {
            setCards(Acronyms, param);
            leveltag = "Acronyms";
        }
    });
    function setCards(category, param) {
        $('.s1').removeClass('opens1').addClass('closes1').delay(1500).queue(function(doit) {
            getData(category, param);
            $('.s1').addClass('hide');
            $('.s2').removeClass('hide closes2').addClass('opens2');
            $('.p2 .flp-bx').css('height', "300px");
            $('.p2 .shuffle').empty().css('top','50%').html('Shuffling cards');
            $('.p2').show();
            $('.p1').addClass('hide');
            $('.card').addClass('hide');
            doit();
        });
    }

    $('.m-mu').click(function() {

        $(this).fadeOut(300);
        setTimeout(function() {
            $('.tile').removeClass('bnc').addClass('bnco');
        });
        setTimeout(function() {
            $('.tile:eq(0)').fadeOut(300);
        }, 800);
        setTimeout(function() {
            $('.tile:eq(1)').fadeOut(300);
        }, 900);
        setTimeout(function() {
            $('.tile:eq(2)').fadeOut(300);
        }, 1100);
        setTimeout(function() {
            $('.tile:eq(3)').fadeOut(300);
            $('.lvls').hide();
            $('.h-menus').show();
        }, 1200);
        $('.m-vol').removeClass('FLout');
        $('.m-exit').removeClass('FLout');
        $('.m-inst').removeClass('SSLout');
        $('.m-scr').removeClass('SSLout');
        $('.m-play').removeClass('Mout');
        mnubub(1200);
    });
    $('.close-desc').click(function() {
        clearTimeout(desctm);
        $('.description').slideUp(600);
    });
    $('body .card').click(function() {

        if (!finish && !$(this).hasClass('cr') && !$(this).hasClass('activeFlip')) {

            clearTimeout(desctm);
            $('.description').slideUp(400);
            if (volOn) {
                flipSound.pause();
                flipSound.currentTime = 0;
                flipSound.play();
            }
            $(this).addClass("flip");
            $(this).addClass('activeFlip');
            if (clicked === 0) {
                c1 = $(this).find('.back img').attr('src');
                prev = $(this);
                clicked++;
            } else if (clicked === 1) {
                c2 = $(this).find('.back img').attr('src');
                cur = $(this);
                clicked = 0;
            }
            if (c1.length > 0 && c2.length > 0) {
                if (c1 === c2) {
                    setTimeout(function() {

                        }, 1200);
                    var descin = parseInt($(this).parents('.g-row').index());
                    if (descin === 2 || descin === 4) {
                        descin = 1;
                    }
                    totalscore += bucket + 10;
                    $('.scr-lbl').html(' Score : ' + totalscore + ' ');
                    bucket = 10;
                    $(prev).addClass('cr');
                    $(cur).addClass('cr');
                    var arr = c1.split('.')[0].split('/')[2];
                    arr = arr.replace('_', ' ');
                    setTimeout(function() {
                        if (leveltag === "Programming") {

                            $('.info-modal').removeClass('hide').find('.pl').delay(600).queue(function(doit) {
                                $(this).removeClass('open closein hide').addClass('open');
                                if (volOn) {
                                    openSound.play();
                                }
                                doit();
                            });
                            $('.info-modal .title .main').html(arr);
                            for (i = 0; i < data.length; i++) {
                                if (data[i].Topic === arr) {
                                    var html = '';
                                    var ml = 0;
                                    $.each(data[i], function(i, val) {
                                        if (!(i === 'Language')) {
                                            var cls = '';
                                            if (ml % 2 === 0) {
                                                html += '<div class="row-fluid">';
                                                cls = 'style="margin-left:0"';
                                            } else {
                                                cls = '';
                                            }
                                            html += '<div class="span6" ' + cls + '>' +
                                            ' <div class="row-fluid ft">' + i + '</div>' +
                                            '<div class="row-fluid">' +
                                            '   <div class="span12 fc">' + val +
                                            '</div>' +
                                            '</div>' +
                                            '</div>';
                                            if (ml % 2 !== 0) {
                                                html += '</div>';
                                            }
                                            ml++;
                                        }
                                    });
                                    html += '</div>';
                                    $('.info-body .content .span10').html(html);
                                }
                            }
                        }
                        if (leveltag === "Acronyms") {
                            $('.info-modal').removeClass('hide').find('.acr').delay(600).queue(function(doit) {
                                $(this).removeClass('open closein hide').addClass('open');
                                if (volOn) {
                                    openSound.play();
                                }
                                doit();
                            });
                            $('.info-modal .acr-title').html(arr);
                            for (i = 0; i < data.length; i++) {
                                if (data[i].Topic === arr) {
                                    $('.acr-detail').html(data[i].Detail);
                                    $('.acro-description').html(data[i].Description);
                                }
                            }

                        }
                    }, 1010);
                    finish = false;
                    if ($('.cr').length === 18) {
                        finish = true;
                    }
                    var stars = '';
                    for (i = 0; i < 10; i++) {
                        stars += '<img src="img/heart-70-24-1.ico">';
                    }
                    $('.lyf').fadeOut(300).html(stars).delay(600).queue(function(doit) {
                        $(this).fadeIn(400);
                        doit();
                    });
                } else {
                    setTimeout(function() {
                        if (volOn) {
                            doomSound.play();
                        }
                    }, 700);
                    if (bucket > 0) {
                        bucket -= 1;
                    }
                    $('.bk').html(bucket);
                    setTimeout(function() {
                        $('.card').each(function() {
                            if (!$(this).hasClass('cr')) {
                                $(this).removeClass("flip");
                            }
                            if ($(this).hasClass('activeFlip') && !$(this).hasClass('cr')) {
                                $(this).removeClass("activeFlip");
                            }
                        });
                        $('.lyf').children('img').eq($('.lyf')
                            .children('img').length - 1).animate({
                            'marginTop': '-40px',
                            'opacity': '0'
                        }, 700)
                        .delay(700).queue(function(doit) {
                            $(this).remove();
                            doit();
                        });
                    }, 700);
                }
                c1 = "";
                c2 = "";
                closedesc();
            }
        }
    });
    $('.end-game').click(function() {
        totalscore=0;
        $('.topic').each(function() {
            $(this).empty();
        });
        $('.description').slideUp(200);
        $('.card').fadeOut(600).removeClass('flip');
        $('.p2 .flp-bx').css('height', "300px");
        $('.p1').css('overflow', 'hidden').slideUp(600);
        setTimeout(function() {
            $('.card').removeClass('hide shiftcrd activeFlip cr').removeStyle('display', '');
            $('.p2 .shuffle').empty().css('top','50%').html('Destroying cards');
            $('.p2').slideDown(600);
            setTimeout(function() {
                $('.s2').addClass('closes2');
                setTimeout(function() {
                    $('.s2').addClass('hide');
                    $('.s1').removeClass('hide').addClass('opens1');
                    $('.tile').removeClass('bnc');
                    $('.lvls').hide();
                    $('.h-menus').show();
                    $('.m-vol').removeClass('FLout');
                    $('.m-exit').removeClass('FLout');
                    $('.m-inst').removeClass('SSLout');
                    $('.m-scr').removeClass('SSLout');
                    $('.m-play').removeClass('Mout');
                    mnubub(1900);
                    $('.m-mu').css('opacity', '0');
                    $('.card').clearQueue().finish();
                }, 1400);
            }, 2000);
        }, 600);
    });
    function closedesc() {

        desctm = setTimeout(function() {
            $('.description').slideUp(400);
            $('.info-modal .container').removeClass('open ').addClass('closein').delay(2000).queue(function(doit) {
                $(this).parent().addClass('hide');
                $(this).removeClass('closein').addClass('hide');
                doit();
            });
            setTimeout(function() {
                if (finish) {
                    $('.shuffle').empty().css('top','16%').html('<div><img src="img/happy-128.png"></div><div>Well Done !!</div><div class="saving">Saving Game</div>');
                    $('.card').removeClass('flip').fadeOut(500).delay(300).queue(function(doit) {
                        $('.p2').slideDown(400);
                        $('.p1').slideUp(400);
                        doit();
                    });
                    if (saved) {
                        $('.saving').html('Saved');
                    } else {
                        $('.saving').html('Saving Game');
                    }
                }
            }, 6091);
        }, 30000);
        if (finish) {
            $.ajax({
                url: 'SaveFlipperGame',
                type: 'POST',
                data: {
                    score: totalscore
                },
                success: function(data) {
                    if (data === "s") {
                        saved = true;
                        totalscore=0;
                        $('.scr-lbl').html(' Score : ' + totalscore + ' ');
                    } else if (data === "f") {

                    }
                }
            });
    
        }
    }

    function getData(content, domain) {
        setTimeout(function() {
            if (volOn) {
                slideupSound.play();
            }
            $('.p2').slideUp(400).delay(100).queue(function(doit) {
                $('.p1').slideDown(400);
                if (volOn) {
                    slideSound.play();
                }
                setTimeout(function() {
                    var delaytm = 400;
                    $('.card').each(function() {
                        $(this).delay(delaytm).queue(function(doits) {
                            $(this).removeClass('hide').addClass('shiftcrd');
                            doits();
                        });
                        delaytm += 200;
                    });
                    var crds = [], temp = [], index = 0;
                    for (i = 0; i < $('.topic').length; i++) {
                        crds[i] = i;
                    }
                    data = [];
                    for (i = 0; i < 9; i++) {
                        var insert = _.random(content.length - 1);
                        data.push(content[insert]);
                        content.splice(insert, 1);
                    }
                    for (i = 0; i < data.length; i++) {
                        var img = data[i].Topic;
                        var start = 0, end = 0;
                        for (j = 0; j < 2; j++) {
                            index = crds[_.random(crds.length - 1)];
                            if (j === 0) {
                                start = index;
                            } else {
                                end = index;
                            }
                            var imgname = '' + img;
                            imgname = imgname.replace(' ', '_');
                            $('.topic').eq(index).html('<img src="img/' + domain + '/' + imgname + '.png">');
                            //                                    .parents().eq(1).children('.front').html('' + img);
                            temp.push(index);
                            crds = _.difference(crds, temp);
                        }
                        ans.push([start, end]);
                    }
                    finish = false;
                }, 400);
                doit();
            });
        }, 3000);
    }

});


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