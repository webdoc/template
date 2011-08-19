// template.ui.js

// Run jQuery without aliasing it to $

jQuery.noConflict();

// Handle dropdowns, popdowns and tabs

(function( jQuery, undefined ){
	var types = {
	    	'.tab': {
	    		activate: jQuery.noop,
	    		deactivate: jQuery.noop
	    	},
	    	
	    	'.popdown': {
	    		activate: function(e) {
	    			// We bind to document.body so that old popdowns are closed before new
	    			// ones are opened. Otherwise the deactivate from the old popdown
	    			// unbinds the mousedown function from the new popdown.
	    			jQuery.event.add(document.body, 'mousedown touchstart', mousedown, { target: e.target });
	    		},
	    		
	    		deactivate: function(e) {
	    			jQuery.event.remove(document.body, 'mousedown touchstart', mousedown);
	    		}
	    	},
	    	
	    	'.dropdown': {
	    		activate: function(e) {
	    			// We bind to document.body so that old dropdowns are closed before new
	    			// ones are opened. Otherwise the deactivate from the old dropdown
	    			// unbinds the mousedown function from the new dropdown.
	    			jQuery.event.add(document.body, 'mousedown touchstart', mousedown, { target: e.target });
	    			jQuery.event.add(e.currentTarget, 'click', click);
	    		},
	    		
	    		deactivate: function(e) {
	    			jQuery.event.remove(document.body, 'mousedown touchstart', mousedown);
	    			jQuery.event.remove(e.currentTarget, 'click', click);
	    		}
	    	}
	    },
	
	    selector = Object.keys(types).join(', ');
	
	function activate(elem) {
		elem.trigger('activate');
	}
	
	function deactivate(elem) {
		elem.trigger('deactivate');
	}
	
	function preventDefault(e) {
		e.preventDefault();
	}
	
	function mousedown(e) {
		var target = e.data.target,
		    data;
		
		// If event is in it or on it, do nothing.
		if (target === e.target || jQuery.contains(target, e.target)) {
			return;
		}
		
		//data = jQuery.data(target, 'active');
		
		jQuery(target).trigger('deactivate');
	}
	
	function click(e) {
		// If we've clicked on a file input inside it, wait
		// for the input to change. This is a fix for file
		// inputs not firing change events when they're made
		// invisible. Deserves further investigation.
		if (e.target.nodeName.toLowerCase() === 'input' && document.getAttribute('type') === 'file') {
			jQuery.event.add(e.target, 'change', function(e){
				jQuery(target).trigger('deactivate');
			});
			
			return;
		}
		
		jQuery(e.currentTarget).trigger('deactivate');
	}
	
	function close(e) {
		var elem = jQuery(e.currentTarget).closest(selector);
		
		if (elem.length) {
			e.preventDefault();
			elem.trigger('deactivate');
		}
	}
	
	
	jQuery(document)
	
	// Mousedown on buttons toggle activate on their targets
	.delegate('a[href^="#"]', 'mousedown touchstart', function(e) {
		var link = jQuery(e.currentTarget),
				href = link.attr('href'),
				elem, data, type, t;
		
		elem = jQuery(href);
		
		if (elem.length === 0) { return; }
		
		// Get the active data that may have been created by a previous
		// activate event.
		data = jQuery.data(elem[0], 'active');
		
		// Decide what type this object is.
		if (data && data.type) {
			type = data.type;
		}
		else {
			for (t in types) {
				if (elem.is(t)) {
					type = t;
					break;
				}
			}
		}
		
		// If it has no type, we have no business trying to activate
		// it on mousedown.
		if (!type) { return; }
		
		e.preventDefault();
		
		link.bind('click', preventDefault);
		
		if ((data && data.state) || elem.hasClass('active')) {
			
		}
		else {
			elem.trigger('activate');
			
			if (!data) {
			  jQuery.data(elem[0], 'active').type = type;
			}
		}
	})
	.delegate('a[href="#close"]', 'click', close)
	.delegate('.popdown', 'activate', types['.popdown'].activate)
	.delegate('.popdown', 'deactivate', types['.popdown'].deactivate)
	.delegate('.dropdown', 'activate', types['.dropdown'].activate)
	.delegate('.dropdown', 'deactivate', types['.dropdown'].deactivate);
})( jQuery );




