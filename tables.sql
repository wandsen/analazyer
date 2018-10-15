CREATE TABLE IF NOT EXISTS financialreport(
id SERIAL PRIMARY KEY,
name text,
data json,
created_at TIMESTAMPTZ DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS rawstockdata(
id SERIAL PRIMARY KEY,
name text,
currentprince integer
);


CREATE TABLE IF NOT EXISTS users(
id SERIAL PRIMARY KEY,
username text,
password text

);

CREATE TABLE IF NOT EXISTS followstock(
id SERIAL PRIMARY KEY,
username text,
stockname text
);

