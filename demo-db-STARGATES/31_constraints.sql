ALTER TABLE stellar_bodies.galaxies
ADD CONSTRAINT stellar_bodies__galaxies__galaxy_name_uk UNIQUE (galaxy_name);


ALTER TABLE stellar_bodies.constellations
ADD CONSTRAINT stellar_bodies__constellations__constellation_name_uk UNIQUE (constellation_name);



ALTER TABLE stellar_bodies.star_systems
ADD CONSTRAINT stellar_bodies__star_systems__star_system_name UNIQUE (star_system_name);



ALTER TABLE stellar_bodies.planets
ADD CONSTRAINT stellar_bodies__planets__planet_name UNIQUE (planet_name);



ALTER TABLE stellar_bodies.planets
ADD CONSTRAINT stellar_bodies__planets__stellar_bodies__star_systems_fk
FOREIGN KEY (star_system_id)
REFERENCES stellar_bodies.star_systems (star_system_id);