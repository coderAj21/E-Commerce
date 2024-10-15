create table user(
    user_id int unsigned unique not null primary key auto_increment,
    first_name varchar(100) not null,
    last_name varchar(100) not null,
    email varchar(255) not null,
    account_type varchar(100) default "user",
    password varchar(250) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp
);

create table address(
    address_id int unsigned unique not null auto_increment,
    user_id int unsigned,
    address_type enum ("office","home") not null default "home",
    address_line_1 varchar(255) not null,
    address_line_2 varchar(255) not null,
    landmark varchar(255) not null,
    country varchar(100) not null,
    city varchar(200) not null,
    pincode varchar(6) check (char_length(pincode)=6 and pincode REGEXP '^[0-9]+$'),
    phone_number varchar(10) check(char_length(phone_number)=10 and phone_number REGEXP '^[0-9]+$'),
    created_at timestamp default current_timestamp,
    updated_at timestamp,
    foreign key (user_id) references user(user_id)
);

create table user_profile(
    profile_id int unsigned primary  key auto_increment,
    user_id int unsigned,
    user_image varchar(30),
    date_of_birth date,
    phone_number varchar(10) check(char_length(phone_number)=10 and phone_number REGEXP '^[0-9]+$'),
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
    brand_name varchar(255) not null,
    is_avaialble boolean not null default 1,
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
create table products_weight(
    product_weight_id int unsigned primary key auto_increment,
    product_id int unsigned,
    value float unsigned not null default 0,
    created_at timestamp default current_timestamp,
    updated_at timestamp,
    foreign key (product_id) references products(product_id)
);

create table products_flavours(
    product_flavour_id int unsigned primary key auto_increment,
    product_id int unsigned,
    value text not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp,
    foreign key (product_id) references products(product_id)
);

create table order_details(
	order_id int unsigned primary key auto_increment,
    user_id int unsigned,
    total_amount int unsigned not null default 0,
    order_status enum ("Pending","Processing","Shipped","Delivered") not null default "Pending",
    payment_status enum ("Pending","Completed","Failed") not null default "Pending",
    shipping_address_id int unsigned,
    created_at timestamp default current_timestamp,
    updated_at timestamp,
    foreign key (user_id) references user(user_id),
    foreign key (shipping_address_id) references address(address_id)
);
create table order_items(
	order_item_id int unsigned primary key auto_increment,
    order_id int unsigned,
    product_id int unsigned,
    quantity int unsigned,
    price int unsigned,
    total_price int unsigned,
    created_at timestamp default current_timestamp,
    foreign key (order_id) references order_details(order_id),
    foreign key (product_id) references products (product_id)
);
create table payment_details(
		payment_id int unsigned primary key auto_increment,
        order_id int unsigned,
        user_id int unsigned,
        payment_status enum ("Pending","Completed","Failed") not null default "Pending",
        amount float unsigned,
        currency varchar(20) not null,
        transaction_id varchar (50) not null,
        created_at timestamp default current_timestamp,
        updated_at timestamp,
        foreign key (order_id) references order_details(order_id),
        foreign key (user_id) references user (user_id)
);