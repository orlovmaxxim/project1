var firstModule = (function() {
	// init firstModule
	var init = function () {
		_setUpListners();
	};

	// прослушка событий
	var _setUpListners = function () {
		$('#add-new-item').on('click', _showModalWindow); // открытие модального окна по щелчку
		$('#popup-block div.close').on('click', _closeModalWindow); // закрытие модального окна по щелчку
	};

	//открытие всплывающего (модального) окна
	var _showModalWindow = function (e) {
		e.preventDefault();

		popupBlock = $('#popup-block');

		popupBlock.bPopup({
				fadeSpeed: 'slow',
				followSpeed: 1000,
				modalColor: '#818e9b',
	      transition: 'slideIn',
	    	transitionClose: 'slideBack',
	    	escClose: true
		});
	};

	//закрытие всплывающего (модального) окна 
	var _closeModalWindow = function () {
		popupBlock.close();
	};

	// возвращаем объект
	return {
		init: init
	};

}());

firstModule.init();