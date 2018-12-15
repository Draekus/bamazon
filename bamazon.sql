create database bamazon;

create table bamazon.products(
	id integer not null auto_increment primary key,
    product_name varchar(50) not null,
    department_name varchar(50) not null,
    price int not null,
    stock_quantity int not null
);

insert into bamazon.products (product_name, department_name, price, stock_quantity) 
values ('Logitech G502 Mouse', 'Computer Accessories', '50', '85');

insert into bamazon.products (product_name, department_name, price, stock_quantity) 
values ('Logitech G402 Mouse', 'Computer Accessories', '40', '100');

insert into bamazon.products (product_name, department_name, price, stock_quantity) 
values ('Nvidia GTX 1080Ti', 'Computer Hardware', '850', '50');

insert into bamazon.products (product_name, department_name, price, stock_quantity) 
values ('Nvidia GTX 2080Ti', 'Computer Hardware', '1450', '20');

insert into bamazon.products (product_name, department_name, price, stock_quantity) 
values ('Intel Core i7-7700K', 'Computer Hardware', '350', '200');

insert into bamazon.products (product_name, department_name, price, stock_quantity) 
values ('Black Desert Online', 'Video Games', '10', '120');

insert into bamazon.products (product_name, department_name, price, stock_quantity) 
values ('Hunt Showdown', 'Video Games', '20', '72');

insert into bamazon.products (product_name, department_name, price, stock_quantity) 
values ('Logitech K840 Keyboard', 'Computer Accessories', '45', '170');

insert into bamazon.products (product_name, department_name, price, stock_quantity) 
values ('Cooler Master Hyper 212E Fan', 'Computer Hardware', '30', '121');

insert into bamazon.products (product_name, department_name, price, stock_quantity) 
values ('MSI Gaming Intel B250 Motherboard', 'Computer Hardware','120', '135');

insert into bamazon.products (product_name, department_name, price, stock_quantity) 
values ('Capri Sun Fruit Punch 10 Pack', 'Food & Drinks', '15', '56');

update bamazon.products
set stock_quantity = 3
where id = 3;