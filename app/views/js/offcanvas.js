// offcanvas
(function($) {
  $(function() { // DOM Ready

    // Toggle navigation
    $('#nav-toggle').click(function() {
      this.classList.toggle("isOpen");
      // If sidebar is visible:
      if ($('body').hasClass('show-nav')) {
        // Hide sidebar
        $('body').removeClass('show-nav');
      } else { // If sidebar is hidden:
        $('body').addClass('show-nav');
        // Display sidebar
      }
    });
  });
  
})(jQuery);

$(document).ready(function(){
	$('.in-nav ul li a').on('click', function(){
  	$('.in-nav ul li a').removeClass('action');
  	$(this).addClass('action');
  });
});
// end offcanvas