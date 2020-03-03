INSERT INTO users (name, age) VALUES ('bob', 32);
INSERT INTO users (name, age) VALUES ('ed', 50);
INSERT INTO users (name, age) VALUES ('kyle', 25);
INSERT INTO users (name, age) VALUES ('lucy', 24);
INSERT INTO users (name, age) VALUES ('mia', 27);

INSERT INTO skill (level) VALUES ('1 - beginner');
INSERT INTO skill (level) VALUES ('2 - early intermediate');
INSERT INTO skill (level) VALUES ('3 - intermediate');
INSERT INTO skill (level) VALUES ('4 - late intermediate');
INSERT INTO skill (level) VALUES ('5 - expert');

INSERT INTO instruments (instrument) VALUES ('drums');
INSERT INTO instruments (instrument) VALUES ('guitar');
INSERT INTO instruments (instrument) VALUES ('clarinet');
INSERT INTO instruments (instrument) VALUES ('bassoon');
INSERT INTO instruments (instrument) VALUES ('bass');

INSERT INTO genres (genre) VALUES ('pop');
INSERT INTO genres (genre) VALUES ('rock');
INSERT INTO genres (genre) VALUES ('jazz');
INSERT INTO genres (genre) VALUES ('rock');
INSERT INTO genres (genre) VALUES ('jazz');


SELECT users.id, users.name, users.age, skill.level, instruments.instrument, genres.genre
FROM users
INNER JOIN skill ON users.id = skill.id
INNER JOIN instruments ON users.id = instruments.id
INNER JOIN genres ON users.id = genres.id