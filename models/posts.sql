USE albumize_db;

ALTER TABLE Posts CHANGE COLUMN createdAt createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE Posts CHANGE COLUMN updatedAt updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;

INSERT INTO Posts (id, user_id, user_avatar, body, album_name, artist_name, song_name, rating, createdAt, updatedAt)
    VALUES
        (1,1,'https://avatars2.githubusercontent.com/u/27834803?s=460&v=4','This song brings back so many memories from when I grew up in Houston, Tx.','Get Rich Or Die Tryin\'','50 Cent','In Da Club',4,'2019-06-01 15:00:47','2019-06-01 15:00:47'),

        (2,1,'https://avatars2.githubusercontent.com/u/27834803?s=460&v=4','This brings back so many memories from intermediate school!!','Confessions (Expanded Edition)','Usher','My Boo',4,'2019-06-02 01:22:03','2019-06-02 01:22:03'),

        (3,3,'https://media.licdn.com/dms/image/C4E03AQFReT7gDzsJjA/profile-displayphoto-shrink_800_800/0?e=1565222400&v=beta&t=oY7KI9Y04vZA_81oJphLaW81jjZKb6NxfAQCNNglaFY','Sure does! \"It started when we were younger...\"','Confessions (Expanded Edition)','Usher','My Boo',3,'2019-06-02 01:24:01','2019-06-02 01:24:01'),

        (4,4,'https://media.licdn.com/dms/image/C4D03AQHUHyysbTOZQQ/profile-displayphoto-shrink_800_800/0?e=1565222400&v=beta&t=h00VjDEA1aT4vEHJo2i3J-xgs0GJMpHnXPLmHPuVdZI','\"...Even though we used to argue it\'s alright...\" :)','Confessions (Expanded Edition)','Usher','My Boo',5,'2019-06-02 02:14:27','2019-06-02 02:14:27'),

        (5,1,'https://avatars2.githubusercontent.com/u/27834803?s=460&v=4','go, go, go, go shawty, It\'s ya birthday','Get Rich Or Die Tryin\'','50 Cent','In Da Club',4,'2019-06-02 02:30:30','2019-06-02 02:30:30'),

        (6,4,'https://media.licdn.com/dms/image/C4D03AQHUHyysbTOZQQ/profile-displayphoto-shrink_800_800/0?e=1565222400&v=beta&t=h00VjDEA1aT4vEHJo2i3J-xgs0GJMpHnXPLmHPuVdZI','G-G-G-G-UNIT!!','Get Rich Or Die Tryin\'','50 Cent','In Da Club',4,'2019-06-02 02:32:27','2019-06-02 02:32:27'),

        (9,2,'https://media.licdn.com/dms/image/C4D03AQH6N6IZ7-U5UQ/profile-displayphoto-shrink_800_800/0?e=1565222400&v=beta&t=L7nfqcacgztKNLn9CdqpW11HeUev9wQIfTe4HLXMGPk','nice song...','In My Own Words','Ne-Yo','So Sick',4,'2019-06-02 03:16:22','2019-06-02 03:16:22'),

        (10,1,'https://avatars2.githubusercontent.com/u/27834803?s=460&v=4','What happened to Neyo?','In My Own Words','Ne-Yo','So Sick',3,'2019-06-02 03:19:10','2019-06-02 03:19:10'),

        (12,3,'https://media.licdn.com/dms/image/C4E03AQFReT7gDzsJjA/profile-displayphoto-shrink_800_800/0?e=1565222400&v=beta&t=oY7KI9Y04vZA_81oJphLaW81jjZKb6NxfAQCNNglaFY','Neyoooo','In My Own Words','Ne-Yo','So Sick',2,'2019-06-02 03:23:40','2019-06-02 03:23:40'),

        (14,4,'https://media.licdn.com/dms/image/C4D03AQHUHyysbTOZQQ/profile-displayphoto-shrink_800_800/0?e=1565222400&v=beta&t=h00VjDEA1aT4vEHJo2i3J-xgs0GJMpHnXPLmHPuVdZI','love this song!','Lemonade','Beyoncé','Sorry',3,'2019-06-02 03:31:19','2019-06-02 03:31:19'),

        (21,3,'https://media.licdn.com/dms/image/C4E03AQFReT7gDzsJjA/profile-displayphoto-shrink_800_800/0?e=1565222400&v=beta&t=oY7KI9Y04vZA_81oJphLaW81jjZKb6NxfAQCNNglaFY','hmmm','In My Own Words','Ne-Yo','So Sick',1,'2019-06-02 04:03:02','2019-06-02 04:03:02'),
        
        (22,2,'https://media.licdn.com/dms/image/C4D03AQH6N6IZ7-U5UQ/profile-displayphoto-shrink_800_800/0?e=1565222400&v=beta&t=L7nfqcacgztKNLn9CdqpW11HeUev9wQIfTe4HLXMGPk','test comment lol','Confessions (Expanded Edition)','Usher','My Boo',3,'2019-06-03 08:26:30','2019-06-03 08:26:30')
        ;