CREATE TABLE stellar_bodies.galaxies(
    galaxy_id INT IDENTITY(1,1) PRIMARY KEY,
    galaxy_name VARCHAR(50) NOT NULL
);

INSERT INTO stellar_bodies.galaxies (galaxy_name)
VALUES 
('Milky Way'),
('Andromeda'),
('Pegasus');

CREATE TABLE stellar_bodies.star_systems(
    star_system_id INT IDENTITY(1,1) PRIMARY KEY,
    galaxy_id INT NOT NULL,
    star_system_name VARCHAR(50) NOT NULL
);

INSERT INTO stellar_bodies.star_systems(galaxy_id,star_system_name) VALUES 
(1,'Solar System'),
(1,'Tau Ceti'),
(1,'Wolf 1061'),
(1,'Proxima Centauri'),
(1,'TRAPPIST-1'),

(2,'HD 225218'),
(2,'V 385'),
(2,'HAT-P-53'),
(2,'WASP-1'),

(3,'Alpha Pegasi'),
(3,'Beta Pegasi'),
(3,'Algenib'),
(3,'Epsilon Pegasi');


CREATE TABLE stellar_bodies.planets(
    planet_id INT IDENTITY(1,1) PRIMARY KEY,
    star_system_id INT,
    planet_name VARCHAR(50) NOT NULL,
    life_support_type VARCHAR(15) NOT NULL,
    CONSTRAINT FK_star_system_id FOREIGN KEY (star_system_id)
        REFERENCES stellar_bodies.star_systems(star_system_id)
);

INSERT INTO stellar_bodies.planets(star_system_id,planet_name,life_support_type) VALUES
(5,'TRAPPIST-1b','HELLIONS'),
(5,'TRAPPIST-1c','UNKNOWN'),
(5,'TRAPPIST-1d','UNKNOWN'),
(5,'TRAPPIST-1e','EARTHLIKE'),
(5,'TRAPPIST-1f','EARTHLIKE'),
(5,'TRAPPIST-1g','EARTHLIKE'),
(5,'TRAPPIST-1h','UNKNOWN');
