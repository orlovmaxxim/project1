var validator = (function(){

	var initial = function () {
		_setUpListeners();
	};

	var _setUpListeners = function () {
		
	}

	var _viewTooltip = function (input, location) {
			switch (location) {
			case 'left':
			location = {
       my: 'center right',
			 at: 'center left'
		}
			break;
			case 'right':
			location = {
       my: 'center left',
			 at: 'center right',
			}
			break;
		}
/*		location = {
			my: 'center right',
			at: 'center left'
		}
		if (location === 'right'){
			location.adjust.method = 'Flip';
			location.my: 'center left';
			location.at: 'center right';
		}
*/
		input.qtip({
			content: {
				text: function(){
					return $(this).attr('qtip-content');
				}
			},
			show: {
				event: 'show'
			},
			hide: {
				event: 'unfocus'
			},
			position: location,
			style: {
				classes: 'qtip-red qtip-rounded myCustomClass',
				tip: {
					height: 7,
          width: 10
				}
			}
		}).trigger('show');
	};

	var validationForm = function (form) {

		console.log('Валидация - проверка формы');

		var inputs = form.find('input, textarea').not('input[type="file"], input[type="hidden"], input[type="submit"]'),
				valid = true;

		/*$each jquery func - изменить!*/
		$.each(inputs, function(index, val){
			console.log(index);
			console.log(val);
			var element = $(val),
					val = element.val();
					pos = element.attr('qtip-position');

			if (val.length === 0) {

				 //сюда вставить для обводки красным
				 element.addClass('has-error');
				_viewTooltip(element, pos);
				valid = false;
			}
		});
		return valid;
	};

	return {
		init: initial,
		validationForm: validationForm
	};
 
})();

validator.init();
