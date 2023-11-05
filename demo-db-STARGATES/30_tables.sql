CREATE TABLE stellar_bodies.galaxies(
    galaxy_id INT IDENTITY(1,1) PRIMARY KEY,
    galaxy_name VARCHAR(50) NOT NULL
);

INSERT INTO stellar_bodies.galaxies (galaxy_name)
VALUES 
('Milky Way'),
('Andromeda'),
('Pegasus');

CREATE TABLE stellar_bodies.constellations(
    constellation_id INT IDENTITY(1,1) PRIMARY KEY,
    galaxy_id INT NOT NULL,
    constellation_name VARCHAR(50) NOT NULL
);

INSERT INTO stellar_bodies.constellations(galaxy_id,constellation_name) VALUES 
(1,'Corvus'),
(1,'Cetus'),
(1,'Gemini'),
(1,'Leo'),
(1,'Centaurus');



CREATE TABLE stellar_bodies.star_systems(
    star_system_id INT IDENTITY(1,1) PRIMARY KEY,
    constellation_id INT NULL,
    galaxy_id INT NOT NULL,
    star_system_name VARCHAR(50) NOT NULL
);

/* https://en.everybodywiki.com/List_of_Heinlein_planets */

INSERT INTO stellar_bodies.star_systems(constellation_id,galaxy_id,star_system_name) VALUES 
(null,1,'Solar System'),
(2,1,'Tau Ceti'),
(null,1,'Wolf 1061'),
(5,1,'Proxima Centauri'),
(5,1,'Theta Centauri'),
(null,1,'TRAPPIST-1'),

(null,2,'HD 225218'),
(null,2,'V 385'),
(null,2,'HAT-P-53'),
(null,2,'WASP-1'),

(null,3,'Alpha Pegasi'),
(null,3,'Beta Pegasi'),
(null,3,'Algenib'),
(null,3,'Epsilon Pegasi'),

(1,1,'Beta Corvi'),
(1,1,'Ceti'),
(3,1,'Gemini'),
(4,1,'Gamma Leonis');


CREATE TABLE stellar_bodies.planets(
    planet_id INT IDENTITY(1,1) PRIMARY KEY,
    star_system_id INT,
    planet_name VARCHAR(50) NOT NULL,
    life_support_type VARCHAR(15) NOT NULL
);

INSERT INTO stellar_bodies.planets(star_system_id,planet_name,life_support_type) VALUES
(6,'TRAPPIST-1b','HELLIONS'),
(6,'TRAPPIST-1c','UNKNOWN'),
(6,'TRAPPIST-1d','UNKNOWN'),
(6,'TRAPPIST-1e','EARTHLIKE'),
(6,'TRAPPIST-1f','EARTHLIKE'),
(6,'TRAPPIST-1g','EARTHLIKE'),
(6,'TRAPPIST-1h','UNKNOWN'),

(15,'Beta Corvi I','UNINHABITABLE'),
(15,'Beta Corvi II','UNINHABITABLE'),
(15,'Beta Corvi III','EARTHLIKE'),

(16,'Epsilon Ceti I','UNINHABITABLE'),
(16,'Epsilon Ceti II','UNINHABITABLE'),
(16,'Epsilon Ceti III','UNINHABITABLE'),
(16,'Epsilon Ceti IV','METHAN'),

(5,'Garson''s Planet','METHAN')
;
