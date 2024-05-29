 -- _hl stands for human language
CREATE FUNCTION stellar_bodies.life_support_type_hl(@life_support_type VARCHAR(15))
RETURNS VARCHAR(50) AS
BEGIN
    DECLARE @life_support_type_human_language VARCHAR(50)
    SET @life_support_type_human_language = (SELECT CASE @life_support_type
        WHEN 'EARTHLIKE' THEN 'Earth like, Carbon base'
        WHEN 'HELLIONS' THEN 'Hellions, Silicon base'
        ELSE 'unknown' END)
    RETURN @life_support_type_human_language
END