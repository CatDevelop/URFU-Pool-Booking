<?php
	header('Access-Control-Allow-Origin: *');  
	header('Access-Control-Allow-Methods: OPTIONS, GET');
	header("Access-Control-Allow-Headers: *");

	include "URFUPoolBookingLibrary.php";
	mysqli_set_charset($Link, 'utf8'); 

	$week = GetGet('week'); // Получение номера недели

	$time = [
	  0 => "6:30",
	  1 => "7:15",
	  2 => "8:00",
	  3 => "8:45",
	  4 => "9:30",
	  5 => "10:15",
	  6 => "11:00",
	  7 => "11:45",
	  8 => "12:30",
	  9 => "13:15",
	  10 => "14:00",
	  11 => "14:45",
	  12 => "15:30",
	  13 => "16:15",
	  14 => "17:00",
	  15 => "17:45",
	  16 => "18:30",
	  17 => "19:15",
	  18 => "20:00",
	  19 => "20:45",
	  20 => "21:30",
	];


	$data = [];
	foreach ($time as &$t) {
    	$data[$t] = [6, 6, 6, 6, 6, 6, 6];
	}
	

	$A1 = $Link->query("SELECT * FROM `bookings` WHERE `week`=".$week);
	if ($A1->num_rows > 0) {
	    while($row = $A1->fetch_assoc()) {
	    	for ($i = 0; $i < $row["durationCount"]; $i++) {
			    $data[$time[$row["startTime"]+$i]][$row["day"]] = $data[$time[$row["startTime"]+$i]][$row["day"]]-$row["seatsCount"];
			}
	    }
	}
	echo json_encode($data, JSON_UNESCAPED_UNICODE);
	
	mysqli_close($Link);
?>