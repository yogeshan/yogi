var GAME_COUNTER_SERVLET=15;
var RIGHT_ANSWERS=0;
var WRONG_ANSWERS=0;
var START_TIME;
var TIME_PLAYED;
$(document).ready(function(){
    setTimeout(function(){
        var windowheight = $(window).height();
        var windowwidth = $(window).width();
        var pagecenterW = windowwidth/2;
        var pagecenterH = windowheight/2;
        $("#game").css({
            'margin-top': pagecenterH-254 + 'px'
        });
                    
    }, 1000);
    loadGameCounter();    
    
    $('.levels').circleMenu({
        direction:'top', 
        trigger:'click',
        speed:400,
        step_in:70,
        step_out:60,
        circle_radius:180,
        open: function(){
        //console.log('menu opened');
        },
        close: function(){
                   
        //                        console.log('menu closed');
        },
        init: function()
        {
        //                        console.log('menu initialized');
        },
        select: function(evt,index)
        {
        //                        console.log(index);
        }
    });
            
});
function loadGameCounter(){
    $.ajax({
        url:'LoadGameCounter',
        type:'POST',
        success:function(msg){
            if(msg.status=='s'){
                GAME_COUNTER_SERVLET=eval(msg.c);
            }else{
                GAME_COUNTER_SERVLET=15;
            }
        }
    });
}          

$('.levels .btn3d').click(function(){
    
    if($(this).closest('li').index()!=0){
        $('.pt-page').eq(0).attr('class','pt-page pt-page-1 pt-page-current');
        $('.pt-page').eq(1).attr('class','pt-page pt-page-2');
                
                
        $('.pt-page').eq(0).addClass('pt-page-current  pt-page-rotateBottomSideFirst');
        $('.pt-page').eq(1).addClass('pt-page-current  pt-page-moveFromBottom pt-page-delay200 pt-page-ontop');
        $('.cols').eq(0).addClass('shaken');
        $('.cols').eq(1).addClass('shakenC');
        $('.cols').eq(2).addClass('shaken');
        
        if($(this).closest('li').index()==1){
            timer_speed=4
        }
        if($(this).closest('li').index()==2){
            timer_speed=3
        }
        if($(this).closest('li').index()==3){
            timer_speed=2
        }
        
        $('#score').text('0');
        $('#final-score').text('Stars gained: 0');
        gameCounter=GAME_COUNTER_SERVLET;
        //    generateRandom();
        
        RIGHT_ANSWERS=0;
        WRONG_ANSWERS=0;

        setTimeout(generateRandom, 1800);
        setTimeout("START_TIME=new Date();",1800);
    }
    
    
    
    
                
});
$('.home').click(function(){
    $('.cols').eq(0).removeClass('shaken');
    $('.cols').eq(1).removeClass('shakenC');
    $('.cols').eq(2).removeClass('shaken');
    $('.pt-page').eq(0).attr('class','pt-page pt-page-1 ');
    $('.pt-page').eq(1).attr('class','pt-page pt-page-2 pt-page-current');
                
    $('.pt-page').eq(1).addClass('pt-page-current  pt-page-rotateTopSideFirst');
    $('.pt-page').eq(0).addClass('pt-page-current  pt-page-moveFromTop pt-page-delay200 pt-page-ontop');
    gameCounter=-1;
    $('.btnNew-con').slideUp(300);
    $('.loader-con').slideDown(400);
    setTimeout("$('#score').text('0');$('#final-score').text('Stars gained: 0');", 1800);
});

$('.btnHome').click(function(){
    $('#modal_game').bPopup().close();
    $('.cols').eq(0).removeClass('shaken');
    $('.cols').eq(1).removeClass('shakenC');
    $('.cols').eq(2).removeClass('shaken');
    $('.pt-page').eq(0).attr('class','pt-page pt-page-1 ');
    $('.pt-page').eq(1).attr('class','pt-page pt-page-2 pt-page-current');
    $('.pt-page').eq(1).addClass('pt-page-current  pt-page-rotateTopSideFirst');
    $('.pt-page').eq(0).addClass('pt-page-current  pt-page-moveFromTop pt-page-delay200 pt-page-ontop');
    gameCounter=-1;
    $('.btnNew-con').slideUp(300);
    $('.loader-con').slideDown(400);
    setTimeout("$('#score').text('0');$('#final-score').text('Stars gained: 0');", 1800);
});














