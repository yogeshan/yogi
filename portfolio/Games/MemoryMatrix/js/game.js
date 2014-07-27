var GAME_MODE;
var GAME_STOP=true;
var arcade_timeout=[];

var level=2;
var rows=[];
var chance;
var click_start_flag=false;
var START_TIME;
var MAIN_GAME_START_TIME;
var cols;
var level_sublevel=1;
var timer_counter=5;
var PLAY_TIME_FOR_ARCADE=60000;

$('.levels .btn3d').click(function(){
    if($(this).closest('li').index()!=0){
        $('.pt-page').eq(0).attr('class','pt-page pt-page-1 pt-page-current');
        $('.pt-page').eq(1).attr('class','pt-page pt-page-2');
                
                
        $('.pt-page').eq(0).addClass('pt-page-current  pt-page-rotateBottomSideFirst');
        $('.pt-page').eq(1).addClass('pt-page-current  pt-page-moveFromBottom pt-page-delay200 pt-page-ontop');
        
        if($(this).closest('li').index()==1){
            GAME_MODE="classic"; // 3 wrong out of game
            $('.liferrr').show();
            setTimeout("MAIN_GAME_START_TIME=new Date();", 2000);
        }
        if($(this).closest('li').index()==2){
            GAME_MODE="arcade"; // one minute game
            $('#game_progress').show();
            
            
            $('.bar').removeClass('color4').removeClass('color3').css('width','100%');
            $('.bar').animate({
                width:0+'%',
                queue:false
            },PLAY_TIME_FOR_ARCADE,submitScoreArcade); // GAME STOP
            arcade_timeout[0]= setTimeout("$('.bar').removeClass('color4').removeClass('color3');$('.bar').addClass('color3');", 35000);
            arcade_timeout[1]= setTimeout("$('.bar').removeClass('color4').removeClass('color3');$('.bar').addClass('color4');", 40000);
        }
        if($(this).closest('li').index()==3){
            GAME_MODE="practice"; // play unlimited
            
        }
        $('.container_g').html('<div class="row"><div class="cols"></div><div class="cols"></div></div><div class="row"><div class="cols"></div><div class="cols"></div></div>');
        $('#score').text('0');
        $('#final-score').text('Stars earned 0');
        
        level=2;
        level_sublevel=1;
        click_start_flag=false;
        GAME_STOP=false;
        $('.label').animate({
            opacity:1
        },300);
        setTimeout("$('.label').animate({opacity:0},100);setTimeout(generateRandom,500);", 1200);
    }
    
    
    
    
                
});
$('.home').live('click',function(){
    if($('#modal_game').css('display')=='block'){
        $('#modal_game').bPopup().close();
    }
    $('.pt-page').eq(0).attr('class','pt-page pt-page-1 ');
    $('.pt-page').eq(1).attr('class','pt-page pt-page-2 pt-page-current');
                
    $('.pt-page').eq(1).addClass('pt-page-current  pt-page-rotateTopSideFirst');
    $('.pt-page').eq(0).addClass('pt-page-current  pt-page-moveFromTop pt-page-delay200 pt-page-ontop');
    
    
    //arcade
    clearTimeout(arcade_timeout[0]);
    clearTimeout(arcade_timeout[1]);
    $('.bar').stop();
    $('#game_progress').hide();
    
    
    
    //classic
    $('.liferrr').hide();
    $('.liferrr').html('<div class="life-container"><img src="icons/favorite-2-48.png" /></div><div class="life-container"><img src="icons/favorite-2-48.png" /></div><div class="life-container"><img src="icons/favorite-2-48.png" /></div>');
    
    
    
    $('.btnNew-con').slideUp(300);
    $('.loader-con').slideDown(400);
    
    setTimeout("$('#score').text('0');$('#final-score').text('Stars earned: 0');$('.container_g').empty();$('#counter').empty();", 1800);
    GAME_STOP=true;
    
});




