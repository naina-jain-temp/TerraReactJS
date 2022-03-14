$(window).on("load", function () {
    setTimeout(function(){ $('body').removeClass('load');}, 3000);
    setTimeout(function(){$('.btn-step.prev').removeAttr("disabled"); }, 1000);
  });
  if($("#drawer").length > 0){

    Plutchik.default({
      element: '#drawer'
    });
  }

  $("#drawer a").on("click",function(){
    if($(this)[0].className.baseVal.split('-')[1] != '3'){
      var clickValue = $(this).attr('title')  
      alert(clickValue);
      window.location.href='step-2.html';
    }else{
      $(this)[0].classList.remove('active');
    }
    
  })

  $(".btn-step.prev").on('click',function(){
    var currantStep = $(this).attr('tabindex')
    if(currantStep == -1){
      window.location.href='steps.html';
    }
    setTimeout(function(){$('.btn-step.prev').removeAttr("disabled"); }, 1000);
  
  });
  $(".btn-step.next").on('click',function(){
    setTimeout(function(){$('.btn-step.prev').removeAttr("disabled"); }, 1000);
    
  
  });


