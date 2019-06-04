USE albumize_db;

ALTER TABLE Users CHANGE COLUMN createdAt createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE Users CHANGE COLUMN updatedAt updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;

INSERT INTO Users (id,user_name,user_email,user_password,user_avatar,createdAt,updatedAt)
    VALUES
        (1,'maurwebb','maurwebb@gmail.com','mwebb321','https://avatars2.githubusercontent.com/u/27834803?s=460&v=4','2019-05-28 20:12:54','2019-05-28 20:12:54'),
        (2,'alisrowd','alisrowd@gmail.com','arowd321','https://media.licdn.com/dms/image/C4D03AQH6N6IZ7-U5UQ/profile-displayphoto-shrink_800_800/0?e=1565222400&v=beta&t=L7nfqcacgztKNLn9CdqpW11HeUev9wQIfTe4HLXMGPk','2019-05-28 20:12:54','2019-05-28 20:12:54'),
        (3,'jimmmill','jimmmill@gmail.com','jmill321','https://media.licdn.com/dms/image/C4E03AQFReT7gDzsJjA/profile-displayphoto-shrink_800_800/0?e=1565222400&v=beta&t=oY7KI9Y04vZA_81oJphLaW81jjZKb6NxfAQCNNglaFY','2019-05-28 20:12:54','2019-05-28 20:12:54'),
        (4,'jasolloy','jasolloy@gmail.com','jlloy321','https://media.licdn.com/dms/image/C4D03AQHUHyysbTOZQQ/profile-displayphoto-shrink_800_800/0?e=1565222400&v=beta&t=h00VjDEA1aT4vEHJo2i3J-xgs0GJMpHnXPLmHPuVdZI','2019-05-28 20:12:54','2019-05-28 20:12:54')
        ;