/*****************************************/
/*****************************************/
/************** Game *********************/
/*****************************************/
/*****************************************/


$('.stars').circleMenu({
    direction:'top-half', 
    trigger:'click',
    speed:400,
    step_in:70,
    step_out:60,
    circle_radius:80,
                
    open: function(){
    //console.log('menu opened');
    },
    close: function(){
        var cnt=$('.stars').find('li').length-1;
        if(eval($('#score').text())+cnt>100)
            $('#score').css('font-size','16pt');
        $('#score').text(eval($('#score').text())+cnt);
                        
        $('#final-score').text('Stars gained: '+$('#score').text());
                        
        $('.stars').children().eq(0).nextAll().remove();
    //                        console.log('menu closed');
    },
    init: function()
    {
    //                        console.log('menu initialized');
    },
    select: function(evt,index)
    {
    //                        console.log(index);
    }
});








var timer_speed=4;

var stars=0;
var timer_id=[];
var gameCounter=-1;
var arrColor=["red","blue","green","black","orange","yellow","violet"];
$('.btnNew').click(function(){
    $('#score').text('0');
    $('#final-score').text('Stars gained: 0');
    gameCounter=GAME_COUNTER_SERVLET;
    RIGHT_ANSWERS=0;
    WRONG_ANSWERS=0;
    START_TIME=new Date();
    
    $('#modal_game').bPopup().close();
    
    $('.btnNew-con').slideUp(300);
    $('.loader-con').slideDown(400);
                
    generateRandom();
});

            
            
