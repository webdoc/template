// jQuery.collapse.js
// 
// 0.1
// 
// Collapses a node to a given height by truncating it's contents
// and adding a 'more...' link. 0.1 is quick and dirty. It may fail
// if the inner HTML is more than one child deep. It makes assumptions
// about the height the more link adds (+ 36). It must be called on
// a jQuery object of length 1. In other words, it's a bit sucky.
// 
// jQuery(node).collapse(60);

(function() {
	var debug = (window.console && window.console.log);
	
	jQuery.fn.collapse = function(limitHeight) {
		
		// If the header is too tall, truncate its contents and add a
		// more button. This is quick and dirty - it will fail if the
		// header html is complex.
		
		var header = this,
		    height = header.height(),
		    more = '<a href="#toggle">more ▾</a>',
		    less = '<a href="#toggle">close ▴</a>',
		    textLength = 80,
		    openHtml, closeHtml, openHeight, closeHeight, children,
		    length, last, truncHtml, state;
		
		// Make sure we're dealing with a number (hopefully in px).
		limitHeight = parseInt(limitHeight);
		
		if (height > limitHeight) {
			// Store the full header html. We need it later.
			openHtml = [header.html(), less].join('');
			openHeight = header.outerHeight() + 36;
			state = false;
			
			while (header.height() > limitHeight) {
				if (debug) { console.log(header.height()); }
				children = header.children();
				last = children.last().remove();
			}
			
			// Truncate text in the last child
			truncHtml = [last.html().slice(0, textLength), '&hellip;'].join('');
			
			last
			.html(truncHtml)
			.css({ marginBottom: 0 });
			
			header
			.append(last)
			.append(more);
			
			closeHtml = header.html();
			closeHeight = header.outerHeight();
			
			header.css({ height: closeHeight });
			
			header
			.delegate('a[href="#toggle"]', 'mousedown touchstart', function(e) {
				if (state) {
					header
					.css({ height: closeHeight })
					.html(closeHtml);
				}
				else {
					header
					.css({ height: openHeight })
					.html(openHtml);
				}
				
				state = !state;
			});
		}
		
		return this;
	}
})();