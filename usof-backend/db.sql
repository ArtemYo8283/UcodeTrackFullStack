use apidb;

CREATE TABLE `User` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`login` varchar(255) NOT NULL UNIQUE,
	`password` varchar(255) NOT NULL,
	`full_name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`profile_pic` varchar(255) NOT NULL DEFAULT 'default.png',
	`rating` varchar(255) NOT NULL,
	`role_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Category` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`title` varchar(255) NOT NULL,
	`description` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Post` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`author_id` INT NOT NULL,
	`title` varchar(255) NOT NULL,
	`publish_date` DATE NOT NULL,
	`status` BOOLEAN NOT NULL,
	`content` BOOLEAN NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Comment` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`author_id` INT NOT NULL,
	`publish_date` DATE NOT NULL,
	`content` varchar(255) NOT NULL,
	`postid` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Like` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`author_id` INT NOT NULL,
	`publish_date` DATE NOT NULL,
	`post/comment` BOOLEAN NOT NULL,
	`entityid` INT NOT NULL,
	`type` BOOLEAN NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `role` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`title` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `PostCategory` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`idPost` INT NOT NULL,
	`idCategory` INT NOT NULL
);

ALTER TABLE `User` ADD CONSTRAINT `User_fk0` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`);

ALTER TABLE `Post` ADD CONSTRAINT `Post_fk0` FOREIGN KEY (`author_id`) REFERENCES `User`(`id`);

ALTER TABLE `Comment` ADD CONSTRAINT `Comment_fk0` FOREIGN KEY (`author_id`) REFERENCES `User`(`id`);

ALTER TABLE `Comment` ADD CONSTRAINT `Comment_fk1` FOREIGN KEY (`postid`) REFERENCES `Post`(`id`);

ALTER TABLE `Like` ADD CONSTRAINT `Like_fk0` FOREIGN KEY (`author_id`) REFERENCES `User`(`id`);

ALTER TABLE `PostCategory` ADD CONSTRAINT `PostCategory_fk0` FOREIGN KEY (`idPost`) REFERENCES `Post`(`id`);

ALTER TABLE `PostCategory` ADD CONSTRAINT `PostCategory_fk1` FOREIGN KEY (`idCategory`) REFERENCES `Category`(`id`);

