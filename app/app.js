// Main App Js
// {this} reference to self function
(function() {
	'use strict';
	var app = {
		data: [],
		init: function() {
			this.dom();
			this.bindEvents();
			this.render();
		},

		bindEvents: function() {
			this.btn.on('click', this.add.bind(this));
			this.table.delegate('i.del','click', function() {
				var a = this.getAttribute('data-id');
				app.data.splice(a, 1);

				$('.del').parent().remove();

				app.data.forEach(function(i, index) {
				console.log(i);
				console.log(index);
				$('<li ><section>'+i.name+'</section><span>'+i.category+'</span><i class="del" data-id="' + index + '"><div>X</div></i></li>').appendTo('#table-result');
			});


			});
		},

 
		dom: function() {
			this.main = $('#main-input');
			this.table = $('#table-result');
			this.total = $('#total');
			this.input = this.main.find('input[type=text]');
			this.error = this.main.find('#error');
			this.btn = this.main.find('button');
		},
		getValue: function() {
			var name, category, data;
			// grab from dom
			name = this.input.val();
			category = this.main.find('input[type=radio]:checked').val();

			// put value on data object and set false when value is empty
			data = {
				name: (name === '') ? false : name,
				category: (typeof(category) === 'undefined') ? false : category
			};
			return data;
		},
		render: function() {
			var table = this.table;
			// broadcast dataUpdated
			events.emit("dataUpdated", this.data);
			this.table.find('li').not('.title').remove();
			this.total.text(this.data.length);

			// loop data and append to table-result
			this.data.forEach(function(i, index) {
				console.log(i);
				console.log(index);
				$('<li ><section>'+i.name+'</section><span>'+i.category+'</span><i class="del" data-id="' + index + '"><div>X</div></i></li>').appendTo(table);
			});
		},
		add: function() {
			var data = this.getValue();
			// validation if data value are not false
			if(data.name !== false && data.category !== false) {
				this.data.push(data);
				this.render();
				this.input.val('');
				this.error.hide();
				this.main.find('input[type=radio]:checked').prop('checked', false);
			} else {
				this.error.show().text('Fields cannot be empty');
			}
			
		}
	};

	app.init();

})();