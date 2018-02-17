-- Up

CREATE TABLE user (id INTEGER PRIMARY KEY, username TEXT, password_hash TEXT);
INSERT INTO user (username, password_hash) VALUES ("DummyDude", "$2a$10$HNT4OIJ6lNsDCnoThvqy.ejQeKqZ0rNOWyKp1KPOXUdKTuJX94opO");

-- Down

DROP TABLE user;
