USE albumize_db;

ALTER TABLE Posts CHANGE COLUMN createdAt createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE Posts CHANGE COLUMN updatedAt updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;

INSERT INTO Posts (id,user_id,body,album_name,artist_name,song_name,rating,createdAt,updatedAt,UserId)
    VALUES
        (1,1,'This song brings back so many memories from when I grew up in Houston, Tx.','Get Rich Or Die Tryin\'','50 Cent','In Da Club',4,'2019-06-01 15:00:47','2019-06-01 15:00:47',1),
        (2,1,'This brings back so many memories from intermediate school!!','Confessions (Expanded Edition)','Usher','My Boo',4,'2019-06-02 01:22:03','2019-06-02 01:22:03',1),
        (3,3,'Sure does! \"It started when we were younger...\"','Confessions (Expanded Edition)','Usher','My Boo',3,'2019-06-02 01:24:01','2019-06-02 01:24:01',2),
        (4,4,'\"...Even though we used to argue it\'s alright...\" :)','Confessions (Expanded Edition)','Usher','My Boo',5,'2019-06-02 02:14:27','2019-06-02 02:14:27',3),
        (5,1,'go, go, go, go shawty, It\'s ya birthday','Get Rich Or Die Tryin\'','50 Cent','In Da Club',4,'2019-06-02 02:30:30','2019-06-02 02:30:30',2),
        (6,4,'G-G-G-G-UNIT!!','Get Rich Or Die Tryin\'','50 Cent','In Da Club',4,'2019-06-02 02:32:27','2019-06-02 02:32:27',2),
        (9,2,'nice song...','In My Own Words','Ne-Yo','So Sick',4,'2019-06-02 03:16:22','2019-06-02 03:16:22',1),
        (10,1,'What happened to Neyo?','In My Own Words','Ne-Yo','So Sick',3,'2019-06-02 03:19:10','2019-06-02 03:19:10',2),
        (12,3,'Neyoooo','In My Own Words','Ne-Yo','So Sick',2,'2019-06-02 03:23:40','2019-06-02 03:23:40',3),
        (14,4,'love this song!','Lemonade','Beyoncé','Sorry',3,'2019-06-02 03:31:19','2019-06-02 03:31:19',2),
        (21,3,'hmmm','In My Own Words','Ne-Yo','So Sick',1,'2019-06-02 04:03:02','2019-06-02 04:03:02',4),
        (22,2,'test comment lol','Confessions (Expanded Edition)','Usher','My Boo',3,'2019-06-03 08:26:30','2019-06-03 08:26:30',4)
        ;