function levelizor(){
    var arr=[];
    var levelizor=level; // because level may go upto 10,11
    if(levelizor>7){
        levelizor=7
    }
    
    for (i = 0; i < levelizor; i++) {
        arr.push(i);
    }
    rows=[];
    var i,j;
    var more=level_sublevel;
    for (i = 0; i < levelizor; i++) {
        var index = Math.floor(Math.random() * arr.length);
        var val = arr[index];
        arr.splice(index, 1);
        var cols=[];
        cols[val]=1;
                    
        if(more!=0){
            var temp=[];
            for (j = 0; j < levelizor; j++) {
                temp.push(j);
            }
            temp.splice(index, 1);
                    
            var numrnd=getRandomInt(0, levelizor/2-1);
            for (k = 0; k < numrnd; k++) {
                if(more!=0){
                    index = Math.floor(Math.random() * temp.length);
                    val = temp[index];
                    temp.splice(index, 1);
                    cols[val]=1;
                    more--;
                }
                            
            }
        }
        rows[i]=cols;
    }  
}

function level2(){
    rows=[];
    var i,j;
    for (i = 0; i < level; i++) {
        var cols=[];
        var num=getRandomInt(0,1);
        if(num==0){
            cols[0]=0;
            cols[1]=1;
        }else{
            cols[0]=1;
            cols[1]=0;
        }
        rows[i]=cols;
    }  
}








function generateRandom(){
    if(!GAME_STOP){
        rows=[];
        var i,j;
        click_start_flag=false;
        var style='';
        var show_duration=800;
        levelizor();
        if(level==2){
            level2();
            style='style="width:192px;height:184px;"';
            show_duration=800;
            chance=0
        }else if(level==3){
            style='style="width:130px;height:120px;"';
            show_duration=1000;
            chance=1;
        }else if(level==4){
            style='style="width:94px;height:88px;"';
            show_duration=1200;
            chance=2;
        }else if(level==5){
            style='style="width:76px;height:69px"';
            show_duration=1500;
            chance=3;
        }else if(level==6){
            style='style="width:64px;height:56px"';
            show_duration=1800;
            chance=4;
        }else if(level>=7){
            style='style="width:53px;height:47px"';
            show_duration=2000;
            chance=5;
        }
                 
        $('.container_g').empty();
        var html='';
        var levelizar=level; // because level may go upto 10,11
        if(levelizar>7){
            levelizar=7
        }
        for (i = 0; i < levelizar; i++) {
            html+='<div class="row">'
            for (j = 0; j < levelizar; j++) {
                if(rows[i][j]==1){
                    html+='<div class="cols right" '+style+'></div>';
                }else{
                    html+='<div class="cols" '+style+'></div>';
                }
                        
            }
            html+='</div>'
        }
        $('.container_g').html(html);
        setTimeout('show('+show_duration+');', 400);
    
    }         
}


function show(show_duration){
    var i,j;
    for (i = 0; i <= rows.length-1; i++) {
        for (j = 0; j < rows[i].length; j++) {
            if(rows[i][j]==1){
                $('.container_g').children().eq(i).children().eq(j).css('background','white');
            }
                        
        }
    }
    setTimeout("$('.cols').css('background','lime');click_start_flag=true;start_timer();", show_duration);
                
}








function start_timer(){
    START_TIME=new Date();
    //    if(GAME_MODE=='arcade'){
    $('#counter').pieChartCountDown({
        time : timer_counter,
        color:'#FFF',
        background: 'transparent',
        border:9,
        size : 60,
        infinite : false,
        callback : function($counter) {
            if(GAME_MODE=='classic'){
                
                $('.life-container').last().find('img').addClass('heart');
                
                if($('.life-container').length==1)
                {
                    setTimeout(classicChecker,1000);
                    $('.container_g').empty();
                    $('#counter').empty();
                    GAME_STOP=true;
                    return 0;
                }
                setTimeout(classicChecker,1000);
                
            }
                
            var generatorFlag=true;
            if(level_sublevel==0){
                
                
                
                
                
                
                level_sublevel=3;
                level--;
                if(level<2){
                    level=2;
                }
                generatorFlag=false;
                $('.label').text('LEVEL '+eval(level-1))
                $('.label').animate({
                    opacity:1
                },300);
                $('.container_g').empty();
                $('#counter').empty();
                setTimeout("$('.label').animate({opacity:0},100);setTimeout(generateRandom,500);", 1200);
            }
            level_sublevel--;
                        
            if(generatorFlag){
                setTimeout(generateRandom,500);
            }
                        
        }
    }); 
//    }
    
}
