// Handle form elements

(function(document, undefined){
	var doc = jQuery(document);
	
	doc
	
	// Extend the events emitted by input[type='range']
	// nodes with changestart and changeend events.
	
	.delegate('input[type="range"]', 'mousedown touchstart', (function(){
		var endTypes = {
			mousedown: 'mouseup',
			touchstart: 'touchend'
		};
		
		function change(e){
			jQuery(e.target)
			.trigger({ type: 'changestart' })
			.unbind('change', change);
		}
		
		function mouseup(e){
			jQuery(e.target)
			.trigger({ type: 'changeend' })
			.unbind('mouseup', mouseup);
		}
		
		return function(e){
			jQuery(e.target)
			.bind('change', change)
			.bind(endTypes[ e.type ], mouseup);
		};
	})())
	
	// Global form validation
	
	.delegate( 'input, textarea', 'change', function(e) {
		jQuery(this).validate({
			fail: function(){ e.preventDefault(); }
		});
	});
	
	// Create placeholder labels when browser does not
	// natively support placeholder attribute.
	
	//if ( !jQuery.support.placeholder ) {
	//	
	//	doc
	//	.delegate('textarea[placeholder], input[placeholder]', 'change valuechange', function(){
	//		var input = jQuery(this),
	//				value = input.val();
	//		
	//		if ( !value || !value.length ) {
	//			input.addClass('empty');
	//		}
	//		else {
	//			input.removeClass('empty');
	//		};
	//	})
	//	
	//	// TODO: bind DOMNodeInserted only at the end of the
	//	// ready function, as we're not actually interested in
	//	// processing DOM nodes that get inserted before that.
	//	// Also, find a way of emulating DOMNodeInserted in IE.
	//	
	//	.bind('ready DOMNodeInserted', (function(){
	//		var ignore = false;
	//		
	//		function identify(node){
	//			// Generate an id, apply it to the input node
	//			// and return it.
	//			return (node.id = 'input_' + parseInt(Math.random() * 100000000));
	//		}
	//		
	//		return function(e){
	//			var elem;
	//			
	//			//console.log('DOM node inserted', e.target);
	//			
	//			if (ignore) { return; }
	//			
	//			// Look for nodes with placeholder attributes.
	//			elem = (
	//				e.target.getAttribute && e.target.getAttribute('placeholder') ?
	//					jQuery(e.target) :
	//				e.target.childNodes.length ?
	//					jQuery('textarea[placeholder], input[placeholder]', e.target) :
	//					false
	//			);
	//			
	//			if (!elem || !elem.length) { return; }
	//			
	//			console.log('DOM node inserted, needs placeholder', e.target);
	//			
	//			elem.each(function(i){
	//				var input = jQuery(this),
	//						id, value, height, position, text, placeholder;
	//				
	//				// If placeholder already exists, do nothing.
	//				if (input.data('placeholder')) { return; }
	//				
	//				id = this.id || identify(this);
	//				value = input.val();
	//				height = input.is('input') ? input.outerHeight() : input.css('lineHeight');
	//				position = input.position();
	//				text = input.attr('placeholder');
	//				placeholder = jQuery('<label/>', {
	//				  html: text,
	//				  'for': id, 
	//				  'class': 'placeholder',
	//				  
	//				  // It's not really my style to be setting CSS in
	//				  // JavaScript, but it seems to make sense here.
	//				  // Let's see how this plays out.
	//				  css: {
	//				  	top: position.top,
	//				  	left: position.left,
	//				  	height: height,
	//				  	lineHeight: height + 'px',
	//				  	paddingLeft: input.css('paddingLeft'),
	//				  	paddingRight: input.css('paddingRight')
	//				  }
	//				});
	//				
	//				// Use ignore to signal that the inserted node is coming
	//				// from this function!
	//				ignore = true;
	//				
	//				input
	//				.after(placeholder)
	//				.data('placeholder', placeholder);
	//				
	//				ignore = false;
	//				
	//				if (!value || !value.length) {
	//					input.addClass('empty');
	//				};
	//			});
	//		};
	//	})());
	//}
})(document);


