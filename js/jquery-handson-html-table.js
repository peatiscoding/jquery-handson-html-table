// JavaScript, jQuery plugin
// jquery-handson-html-table.js
(function($) {

	var newId = function() {
		var S4 = function() {
	       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	    };
	    return (new Date().getTime()+"-"+S4()+S4());
	};

	$.fn.handsonFromTable = function(handsonOptions, creationOptions) {
		return this.each(function() {
			// Validate
			if ( ! $(this).is('table')) {
				throw 'Unable to create handsonTable with non-table element.';
			}

			// Create necessary variables.
			var $out = $('<div>')
			  ,	$table = $(this)
			  , opts = creationOptions || {}
			  , id = opts.replaceTable && $table.attr('id') || newId();

			// Copy necessary classes and attributes
			$out.attr('id', id);
			$out.attr('class', $table.attr('class') || '');
			$out.attr('style', $table.attr('style') || '');
			$out.addClass('auto-handson-table');

			// Append to parent
			$table.parent().append( $out );

			// Now let's read and analyse the table then recreate it on '$out' as a handson object
			//  -> First of Getting Data
			// 	-> Collect merging attributes
			
			var mergeCells = [ /* { row: col: rowspan: colspan: } */ ]
			  , blockedCell = [ /* "row-col" */]
			  , pos = { x:0, y:0 }
			  , data = ['thead tr', 'tbody tr', '> tr', 'tfoot tr'].reduce(function(a, b) {
					// Make sure our tr are in right orders
					if (a == null) {
						return $table.find(b).toArray();
					}
					return a.concat($table.find(b).toArray());
				}, null).map(function(tr, index) {
					// Process through rows, collect data and merge indices
					var row = [];
					pos.x = 0;		// reset
					$(tr).find('th, td').each(function() {
						var $cell = $(this)
						  , colspan = parseInt($cell.attr('colspan')) || 1
						  , rowspan = parseInt($cell.attr('rowspan')) || 1;

						opts.verbose && console.log("Working on: " + [pos.y, pos.x].join("-"));
						while (blockedCell.indexOf([pos.y, pos.x].join("-"))!=-1) {
							// meant to be blocked
							opts.verbose && console.log("Blocked cell found on " + pos.x + ", " + pos.y);
							row.push("");
							pos.x += 1;
						}

						// update blockedCell, take care only different row
						for (var i = 1; i < rowspan; i++) {
							for (var j = 0; j < colspan; j++) {
								var p = "" + (pos.y + i) + "-" + (pos.x + j);
								blockedCell.push(p);
								opts.verbose && console.log("add blockedCell " + p);
							}
						}

						// Handle same row spaning (col)
						row.push($cell.html());
						for (var i = 1; i < colspan; i++) {
							row.push("");
						};
						if (rowspan + colspan > 2) {
							mergeCells.push({
								row: pos.y,
								col: pos.x,
								rowspan: rowspan,
								colspan: colspan
							});
						}
						pos.x += colspan;
					});
					pos.y++;
					return row;
				})
			  , args = $.extend(handsonOptions, {
			  		// colHeaders: data.shift(),
					data: data,
					mergeCells: mergeCells
				});

			opts.verbose && console.log(args);

			new Handsontable($out[0], args);

			opts.replaceTable && $table.remove();
		});
	};
})(jQuery);
