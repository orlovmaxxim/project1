var firstModule = (function() {
	// init firstModule
	var init = function () {
		_setUpListners();
	};

	// прослушка событий
	var _setUpListners = function () {
		$('#add-new-item').on('click', _showModalWindow); // открытие модального окна по щелчку
		$('#popup-block div.close').on('click', _closeModalWindow); // закрытие модального окна по щелчку
		$('#add-project').on('submit', _addNewWork); // добавление нового проекта
	};

	//открытие всплывающего (модального) окна
	var _showModalWindow = function (e) {
		e.preventDefault();

		popupBlock = $('#popup-block');
		var form = popupBlock.find('#add-project');

		popupBlock.bPopup({
				fadeSpeed: 'slow',
				followSpeed: 1000,
				modalColor: '#818e9b',
	      transition: 'slideIn',
	    	transitionClose: 'slideBack',
	    	escClose: true,
	    	onClose: function () {
	    		form.find('.response-alert').hide();
	    	}
		});
	};

	//закрытие всплывающего (модального) окна 
	var _closeModalWindow = function () {
		popupBlock.close();
	};

	var _addNewWork = function (e) {
		console.log ("Отклик на добовление проекта работает правильно");
		e.preventDefault();

		var form = $(this),
				url = 'add_new_work.php',
				myServerAnswer = _ajaxUniversalFunc(form, url);

		//аякс запрос на сервер - в начале проверка, был ли зпрос на сервер
		if (myServerAnswer) {
		myServerAnswer.done(function(answer){
			var alertSuccess = form.find('.success-alert'),
					alertError = form.find('.error-alert');

			if(answer.status === 'OK') {
				alertError.hide();
				alertSuccess.text(answer.text).show();
			} else {
				alertError.text(answer.text).show();
				alertSuccess.hide();
				}
			})
		}
	};

var _ajaxUniversalFunc = function(form, url) {

		console.log ("Ajax запрос с проверкой");
		if (!validator.validationForm(form)) return false;

		data = form.serialize();

		var res = $.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			data: data,
		}).fail (function(answer){
			console.log("Problems in PHP");
			form.find('.error-alert').text('Ошибка на сервере').show();
		});
		return res;
	};

	// возвращаем объект
	return {
		init: init
	};

}());

firstModule.init();