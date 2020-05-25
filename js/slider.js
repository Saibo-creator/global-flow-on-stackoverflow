var sheet = document.createElement('style'),  
  $rangeInput = $('.range input'),
  prefs = ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'];

document.body.appendChild(sheet);

var getTrackStyle = function (curVal) {  
  var val = curVal * 20,
      style = '';
  
  

  // Set active label
  $('.range-labels li').removeClass('active selected');
  
  var curLabel = $('.range-labels').find('li:nth-child(' + (parseInt(curVal) + 1) + ')');
  
  curLabel.addClass('active selected');
  curLabel.prevAll().addClass('selected');
  
  // Change background gradient
  for (var i = 0; i < prefs.length; i++) {
    style += '.range {background: linear-gradient(to right, #37adbf 0%, #37adbf ' + val + '%, #000 ' + val + '%, #000 100%)}';
    style += '.range input::-' + prefs[i] + '{background: linear-gradient(to right, #37adbf 0%, #37adbf ' + val + '%, #fff ' + val + '%, #fff 100%)}';
  }

  return style;
}

$rangeInput.on('input', function () {
    progress = parseInt($(this).val())
    
    countries.attr("style", function(d, i) {
      return getCountryStyleString(surveyData, d, i, progress);
  })
  sheet.textContent = getTrackStyle($(this).val());
});

// Change input value on label click
$('.range-labels li').on('click', function () {
  var index = $(this).index();
  if (playing){
      $('#play-btn').trigger('click')
  }
  $rangeInput.val(index).trigger('input');
  
});

let playing = false
let interval
let progress = 0.0
$('#play-btn').on('click', function () {
    if (!playing){
        playing = true
        $(this).html("&#9632;")
        interval = setInterval(function(){
            if (progress >= 5){
                progress = 0
                if (!islooping)
                    $('#play-btn').trigger('click')
                return
            }
            progress += 0.1
            countries.attr("style", function(d, i) {
              return getCountryStyleString(surveyData, d, i, progress);
          })
            sheet.textContent = getTrackStyle(Math.floor(progress));
            $rangeInput.val(Math.floor(progress))
        }, 100)
    }
    else {
        playing = false
        $(this).html("&#9654;")
        clearInterval(interval)
    }
})

let islooping = false
$('#loop-btn').on('click', function () {
    if (!islooping) {
        $(this).removeClass("loop-btn-inactive").addClass("loop-btn-active")
        $(this).blur()
    }
    else {
        $(this).removeClass("loop-btn-active").addClass("loop-btn-inactive")
        $(this).blur()
    }
    islooping = !islooping
})