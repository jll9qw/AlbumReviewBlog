USE albumize_db;

ALTER TABLE Users CHANGE COLUMN createdAt createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE Users CHANGE COLUMN updatedAt updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;

INSERT INTO Users (user_name, user_email, user_password)
    VALUES
        ('maurwebb', 'maurwebb@gmail.com', 'mwebb321'),
        ('alisrowd', 'alisrowd@gmail.com', 'arowd321'),
        ('jimmmill', 'jimmmill@gmail.com', 'jmill321'),
        ('jasolloy', 'jasolloy@gmail.com', 'jlloy321') 
        ;