// Create placeholder labels when browser does not
// natively support placeholder attribute.

(function( jQuery, undefined ){
	var store = {},
			a = 0;
	
	function identify(fly){
	  // Generate an id, apply it to the input node
	  // and return it.
	  var id = 'input_' + a++ ;
	  
	  fly.id = id;
	  return id;
	}
	
	function changeHandler(e) {
		var input = e.target,
		  	value = input.value,
		  	placeholder = store[input.id];
		
		if ( !value || !value.length ) {
		  placeholder.css({ display: 'block' });
		}
		else {
		  placeholder.css({ display: 'none' });
		};
	}
	
	function focusHandler(e) {
		var input = e.target,
		  	placeholder = store[input.id];
		
		placeholder.css({ display: 'none' });
	}
	
	// Feature detect placeholder support, and when there is no
	// support create placeholder labels to simulate placeholder
	// attributes, and delegate event handlers.
	
	if (!jQuery.support.placeholder) {
		
		// Delegate events coming from inputs and texareas with placeholders.
		
		jQuery(document)
		.delegate('input[type="search"], input[type="text"]', 'change focusout', changeHandler)
		.delegate('input[type="search"], input[type="text"]', 'focusin', focusHandler)
		
		// Create placeholder labels.
		
		.ready(function() {
			var elem = jQuery('textarea[placeholder], input[placeholder]');
			
			// Don't bother going any further if there are no inputs
			// or textareas to process.
			
			if (!elem.length) { return; }
			
			elem.each(function(i){
				var input = this,
				    elem = jQuery(this),
				    id = input.id || identify(input),
				    value = input.value,
				    height = input.nodeName.toLowerCase() === 'input' ?
				    	elem.height() : 20,
				    text = elem.attr('placeholder'),
				    placeholder = jQuery('<label/>', {
				    	'for': id,
				    	'class': 'placeholder',
				    	text: text,
				    	css: {
				    		height: height + 'px',
				    		lineHeight: height + 'px',
				    		paddingLeft: elem.css('padding-left'),
				    		paddingRight: elem.css('padding-right')
				    	}
				    });
				
				placeholder.insertAfter(elem);
				
				// Store the placeholder in a hash table to associate it
				// with its input.
				store[id] = placeholder;
				
				if (!value || !value.length) {
					placeholder.css({ display: 'block' });
				};
			});
		});
	}
})(jQuery);


// Define event handlers

(function(jQuery, undefined){

	function prepareDragData(e){
		var elem = jQuery( e.target ),
		    data = elem.data('mimetypes'),
		    mimetype;
	
		if (!data) { return; }
	
		for (mimetype in data){
			ddd('[drag data] mimetype:', mimetype, 'data:', data[mimetype]);
			e.originalEvent.dataTransfer.setData(mimetype, JSON.stringify(data[mimetype]));
		}
	};
	
	function prepareDragFeedback(e){
		var elem = jQuery( e.target ),
		    data = elem.data('feedback'),
		    offset, dragOffset;

		if (data && data.node){
			ddd('[drag feedback] node:', data.node);
			jQuery(document.body).append(data.node);
			e.originalEvent.dataTransfer.setDragImage(data.node, data.width || 32, data.height || 32);
		}
		else {
			offset = elem.offset();
			dragOffset = {
				offsetX: e.pageX - offset.left,
				offsetY: e.pageY - offset.top
			};

			ddd('[drag feedback] offset:', dragOffset);
			e.originalEvent.dataTransfer.setDragImage( e.target, dragOffset.left, dragOffset.top );
			e.originalEvent.dataTransfer.setData( 'webdoc/offset', JSON.stringify(dragOffset) );
		}
	};
	
})(jQuery);