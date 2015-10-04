# jquery-handson-html-table

* Written as a jQuery plugin.
* Allows you to create a [handson](//handsontable.com/) table on existing HTML table at ease.
* Automatically resolve ```data``` and ```mergeCells``` attributes.
* Automatically sorting ```tbody```, ```thead```, ```tfoot```, and ```tr``` from source table.
* Derive the ```class``` and ```style``` definition from source table.

# Example

Here is a simple illustration of what you can do with this plugin.

```
<table class="hot handsontable htRowHeaders htColumnHeaders">
	<tbody>
		<tr>
			<td rowspan="2">rowspan="2"</td>
			<td>2</td>
			<td>3</td>
			<td>4</td>
		</tr>
		<tr>
			<td colspan="2" rowspan="2">colspan="2" rowspan="2"</td>
			<td>40</td>
		</tr>
		<tr>
			<td rowspan="2">rowspan="2"</td>
			<td>400</td>
		</tr>
		<tr>
			<td>2000</td>
			<td colspan="2">colspan="2"</td>
		</tr>
	</tbody>
	<tr>
		<td>10000</td>
		<td>20000</td>
		<td colspan="2" rowspan="2">colspan="2" rowspan="2"</td>
	</tr>
	<tfoot>
		<td colspan="4">colspan=4</td>
	</tfoot>
	<thead>
		<th>Header #1</th>
		<th>Header #2</th>
		<th>Header #3</th>
		<th>Header #4</th>
	</thead>
	<tr>
		<td>x0000</td>
		<td colspan="1">x0000</td>
	</tr>
</table>
<script type="text/javascript">
	(function($) {
		$(document).ready(function() {
			$('table').handsonFromTable({
				fixedColumnsLeft: 1,
				rowHeaders: true,
				colHeaders: true,
				stretchH: 'all',
			}, {
				verbose: true,
				replaceTable: true
			});
		});
	})(jQuery);
</script>
```

Or you can try it in this [jsFiddle](//jsfiddle.net/peatiscoding/jzxzz9aj/2/)

# Usage

To use the plugin you need [jQuery](//jquery.com/) and of cause, [handsontable](//handsontable.com/). Add/download them to your header if you haven't done it yet.

```
<!-- Dependencies -->
<script type="text/javascript" src="ext/handson_0.18.0/handsontable.full.min.js"></script>
<script type="text/javascript" src="ext/handson_0.18.0/zeroclipboard/ZeroClipboard.js"></script>
<script type="text/javascript" src="//code.jquery.com/jquery-1.11.3.min.js"></script>
<link rel="stylesheet" media="screen" href="ext/handson_0.18.0/handsontable.full.min.css"/>

<!-- Plugin -->
<script type="text/javascript" src="js/jquery-handson-html-table.js"></script>
```

Now you can simply invoke it as normal jQuery plugin style.


```
jQuery('table').handsonFromTable(handsonOptions, creationOptions);
```

## Options

For ```handsonOptions``` please refers to [handson documentation](//docs.handsontable.com/0.19.0/Options.html).

For ```creationOptions```

1. ```verbose``` - (boolean) instruct the plugin to describe what happen during creation phase. default: ```False```
1. ```replaceTable``` - (boolean) instruct the plugin to remove the table upon completion. default: ```False```


