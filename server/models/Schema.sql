create table user(
    user_id int unsigned unique not null primary key auto_increment,
    first_name varchar(100) not null,
    last_name varchar(100) not null,
    email varchar(255) not null,
    account_type varchar(100) default "user"
    password varchar(250) not null,
    phone_number varchar(20) default '+91123456789',
    date_of_birth date,
    created_at timestamp default current_timestamp
);

create table address(
    address_id int unsigned unique not null auto_increment,
    user_id int unsigned,
    address_type varchar(50) default "home",
    address_line_1 varchar(255) not null,
    address_line_2 varchar(255) not null,
    country varchar(100) not null,
    city varchar(200) not null,
    pincode varchar(50) not null,
    landmark varchar(255) not null,
    phone_number varchar(20) default '12345678910',
    created_at timestamp default current_timestamp,
    deleted_at timestamp,
    foreign key (user_id) references user(user_id)
);

create table category(
    category_id int unsigned primary key auto_increment,
    category_name varchar(100) not null,
    created_at timestamp default current_timestamp
);
create table sub_category (
  sub_category_id int unsigned primary key auto_increment,
  category_id int unsigned,
  sub_category_name varchar(200) not null,
  created_at timestamp default current_timestamp
);
create table products(
    product_id int unsigned primary key auto_increment,
    product_name text not null,
    description text not null,
    category_id int unsigned,
    created_at timestamp default current_timestamp,
    updated_at timestamp,
    foreign key (category_id) references category(category_id)
);

create table products_details(
    products_details_id int unsigned primary key auto_increment,
    product_id int unsigned,
    original_price int unsigned not null,
    final_price int unsigned not null,
    discount int unsigned not null,
    quantity int unsigned not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp,
    foreign key (product_id) references products(product_id)
);

create table products_images(
	product_image_id int unsigned primary key auto_increment,
    product_id int unsigned,
    value varchar(200) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp,
    foreign key (product_id) references products(product_id)
);
create table cart(
    cart_id int unsigned not null unique primary key auto_increment,
    user_id int unsigned,
    total int ,
    created_at timestamp default current_timestamp,
    updated_at timestamp,
    foreign key (user_id) references user(user_id)
);

create table cart_item(
    cart_item_id int unsigned not null unique auto_increment,
    cart_id int unsigned,
    product_id int unsigned,
    products_details_id int unsigned,
    quantity int not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp,
    foreign key (product_id) references product(product_id),
    foreign key products_details_id references products_details(products_details_id)
);


create table order_details(
    order_details_id int unsigned unique not null primary key auto_increment,
    user_id int unsigned,
    total int ,
    created_at timestamp default current_timestamp,
    updated_at timestamp,
    foreign key (user_id) references user(user_id)
);

create table order_item (
    order_item_id int unsigned unique not null ,
    order_details_id int unsigned,
    product_id int unsigned,
    products_details_id int unsigned,
    quantity int not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp,
    foreign key (order_details_id) references order_details(order_details_id),
    foreign key (product_id) references product(product_id),
    foreign key (products_details_id) references products_details(products_details_id)
);




create table wishlist(
    wishlist_id int unsigned unique auto_increment,
    user_id int unsigned,
    product_id int unsigned,
    created_at timestamp default current_timestamp,
    foreign key (user_id) references user(user_id),
    foreign key (product_id)references product(product_id)
);

