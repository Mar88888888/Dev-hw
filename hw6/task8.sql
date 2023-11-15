UPDATE city
SET city = 'Dnipro', last_update = CURRENT_TIMESTAMP
WHERE city_id = 601
RETURNING *