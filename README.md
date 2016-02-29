# JavaScript Scrollable Table Plugin


Add a scrollbar to your table content whilst keeping your header fixed.

This plugin is built with vanilla JavaScript but can be utilised as a jQuery plugin, if required.

# Demo

[http://demos.lyndseyb.co.uk/tablescroll/](http://demos.lyndseyb.co.uk/tablescroll/)

# Usage

Create a standard HTML table eg:

```
    <table class="tablescroll">
        <thead>
        		<tr>
        			<th></th>
        			<th></th>
        			<th></th>
        			<th></th>
        		</tr>
    	</thead>
    	<tbody>
      		<tr>
      			<td></td>
      			<td></td>
      			<td></td>
      			<td></td>
      		</tr>
      		<tr>
      			<td></td>
      			<td></td>
      			<td></td>
      			<td></td>
      		</tr>
      		<tr>
      			<td></td>
      			<td></td>
      			<td></td>
      			<td></td>
      		</tr>
    	</tbody>
  </table>
```

JavaScript:

`tableScroll(document.querySelector('.tablescroll'));`

jQuery:

`$('.tablescroll').tableScroll();`

# Settings

The plugin has the following default options:

```
    {
        width: null, // the width of the wrapper that holds the scrollable table
        height: 300  // the maximum height of the table before the scrollbar appears
    }
```

These can be overridden as necessary, please see examples below.

# Examples

JavaScript:

```
    tableScroll(document.querySelector('.tablescroll'), {        
        width: 500     
    });
```

jQuery:

```
    $('.tablescroll').tableScroll({
        height: 200
    });

```

# Licence

Free for any use, commercial or otherwise.
