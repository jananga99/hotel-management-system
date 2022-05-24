START TRANSACTION;

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

create table IF NOT EXISTS hotel (
	hotelID int primary key auto_increment,
    name varchar(100) not null,
    street_number int not null,
    street_name varchar(100) not null,
    city varchar(100) not null,
    img varchar(200)
);

create table IF NOT EXISTS room(
	roomID int primary key auto_increment,
    hotelID int references hotel(hotelID),
    name varchar(100) not null,
    num_of_people int not null,
    ac_or_non_ac enum('ac','non-ac') not null ,
    price double not null
);

create table IF NOT EXISTS booking (
	bookingID int primary key auto_increment,
    userID int REFERENCES user(userID),
    roomID int not null REFERENCES room(roomID),
    state enum("available", "cancelled", "ongoing") not null default "available",
    payment_made enum('1','0') not null default '0' 
);

commit;
