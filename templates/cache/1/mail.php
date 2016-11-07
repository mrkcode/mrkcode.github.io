<?php
	
	/* -------------------------------------------------------------------------
	 * Send header Content-type with encoding
	 * -------------------------------------------------------------------------
	 */
	
	header('Content-type: text/html; charset=utf8');
	
	/* -------------------------------------------------------------------------
	 * Define constant SUCCESS_SEND
	 * -------------------------------------------------------------------------
	 */
	
	
	if (!defined('SUCCESS_SEND')) {
		define('SUCCESS_SEND', '<p class="success">Сообщение отправлено</p>');
	}
	
	/* -------------------------------------------------------------------------
	 * Define constant FAIL_SEND
	 * -------------------------------------------------------------------------
	 */
	
	
	if (!defined('FAIL_SEND')) {
		define('FAIL_SEND', '<p class="fail">При отправке сообщения произошла ошибка.</p>');
	}
	
	/* -------------------------------------------------------------------------
	 * Set ini derective display_errors
	 * -------------------------------------------------------------------------
	 */
	
	ini_set('display_errors', 'On');
	
	
	/* -------------------------------------------------------------------------
	 * Set level error_reporting
	 * -------------------------------------------------------------------------
	 */
	
	error_reporting(-1);
	
	
	/* -------------------------------------------------------------------------
	 * Define constant HTTP_METHOD
	 * -------------------------------------------------------------------------
	 */
	
	if (!defined('HTTP_METHOD')) {
		define('HTTP_METHOD', strtoupper($_SERVER['REQUEST_METHOD']));
	}
	
	
	/* -------------------------------------------------------------------------
	 * Define constant COMMON_PATH
	 * -------------------------------------------------------------------------
	 */
	
	if (!defined('COMMON_PATH')) {
		define('COMMON_PATH', __DIR__ . DIRECTORY_SEPARATOR . 'common');
	}
	
	
	/* -------------------------------------------------------------------------
	 * Define function mail_utf8
	 * -------------------------------------------------------------------------
	 */
	 
	if (!function_exists('mail_utf8')) {
		function mail_utf8($to, $message, $subject = '(No subject)', $from_email = 'no-reply@domain.com')
		{
			$subject   = '=?UTF-8?B?' . base64_encode($subject)   . '?=';

			$headers = [
				'MIME-Version: 1.0',
				"From: {$from_email}",
				'Content-type: text/html; charset=utf-8',
			];

			return mail($to, $subject, $message, implode("\r\n", $headers));
		}
	}
	
	
	/* -------------------------------------------------------------------------
	 * Check HTTP method
	 * -------------------------------------------------------------------------
	 */
	 
	if (HTTP_METHOD !== 'GET') {
		header($_SERVER['SERVER_PROTOCOL'] . ' 405 Method Not Allowed');
		
		die('405 Method Not Allowed');
	}
	
	
	/* -------------------------------------------------------------------------
	 * Get fields
	 * -------------------------------------------------------------------------
	 */
	 
	$rows   = [];
	$errors = [];
	
	if (filter_has_var(INPUT_GET, 'email')) {
		$email = filter_input(INPUT_GET, 'email');
		
		$email = trim($email);
		
		if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
			$rows[] = "Почта: {$email}";
		} else {
			$errors[] = 'Email введен не корректно.';
		}
	}
	
	if (filter_has_var(INPUT_GET, 'name')) {
		$name = filter_input(INPUT_GET, 'name');
		
		$name = trim($name);
		
		if ($name) {
			$rows[] = 'Имя: ' . filter_var($name, FILTER_SANITIZE_SPECIAL_CHARS);
		} else {
			$errors[] = 'Необходимо ввести имя.';
		}
	}
	
	if (filter_has_var(INPUT_GET, 'phone')) {
		$phone = filter_input(INPUT_GET, 'phone');
		
		$phone = trim($phone);
		
		if (strlen($phone) < 20) {
			$rows[] = 'Телефон: ' . filter_var($phone, FILTER_SANITIZE_SPECIAL_CHARS);
		} else {
			$errors[] = 'Должно быть не более 20 символов в номере телефона.';
		}
	}
	
	
	/* -------------------------------------------------------------------------
	 * Get subject
	 * -------------------------------------------------------------------------
	 */
	
	$subject = filter_input(INPUT_GET, 'subject');
	
	$subject = trim($subject);
	
	
	/* -------------------------------------------------------------------------
	 * Check request parameters
	 * -------------------------------------------------------------------------
	 */
	 
	if (!$subject || (!$rows && !$errors)) {
		header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request');
	
		die('400 Bad Request');
	}
	
	
	/* -------------------------------------------------------------------------
	 * Check input errors
	 * -------------------------------------------------------------------------
	 */
	 
	if ($errors) {
		foreach ($errors as $error) {
			echo "<p class='fail'>{$error}</p>";
		}
		
		die;
	}
	
	
	/* -------------------------------------------------------------------------
	 * Create message
	 * -------------------------------------------------------------------------
	 */
	 
	$tpl = COMMON_PATH . DIRECTORY_SEPARATOR . 'mailTpl.php';
	
	if (!is_file($tpl)) {
		die('Error: ' . __LINE__);
	}
	
	ob_start();
	
	include $tpl;
	
	$message = ob_get_clean();
	
	
	/* -------------------------------------------------------------------------
	 * Get mails
	 * -------------------------------------------------------------------------
	 */
	 
	$fileEmailList = COMMON_PATH . DIRECTORY_SEPARATOR . 'adminMailList.txt';
	
	if (!is_file($fileEmailList)) {
		die('Error: ' . __LINE__);
	}
	 
	$emailList = file($fileEmailList);
	
	if (empty($emailList)) {
		die('Error: ' . __LINE__);
	}
	
	
	/* -------------------------------------------------------------------------
	 * Send message
	 * -------------------------------------------------------------------------
	 */
	 
	$to = implode(', ', $emailList);
	
	if (mail_utf8($to, $message, $subject)) {
		die(SUCCESS_SEND);
	} else {
		die(FAIL_SEND);
	}