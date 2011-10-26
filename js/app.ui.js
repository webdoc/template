// Stop activate events caching references to links. Links
// can be generated dynamically, so caching them is a problem.

jQuery.event.special.activate.options.cache = false;


// Block scroll events from escaping the iframe, and limit
// the height of the header.

jQuery(document)
.blockScroll()
.ready(function() {
	var header = jQuery('#header');
	
	header.collapse(72);
});