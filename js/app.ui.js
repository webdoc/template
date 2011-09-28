// Stop scroll from escaping and scrolling the outer document (the webdoc page).

jQuery(document)
.blockScroll()
.ready(function() {
	// If the header is too tall, truncate its contents and add a
	// more button. This is quick and dirty - it will fail if the
	// header html is complex.
	
	var header = jQuery('#header'),
	    height = header.height(),
	    more = '<a href="#toggle">more ▾</a>',
	    less = '<a href="#toggle">close ▴</a>',
	    textLength = 80,
	    openHtml, closeHtml, openHeight, closeHeight, children,
	    length, last, truncHtml, state;
	
	// 72 is 4 line of text at 1.5em line-height.
	if (height > 72) {
		// Store the full header html. We need it later.
		openHtml = [header.html(), less].join('');
		openHeight = header.outerHeight() + 36;
		state = false;
		
		while (header.height() > 71) {
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
})