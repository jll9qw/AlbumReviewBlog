USE albumize_db;

ALTER TABLE Posts CHANGE COLUMN createdAt createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE Posts CHANGE COLUMN updatedAt updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;

INSERT INTO Posts (UserId, album_name, artist_name, song_name, body, rating)
    VALUES
        (1, "Get Rich Or Die Tryin'", "50 Cent", "In Da Club", "This song brings back so many memories from when I grew up in Houston, Tx.", 4)
        ;