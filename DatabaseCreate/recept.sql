drop table recept;
START TRANSACTION;
CREATE TABLE IF NOT EXISTS recept (
    id int(11) not null primary key AUTO_INCREMENT,
    date date default null,
    amount decimal(8,2) default null,
    shop  varchar(50) default null,
    category varchar(50) default null
)
commit;
START TRANSACTION;
INSERT INTO recept (id, date, amount, shop, category)
value(null, '2022-01-15', 2345.12, 'joonatanin kauppa', 'jotain'),
    (null, '2022-02-15', 1923.23, 'ruokakauppa', 'ruokaa'),
    (null, '2022-03-15', 1523.23, 'testikauppa', 'testi');
COMMIT;
SELECT * FROM recept;