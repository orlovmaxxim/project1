<?php

	$name = $_POST['project-name'];
	$data = array();

	if ($name === '') {
		$data['status'] = 'error';
		$data['text'] = 'Ошибка!<br>Невозможно добавить проект.';
	} else {
		$data['status'] = 'OK';
		$data['text'] = 'Ура!<br>Проект успешно добавлен.';
	}

	header("Content-Type: application/json");
	echo json_encode($data);
	exit;

?>