CREATE TABLE wormholes.wormhole(
    wormhole_id INT identity(1000,1) PRIMARY KEY,
    wormhole_name VARCHAR(50) NOT NULL,
    discovered_by VARCHAR(100) NOT NULL,
    discovered_at DATE NOT NULL,
    capacity FLOAT(24) NOT NULL,
    point_a_to_b_direction CHAR(4) NOT NULL CHECK (point_a_to_b_direction IN('atob', 'btoa', 'both')),
    point_a_star_system_id INT NOT NULL,
    point_b_star_system_id INT NOT NULL,
    CONSTRAINT FK_point_a FOREIGN KEY (point_a_star_system_id)
            REFERENCES stellar_bodies.star_systems(star_system_id),
    CONSTRAINT FK_point_b FOREIGN KEY (point_b_star_system_id)
            REFERENCES stellar_bodies.star_systems(star_system_id)
);

INSERT INTO wormholes.wormhole(wormhole_name,discovered_by,discovered_at,capacity,point_a_to_b_direction,point_a_star_system_id,point_b_star_system_id) VALUES
('Sigfried''s Passage','Sigfried Del-Monte','2072-11-21',42,'both',1,3),
('Bush G Bad Waves','Raven 12 group','2012-07-13',1.3,'atob',4,11),
('Midnight''s Way','Anna Midnight','1912-08-23',17.8,'btoa',12,2),
('The Way Home','Andrew Jinkins','2052-07-09',18.71,'btoa',10,1);





 