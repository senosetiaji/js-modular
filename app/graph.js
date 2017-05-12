// Simple Generate Graph Js
(function() {
	'use strict';
	var countData;

	var setData = function(data) {
		var arr = data, obj = {};
	  for (var i = 0; i < arr.length; i++) {
	    if (!obj[arr[i].category]) {
	      obj[arr[i].category] = 1;
	    } else if (obj[arr[i].category]) {
	      obj[arr[i].category] += 1;
	    }
	  }
	  countData = obj;
	};

	var render = function() {
		var el = $('#graph');
		var total = 0;
		el.find('li').remove();
		for (var d in countData) {
      if (countData.hasOwnProperty(d)) {
				total += parseInt(countData[d]);
      }
    }
    for (var i in countData) {
      if (countData.hasOwnProperty(i)) {
				var percentage = parseInt(countData[i])/total*100;
				$('<li style="width:'+percentage+'%">\
						<div>'+parseInt(percentage)+'%</div>\
						<div class="name">'+i+'</div>\
					</li>').appendTo(el);
      }
    }
    
	};


	events.on("dataUpdated", setData);
	events.on("dataUpdated", render);
})();