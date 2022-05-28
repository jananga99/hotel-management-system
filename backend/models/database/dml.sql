
START TRANSACTION;

USE hotel_booking_system;

INSERT INTO `user` (`user_id`, `first_name`, `last_name`, `email`, `password`, `mobile`, `type`, `status`) VALUES
(1, 'pasan', 'kalansooriya', 'aaa@aaa.com', '$2b$09$pZvvipFgc2CdphmBFh8LeOKVmIfm9Ze.R.TAAWLuHcLzwFpFlkaXO', 123456789, 0, 1),
(2, 'Kamal', 'Ranasinghe', 'bbb@bbb.com', '$2b$09$qp2exz.MPSapre9eIq12ae.j0UtTL.idH86CMa0Yx/ObE6OGQHFx.', 711596625, 1, 1),
(3, 'Thuwan', 'Raffeek', 'ccc@ccc.com', '$2b$09$wd4IwFKtPcCn8yHo0u9XvunlZVHqHE7cCWLIxcjBY5KmAJph8dnG2', 758956852, 2, 1),
(4, 'Ronny', 'Chieng', 'ccc@ccc.com', '$2b$09$wd4IwFKtPcCn8yHo0u9XvunlZVHqHE7cCWLIxcjBY5KmAJph8dnG2', 551672294, 2, 0),
(5, 'sdsdvsdv', 'sdfbsdb', 'ttt@ttt.com', '$2b$09$kRACcKU7WeTvhNz1XGKHQuzowBxkbE9MvJANaPS/4v7X1xVNB0.wi', 112548897, 2, 1),
(6, 'Jerome', 'Valaska', 'j@j.com', '$2b$09$pZvvipFgc2CdphmBFh8LeOKVmIfm9Ze.R.TAAWLuHcLzwFpFlkaXO', 112548897, 2, 1);

INSERT INTO `hotel`(`name`, `street_number`, `street_name`, `city`,`star_rating`, `facilities`, `img`) VALUES
('Hotel Transylvania',99,'Street 1','Transylvania','5', 'Luxury', '1.jpg'),
('Hotel Kurunegala-A',34,'Street 2','Kurunegala', '5', 'Luxury', '2.jpg'),
('Hotel Kurunegala-B',56,'Street 3','Kurunegala', '5', 'Luxury', '3.jpg'),
('Hotel Kurunegala-C',78,'Street 4','Kurunegala', '5', 'Luxury', '4.jpg'),
('Hotel Kurunegala-D',23,'Street 5','Kurunegala', '5', 'Luxury', '5.jpg'),
('Hotel Colombo-L',56,'Street 6','Colombo', '5', 'Luxury', '6.jpg'),
('Hotel Colombo-M',23,'Street 7','Colombo', '5', 'Luxury', '7.jpg'),
('Hotel Colombo-N',67,'Street 8','Colombo', '5', 'Luxury', '8.jpg'),
('Hotel Colombo-O',89,'Street 9','Colombo', '5', 'Luxury', '9.jpg'),
('Hotel Colombo-P',12,'Street 10','Colombo', '5', 'Luxury', '10.jpg');

INSERT INTO `room`(`roomID`, `hotelID`, `name`, `num_of_people`, `price`, `ac_or_non_ac`) VALUES
 (1,1,'Room1',3,100,'non-ac'),
 (2,1,'Room2',2,100,'ac'),
 (3,1,'Room3',2,100,'ac'),
 (4,1,'Room4',1,100,'ac'),
 (5,1,'Room5',2,100,'non-ac'),
 (6,2,'Room6',3,100,'non-ac'),
 (7,2,'Room7',1,100,'ac'),
 (8,2,'Room8',4,100,'ac'),
 (9,2,'Room9',1,100,'ac'),
 (10,3,'Room10',2,100,'non-ac');

 INSERT INTO `booking`(`roomID`) VALUES
 (1),
 (2),
 (3),
 (4),
 (5),
 (6),
 (7),
 (8),
 (9),
 (10);

commit;
