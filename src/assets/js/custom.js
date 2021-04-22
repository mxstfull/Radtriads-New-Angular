function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
}
function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
}

$(document).ready(function() {
	$('.open-sub').click(function() {
		$(this).next().slideToggle();
		$(this).children().toggleClass('fa-angle-down');
	});
	$('#rename-modal .btn-ok').click(function() {
		$('#rename-modal').slideUp();
		$('.modal-backdrop.show').slideUp();
	});
});

$(document).ready(function() {
	$('.owl-carousel.testimonial-slider').owlCarousel({
		loop: true,
		autoplay: true,
		nav: true,
		items: 1,
		navText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
		margin:0
	});
});

$(window).on("load", function(){ 
  var range = $("#range").attr("value");
  $(".rslide").css("width", "50%");
  $(document).on('input change', '#range', function() {
    var slideWidth = $(this).val() * 100 / 100;
    $(".rslide").css("width", slideWidth + "%");
});
});

var box = document.getElementById('myBox');
var box = document.getElementById('fu-list');
new SimpleBar(box);