function generateRandom(){
                
                
    if(gameCounter<0){
                    
        $('#color-box').text(' ');
        if($('.pt-page-2').hasClass('pt-page-ontop')){
            
            var END_TIME=new Date();
            TIME_PLAYED=(END_TIME.getTime()-START_TIME.getTime())/1000
            
            $('#modal_game').bPopup({
                easing: 'easeOutBounce', //uses jQuery easing plugin
                speed: 900,
                transition: 'slideDown'
            });
            
            setTimeout("submitScores(TIME_PLAYED);", 1900);
        }
        
                    
        return;
    }else{
        gameCounter--;
        if(gameCounter<0){
            $('#counter').empty();
            generateRandom();
            
            return;
        }    
                    
                
        var rnd=getRandomInt(0,arrColor.length-1);
                    
        var text=$('#color-box').text();
        do
        {
            rnd=getRandomInt(0,arrColor.length-1);
                        
        }
        while(text==arrColor[rnd]);
                    
        $('#color-box').text(arrColor[rnd]);
                    
                    
        var dec=getRandomInt(0,10);
        if(dec%2==0){
            //same color
            $('#color-box').data('c',arrColor[rnd]);
            $('#color-box').css('color',arrColor[rnd]);    
        }else{
            var rnd=getRandomInt(0,arrColor.length);
            $('#color-box').data('c',arrColor[rnd]);
            $('#color-box').css('color',arrColor[rnd]);    
        }
                   
                
        $('#counter').pieChartCountDown({
            time : timer_speed,
            color:'#FFF',
            background: '#42c0fc',
            border:9,
            size : 40,
                   
            infinite : false,
            callback : function($counter) {
                WRONG_ANSWERS++;           
                $('.stars').circleMenu('close');
                generateRandom();
            }
        }); 
                    
        $('#score').addClass('active');
        setTimeout("$('#score').removeClass('active')",1000);
        //                    $('#score').text(score);
                    
        for (var t = 0;  t < timer_id.length;  t++) {
            clearTimeout(timer_id[t]);
        }
        stars=5;
        if(timer_speed==4){
            timer_id[0]= setTimeout("stars=4", 2000);
            timer_id[1]= setTimeout("stars=3", 3500);
        }
        if(timer_speed==3){
            timer_id[0]= setTimeout("stars=4", 1500);
            timer_id[1]= setTimeout("stars=3", 2500);
        }
        if(timer_speed==2){
            timer_id[0]= setTimeout("stars=4", 1000);
            timer_id[1]= setTimeout("stars=3", 1500);
        }
       
    }
               
}
function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
            
            
$("body").keyup(function(e) {
                
    var cnt=$('.stars').find('li').length-1;
    if(cnt>10){
        $('#score').text(eval($('#score').text())+cnt);
        $('.stars').children().eq(0).nextAll().remove();
                    
    }
                        
    if(e.keyCode == 37) { // left
        if(gameCounter<0){
            return;
        }
        var text=$('#color-box').text();
        var c=$('#color-box').data('c');
        if(text!=c){
            //                        score+=increment;
            //change img
            RIGHT_ANSWERS++;
            playEffect();
            if(rgtInd>rightArr.length-1){
                rgtInd=0;
                rightArr=shuffle(rightArr);
            }
            $('.img-yes .label-d').text(rightArr[rgtInd++]);
                        
            var htm='';
            for (var t = 0;  t < stars; t++) {
                htm+='<li></li>';
            }
            $('.stars').append(htm).circleMenu('init');
            $('.stars').circleMenu('open');
            setTimeout("$('.stars').circleMenu('close');",450);
                        
            $('.img-yes img').attr('src','icons/i/yes_r.png');
            $('.img-yes').fadeIn();
        }else{
            //change img
                        
            WRONG_ANSWERS++;           
            if(wrgInd>wrongArr.length-1){
                wrgInd=0;
                wrongArr=shuffle(wrongArr);
            }
            $('.img-no .label-d').text(wrongArr[wrgInd++]);
                        
            $('.img-no img').attr('src','icons/i/no_w.png');
            $('.img-no').fadeIn();
            $('.stars').children().eq(0).nextAll().remove();
                        
        }  
                    
        $('.img-yes').fadeOut('slow');
        $('.img-no').fadeOut('slow');
                    
        generateRandom();
    }
    else if(e.keyCode == 39) { // right
        if(gameCounter<0){
            return;
        }
        
                    
        var text=$('#color-box').text();
        var c=$('#color-box').data('c');
        if(text==c){      
            //change img
            //                        score+=increment;
            RIGHT_ANSWERS++;
            playEffect();
            if(rgtInd>rightArr.length-1){
                rgtInd=0;
                rightArr=shuffle(rightArr);
            }
            $('.img-yes .label-d').text(rightArr[rgtInd++]);
                        
                        
            var htm='';
            for (var t = 0;  t < stars; t++) {
                htm+='<li></li>';
            }
            $('.stars').append(htm).circleMenu('init');
            $('.stars').circleMenu('open');
            setTimeout("$('.stars').circleMenu('close');",450);
                        
                        
            $('.img-yes img').attr('src','icons/i/yes_r.png');
            $('.img-yes').fadeIn();
        }else{
            //change img
            WRONG_ANSWERS++;
            if(wrgInd>wrongArr.length-1){
                wrgInd=0;
                wrongArr=shuffle(wrongArr);
            }
            $('.img-no .label-d').text(wrongArr[wrgInd++]);
                        
            $('.img-no img').attr('src','icons/i/no_w.png');
            $('.img-no').fadeIn();
            $('.stars').children().eq(0).nextAll().remove();
            if(score>0){
            //                            score-=decrement;  
            }
        }
                    
        $('.img-yes').fadeOut('slow');
        $('.img-no').fadeOut('slow');
        generateRandom();
                    
    }
});
            
            
            
            
$('.left-arrow').click(function(e){
    e = $.Event('keyup');
    e.which = 37; 
    e.keyCode = 37; 
    $("body").trigger(e);
});
$('.right-arrow').click(function(e){
    e = $.Event('keyup');
    e.which = 39; 
    e.keyCode = 39; 
    $("body").trigger(e);
});
            
            
            
            
            
   
            
var rightArr=["Awesome!","Great job!","Nice work!"];
var wrongArr=["Oops!","Nice try!","Hard luck!","Close enough!"]
var rgtInd=0;
var wrgInd=0;
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};
/**************Game Ends*********************/






function submitScores(time){
//    return false;
    var s_score=$('#score').text();
    $.ajax({
        url:'SubmitScore',
        type:'POST',
        data:{
            c:RIGHT_ANSWERS,
            w:WRONG_ANSWERS,
            s:s_score,
            p_t:time,
            l:timer_speed
        },
        success:function(data){
            if(data.status=='e'){
                alert('Something went wrong');
            }else if(data.status=='se'){
                top.location.href='Game.html';
            }else if(data.status=='f'){
                alert(data.msg);
            }else if(data.status=='s'){
                $('.loader-con').slideUp(300); 
                $('.btnNew-con').slideDown(400);
                
                
                
            }
        }
    });  
}