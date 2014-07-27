//$('.help-msg').html('Hi<a href="#" class="close-help-first">Next <img src="icons/temp/arrow-69-16.png" /></a>')
//startInstruction();

function startInstruction(){
    if($('.pt-page-2').hasClass('pt-page-delay200')){
        
    }else{
        $('.pt-page').eq(0).attr('class','pt-page pt-page-1 pt-page-current');
        $('.pt-page').eq(1).attr('class','pt-page pt-page-2');
        $('.pt-page').eq(0).addClass('pt-page-current  pt-page-rotateBottomSideFirst');
        $('.pt-page').eq(1).addClass('pt-page-current  pt-page-moveFromBottom pt-page-delay200 pt-page-ontop');
    }
    
    if(GAME_STOP){
        // Show Help
        var html='';
        var style='style="width:192px;height:184px;line-height: 180px;"';
    
        html+='<div class="row">'
        
        html+='<div class="col-help right helper-2" '+style+'>'+
        '<div class="val">6</div>'+
        '<div class="left"></div>'+
        '<div class="right"></div>'+
        '</div>';
        html+='<div class="col-help wrong" '+style+'>'+
        '<div class="val"></div>'+
        '<div class="left"></div>'+
        '<div class="right"></div>'+
        '</div>';
            
        html+="</div>"
        
        html+='<div class="row">'
        html+='<div class="col-help wrong" '+style+'>'+
        '<div class="val"></div>'+
        '<div class="left"></div>'+
        '<div class="right"></div>'+
        '</div>';
        html+='<div class="col-help right helper-1" '+style+'>'+
        '<div class="val">3</div>'+
        '<div class="left"></div>'+
        '<div class="right"></div>'+
        '</div>';
        html+="</div>"
        $('.container_g').empty();
        $('.container_g').html(html);
        
        
    
    
    
    
        $('#helper .help-arrow').hide();
        $('#helper').css('width','590px');
        var windowheight = $('.pt-page-2').height();
        var windowwidth = $('.pt-page-2').width();
        var pagecenterW = windowwidth/2;
        var pagecenterH = windowheight/2;
        $("#helper").css({
            top: pagecenterH + 'px',
            left:pagecenterW-305 +'px'
        });
    
        $('.help-msg').html('Now you will be shown blocks with number. <a href="#" class="close-help-first">Next <img src="icons/temp/arrow-69-16.png" /></a>');
          
    }else{
        //Inform his game will be closed
        windowheight = $('.pt-page-2').height();
        windowwidth = $('.pt-page-2').width();
        pagecenterW = windowwidth/2;
        pagecenterH = windowheight/2;
        $("#helper").css({
            top: pagecenterH-50+ 'px',
            left:pagecenterW-305 +'px'
        });
        $('.help-msg').html('Your current game will be interrupted.<br>Do you want to learn how to play?<br><br><span class="btn-yes">Yes</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="btn-no">No</span>');
        
        
    }
        
    $("#helper").show(); 

}

$('.help-msg .btn-yes').live('click',function(){
    
    //arcade
    clearTimeout(arcade_timeout[0]);
    clearTimeout(arcade_timeout[1]);
    $('.bar').stop();
    $('#game_progress').hide();
    
    
    
    //classic
    $('.liferrr').hide();
    $('.liferrr').html('<div class="life-container"><img src="icons/favorite-2-48.png" /></div><div class="life-container"><img src="icons/favorite-2-48.png" /></div><div class="life-container"><img src="icons/favorite-2-48.png" /></div>');
    
    
    $('#score').text('0');
    $('#final-score').text('Stars earned: 0');
    $('.container_g').empty();
    $('#counter').empty();
    GAME_STOP=true;
    $("#helper").hide(); 
    startInstruction();
});
$('.help-msg .btn-no').live('click',function(){
    $("#helper").hide(); 
});


$('.close-help-first').live('click',function(){
    $('#helper').hide();
    showHelper();
});
$('.close-help-second').live('click',function(){
    $('#helper').hide();
    
    $('.container_g .col-help.right').removeClass('active');
    $('.container_g .col-help').addClass('ready');
    $('.helper-2').removeClass('ready');
    $('#helper .help-arrow').attr('src','icons/temp/first.png').css('left','100%');
    $('#helper .help-arrow').show().css('right','-68px').css('top','18px');
    
    $('.help-msg').html('Click here');
    $('#helper').css('width','200px');
    $('#helper').css('top',eval(eval($('#helper').css('top').substring(0,$('#helper').css('top').length-2))-20)+'px');
    
    $('#helper').css('left',eval(eval($('#helper').css('left').substring(0,$('#helper').css('left').length-2))+140)+'px');
    
    setTimeout("$('#helper').fadeIn()",300);
    
});
function showHelper(){
    setTimeout("$('#helper').fadeIn()",500);
    $('.container_g .col-help.right').addClass('active');
    $('.help-msg').html('<a href="#" class="close-help-second">Next <img src="icons/temp/arrow-69-16.png" /></a>Now you have to remember the numbers in ascending order. ');
}

$('.helper-1.ready').live('click',function(){
    $('#helper').hide();
    setTimeout("$('#helper').fadeIn()",300);
    $('.helper-2').addClass('ready');
    $('#helper .help-arrow').attr('src','icons/temp/second.png');
    
    $('#helper .help-arrow').show().css('left','-64px').css('top','-47px');
    
    $('#helper').css('top',eval(eval($('#helper').css('top').substring(0,$('#helper').css('top').length-2))+50)+'px');
    
    $('#helper').css('left',eval(eval($('#helper').css('left').substring(0,$('#helper').css('left').length-2))+120)+'px');
    
    $(this).addClass('active').removeClass('ready');
// change position
});

$('.helper-2.ready').live('click',function(){
    $('#helper').hide();
    setTimeout("$('#helper').fadeIn()",500);
    $(this).addClass('active').removeClass('ready');
    // change position
    
    $('#helper .help-arrow').hide()
    $('#helper').css('width','590px');
    var windowheight = $('.pt-page-2').height();
    var windowwidth = $('.pt-page-2').width();
    var pagecenterW = windowwidth/2;
    var pagecenterH = windowheight/2;
    $("#helper").css({
        top: pagecenterH + 'px',
        left:pagecenterW-305 +'px'
    });
    
    
    $('.help-msg').html('Congratulations! you have learnt how to play mind game. <br><br><span onclick="startInstruction();">Play again</span> <span class="home">Home</span>');
});

$('.col-help.wrong.ready').live('click',function(){
    $(this).addClass('active');
    // change position
    $('.help-msg').html('Wrong block');
    setTimeout("$('.col-help.wrong').removeClass('active');$('.help-msg').html('Click here');",1000);
    
});