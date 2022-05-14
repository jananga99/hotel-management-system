begin;

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(900) NOT NULL,
  `mobile` int(12) NOT NULL,
  `type` int(2) NOT NULL,
  `status` int(2) NOT NULL,
  PRIMARY KEY (`user_id`)
);
INSERT INTO `user` (`user_id`, `first_name`, `last_name`, `email`, `password`, `mobile`, `type`, `status`) VALUES
(1, 'pasan', 'kalansooriya', 'aaa@aaa.com', '$2b$09$pZvvipFgc2CdphmBFh8LeOKVmIfm9Ze.R.TAAWLuHcLzwFpFlkaXO', 123456789, 0, 1),
(2, 'Kamal', 'Ranasinghe', 'bbb@bbb.com', '$2b$09$qp2exz.MPSapre9eIq12ae.j0UtTL.idH86CMa0Yx/ObE6OGQHFx.', 711596625, 1, 1),
(3, 'Thuwan', 'Raffeek', 'ccc@ccc.com', '$2b$09$wd4IwFKtPcCn8yHo0u9XvunlZVHqHE7cCWLIxcjBY5KmAJph8dnG2', 758956852, 2, 1),
(4, 'Ronny', 'Chieng', 'ccc@ccc.com', '$2b$09$wd4IwFKtPcCn8yHo0u9XvunlZVHqHE7cCWLIxcjBY5KmAJph8dnG2', 551672294, 2, 0),
(5, 'sdsdvsdv', 'sdfbsdb', 'ttt@ttt.com', '$2b$09$kRACcKU7WeTvhNz1XGKHQuzowBxkbE9MvJANaPS/4v7X1xVNB0.wi', 112548897, 2, 1),
(6, 'Jerome', 'Valaska', 'j@j.com', '$2b$09$kRACcKU7WeTvhNz1XGKHQuzowBxkbE9MvJANaPS/4v7X1xVNB0.wi', 112548897, 2, 1);



create table hotel (
	hotelID int primary key auto_increment,
    name varchar(100) not null,
    street_number int not null,
    street_name varchar(100) not null,
    city varchar(100) not null
);
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


create table room(
	roomID int primary key auto_increment,
    hotelID int references hotel(hotelID),
    name varchar(100) not null,
    num_of_people int not null,
    ac_or_non_ac varchar(10),
    available int(1) default 1 ,
    bookingID int default 0 references booking(bookingID)
);

INSERT INTO `room`(`hotelID`, `name`, `num_of_people`, `ac_or_non_ac`) VALUES
 (1,'Room1',3,'non-ac'),
 (1,'Room2',2,'ac'),
 (1,'Room3',2,'ac'),
 (1,'Room4',1,'ac'),
 (1,'Room5',2,'non-ac'),
 (2,'Room6',3,'non-ac'),
 (2,'Room7',1,'ac'),
 (2,'Room8',4,'ac'),
 (2,'Room9',1,'ac'),
 (3,'Room10',2,'non-ac');


create table booking (
	bookingID int primary key auto_increment,
    userID int not null REFERENCES user(userID),
    price double not null,
    payment_made int(1) default 0
);

commit;