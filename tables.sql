CREATE TABLE users (
    id serial primary key,
    name text not null,
    email text not null unique,
    password text not null unique,
    "createdAt" timestamp not null default now()
);

CREATE TABLE urls (
    id serial primary key,
    url text not null,
    "shortUrl" text not null unique,
    "visitCount" integer not null default 0,
    "userId" integer not null references "users"(id),
    "createdAt" timestamp not null default now()
);

CREATE TABLE sessions (
    id serial primary key,
    token text not null unique,
    "userId" integer not null references "users"(id),
    "createdAt" timestamp not null default now()
);