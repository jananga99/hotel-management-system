begin;

INSERT INTO `user` (`user_id`, `first_name`, `last_name`, `email`, `password`, `mobile`, `type`, `status`) VALUES
(1, 'pasan', 'kalansooriya', 'aaa@aaa.com', '$2b$09$pZvvipFgc2CdphmBFh8LeOKVmIfm9Ze.R.TAAWLuHcLzwFpFlkaXO', 123456789, 0, 1),
(2, 'Kamal', 'Ranasinghe', 'bbb@bbb.com', '$2b$09$qp2exz.MPSapre9eIq12ae.j0UtTL.idH86CMa0Yx/ObE6OGQHFx.', 711596625, 1, 1),
(3, 'Thuwan', 'Raffeek', 'ccc@ccc.com', '$2b$09$wd4IwFKtPcCn8yHo0u9XvunlZVHqHE7cCWLIxcjBY5KmAJph8dnG2', 758956852, 2, 1),
(4, 'Ronny', 'Chieng', 'ccc@ccc.com', '$2b$09$wd4IwFKtPcCn8yHo0u9XvunlZVHqHE7cCWLIxcjBY5KmAJph8dnG2', 551672294, 2, 0),
(5, 'sdsdvsdv', 'sdfbsdb', 'ttt@ttt.com', '$2b$09$kRACcKU7WeTvhNz1XGKHQuzowBxkbE9MvJANaPS/4v7X1xVNB0.wi', 112548897, 2, 1),
(6, 'Jerome', 'Valaska', 'j@j.com', '$2b$09$pZvvipFgc2CdphmBFh8LeOKVmIfm9Ze.R.TAAWLuHcLzwFpFlkaXO', 112548897, 2, 1);

INSERT INTO `hotel`(`name`, `street_number`, `street_name`, `city`) VALUES
('Hotel Transylvania',99,'Street 1','Transylvania'),
('Hotel Kurunegala-A',34,'Street 2','Transylvania'),
('Hotel Kurunegala-B',56,'Street 3','Transylvania'),
('Hotel Kurunegala-C',78,'Street 4','Transylvania'),
('Hotel Kurunegala-D',23,'Street 5','Transylvania'),
('Hotel Colombo-L',56,'Street 6','Transylvania'),
('Hotel Colombo-M',23,'Street 7','Transylvania'),
('Hotel Colombo-N',67,'Street 8','Transylvania'),
('Hotel Colombo-O',89,'Street 9','Transylvania'),
('Hotel Colombo-P',12,'Street 10','Transylvania');

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
 (1);

 commit;