$('.stars').circleMenu({
    direction:'top-half', 
    trigger:'click',
    speed:400,
    step_in:70,
    step_out:60,
    circle_radius:65,
    open: function(){
    //console.log('menu opened');
    },
    close: function(){
        $('#score').addClass('active');
        setTimeout("$('#score').removeClass('active')",1000);
                    
        var cnt=$('.stars').find('li').length-1;
        if(eval($('#score').text())+cnt>100)
            $('#score').css('font-size','16pt');
        $('#score').text(eval($('#score').text())+cnt);
        
        $('#final-score').text('Stars earned '+$('#score').text());
        
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




$('.cols').live('click',function(){
    if(click_start_flag){
        if($(this).hasClass('right')){
            $(this).addClass('active done').css('background','white');
            if($('.cols.right').length==$('.cols.done').length){
                click_start_flag=false;
                var END_TIME=new Date();
                var TIME_PLAYED=(END_TIME.getTime()-START_TIME.getTime())/1000;
                var stars=3;
                if(TIME_PLAYED<3){
                    stars=5;
                }else if(TIME_PLAYED<4){
                    stars=4;
                }else if(TIME_PLAYED<5){
                    stars=3;
                }
                var htm='';
                for (var t = 0;  t < stars; t++) {
                    htm+='<li></li>';
                }
                $('.stars').append(htm).circleMenu('init');
                playEffect();
                $('.stars').circleMenu('open');
                setTimeout("$('.stars').circleMenu('close');",450);
                
                
                $('#counter').empty();       
                level_sublevel++;
                
                
                
                var generatorFlag=true;
                if(level_sublevel>=3){
                    level_sublevel=0;
                    level++;
                    generatorFlag=false;
                    $('.label').text('LEVEL '+eval(level-1));
                    
                    if(level>7){
                        timer_counter--;
                    }else if(level>=4){
                        timer_counter=6;
                    }else if(level>=6){
                        timer_counter=7;
                    }else if(level<4)
                    {
                        timer_counter=5;
                    }
                    
                    $('.label').animate({
                        opacity:1
                    },300);
                    setTimeout("$('.label').animate({opacity:0},100);setTimeout(generateRandom,500);", 1200);
                               
                    
                    
                    
                }
                if(generatorFlag){
                    setTimeout(generateRandom,500);
                }
                   
            }
        }else{
            if(GAME_MODE=='classic'){
                
                $('.life-container').last().find('img').addClass('heart');
                
                if($('.life-container').length==1)
                {
                    setTimeout(classicChecker,1000);
                    $('.container_g').empty();
                    $('#counter').empty();
                    GAME_STOP=true;
                    return 0;
                }
                setTimeout(classicChecker,1000);
                
            }
            
            
            
            $(this).addClass('active').css('background','red');
            cols=$(this);
            setTimeout("cols.removeClass('active').css('background','lime');",300);
                        
            if(chance<=0){
                level--;
                level_sublevel=0;
                if(level<2){
                    level=2;
                }
                $('.container_g').empty();
                $('#counter').empty();
                            
                $('.label').text('LEVEL '+eval(level-1))
                $('.label').animate({
                    opacity:1
                },300);
                setTimeout("$('.label').animate({opacity:0},100);setTimeout(generateRandom,500);", 1200);
            }
            chance--;
        }
    }
    
});





function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function submitScoreArcade(){
    $('.container_g').empty();
    $('#counter').empty();
    GAME_STOP=true;
    $('#modal_game').bPopup({
        easing: 'easeOutBounce', //uses jQuery easing plugin
        speed: 900,
        transition: 'slideDown'
    });
    setTimeout("submitScores();", 1900);
//    setTimeout("$('.loader-con').slideUp(300); $('.btnNew-con').slideDown(400);",2000);
}


function classicChecker(){
    
    $('.life-container').last().animate({
        opacity:0
    },500,function(){
        $(this).remove();
        if($('.life-container').length==0){
            $('#modal_game').bPopup({
                easing: 'easeOutBounce', //uses jQuery easing plugin
                speed: 900,
                transition: 'slideDown'
            });
            
            setTimeout("submitScores();", 1900);
        //            setTimeout("$('.loader-con').slideUp(300); $('.btnNew-con').slideDown(400);",2000);

        }
    });
}


function submitScores(){
    //    return false;
    var s_score=$('#score').text();
    var ptc=0;
    if(GAME_MODE=='classic'){
        ptc=(new Date().getTime()-MAIN_GAME_START_TIME.getTime())/1000;
    }
    
    //Encryption starts
    var enc = base64.encode(s_score);
    s_score=enc;
    //Encryption ends
    
    $('.loader-con').slideUp(300); 
    $('.btnNew-con').slideDown(400);
//    $.ajax({
//        url:'SubmitScoreMM',
//        type:'POST',
//        data:{
//            m:GAME_MODE,
//            l:level,
//            s:s_score,
//            pta:PLAY_TIME_FOR_ARCADE,
//            ptc:ptc
//        },
//        success:function(data){
//            if(data.status=='e'){
//                alert('Something went wrong');
//            }else if(data.status=='se'){
//                top.location.href='Game';
//            }else if(data.status=='f'){
//                alert(data.msg);
//            }else if(data.status=='s'){
//                $('.loader-con').slideUp(300); 
//                $('.btnNew-con').slideDown(400);
//            }
//        }
//    });  
}



$('.btn-replay').click(function(){
    $('#modal_game').bPopup().close();
    
    clearTimeout(arcade_timeout[0]);
    clearTimeout(arcade_timeout[1]);
    $('.bar').stop();
    
    
    
    $('.btnNew-con').slideUp(300);
    $('.loader-con').slideDown(400);
    
    
    if(GAME_MODE=="classic"){
        // 3 wrong out of game
        $('.liferrr').html('<div class="life-container"><img src="icons/favorite-2-48.png" /></div><div class="life-container"><img src="icons/favorite-2-48.png" /></div><div class="life-container"><img src="icons/favorite-2-48.png" /></div>');
        $('.liferrr').show();
        setTimeout("MAIN_GAME_START_TIME=new Date();", 2000);
    }else if(GAME_MODE=="arcade"){
        // one minute game
        $('#game_progress').show();
        $('.bar').removeClass('color4').removeClass('color3').css('width','100%');
        $('.bar').animate({
            width:0+'%',
            queue:false
        },PLAY_TIME_FOR_ARCADE,submitScoreArcade); // GAME STOP
        arcade_timeout[0]= setTimeout("$('.bar').removeClass('color4').removeClass('color3');$('.bar').addClass('color3');", 35000);
        arcade_timeout[1]= setTimeout("$('.bar').removeClass('color4').removeClass('color3');$('.bar').addClass('color4');", 40000);
    }
    $('.container_g').html('<div class="row"><div class="cols"></div><div class="cols"></div></div><div class="row"><div class="cols"></div><div class="cols"></div></div>');
    $('#score').text('0');
    $('#final-score').text('Stars earned 0');
    level=2;
    level_sublevel=1;
    click_start_flag=false;
    GAME_STOP=false;
    $('.label').animate({
        opacity:1
    },300);
    setTimeout("$('.label').animate({opacity:0},100);setTimeout(generateRandom,500);", 1200);
});