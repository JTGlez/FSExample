CREATE TABLE IF NOT EXISTS public.users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    ap_pat VARCHAR(100) NOT NULL,
    ap_mat VARCHAR(100),
    age INT,
    email VARCHAR(100) UNIQUE NOT NULL,
    gender VARCHAR(10)
);
