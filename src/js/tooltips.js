var validator = (function(){

	var initial = function () {
		_setUpListeners();
	};

	var _setUpListeners = function () {
		$('form').on('keydown', '.light-error', _delLightError);
		$('form').on('reset', _resetForm);
	}

	var _resetForm = function (form) {
		var form = $(this);
		form.find('input, textarea').trigger('resetTooltips');
		form.find('.light-error').removeClass('light-error');
	}

	var _delLightError = function(){
		$(this).removeClass('light-error');
	};

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
				event: 'keydown resetTooltips'
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

		var inputs = form.find('input, textarea').not('input[type="file"], input[type="hidden"], input[type="submit"], input[id="filename"]'),
				valid = true;

		$.each(inputs, function(index, val){
			console.log(index);
			console.log(val);
			var element = $(val),
					val = element.val();
					pos = element.attr('qtip-position');

			if (val.length === 0) {

				 element.addClass('light-error');
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
