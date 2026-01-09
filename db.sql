CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    full_name VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    avatar_url TEXT,

    -- OAuth (Google, Facebook, Apple...)
    provider VARCHAR(50) NOT NULL DEFAULT 'google',
    provider_user_id VARCHAR(255) NOT NULL,

    -- Optional (chỉ dùng nếu sau này thêm login email/password)
    password_hash TEXT,

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (provider, provider_user_id)
);


CREATE TABLE languages (
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL, -- EN, JP
    name VARCHAR(50) NOT NULL
);
CREATE TABLE exams (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL, -- IELTS, JLPT
    name VARCHAR(50)
);
CREATE TABLE levels (
    id SERIAL PRIMARY KEY,
    exam_id INT REFERENCES exams(id),
    code VARCHAR(20), -- IELTS 6.5 / N5 / N4
    description TEXT
);
CREATE TABLE topics (
    id SERIAL PRIMARY KEY,
    language_id INT REFERENCES languages(id),
    level_id INT REFERENCES levels(id),
    title VARCHAR(100),
    description TEXT
);
CREATE TABLE lessons (
    id SERIAL PRIMARY KEY,
    topic_id INT REFERENCES topics(id),
    title VARCHAR(100),
    lesson_type VARCHAR(50), -- vocabulary, grammar, reading, listening
    order_index INT
);
CREATE TABLE vocabulary (
    id SERIAL PRIMARY KEY,
    language_id INT REFERENCES languages(id),
    level_id INT REFERENCES levels(id),
    word VARCHAR(100),
    pronunciation VARCHAR(100),
    meaning TEXT,
    example TEXT
);
CREATE TABLE vocabulary_images (
    id SERIAL PRIMARY KEY,
    vocabulary_id INT REFERENCES vocabulary(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL
);
CREATE TABLE vocabulary_audio (
    id SERIAL PRIMARY KEY,
    vocabulary_id INT REFERENCES vocabulary(id),
    audio_url TEXT
);
CREATE TABLE exercises (
    id SERIAL PRIMARY KEY,
    lesson_id INT REFERENCES lessons(id),
    exercise_type VARCHAR(50), 
    -- reading, listening, speaking, writing, quiz
    title VARCHAR(150)
);
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    exercise_id INT REFERENCES exercises(id),
    question_text TEXT,
    question_type VARCHAR(50) 
    -- multiple_choice, image_choice, fill_blank, speaking
);
CREATE TABLE question_options (
    id SERIAL PRIMARY KEY,
    question_id INT REFERENCES questions(id),
    option_text TEXT,
    option_image TEXT,
    is_correct BOOLEAN DEFAULT FALSE
);
CREATE TABLE tests (
    id SERIAL PRIMARY KEY,
    exam_id INT REFERENCES exams(id),
    level_id INT REFERENCES levels(id),
    title VARCHAR(100),
    duration_minutes INT
);
CREATE TABLE test_questions (
    id SERIAL PRIMARY KEY,
    test_id INT REFERENCES tests(id),
    question_text TEXT,
    skill VARCHAR(20) -- reading, listening, speaking, writing
);
CREATE TABLE user_progress (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    lesson_id INT REFERENCES lessons(id),
    progress_percent INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE user_test_results (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    test_id INT REFERENCES tests(id),
    score FLOAT,
    band_estimate VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE user_speaking (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    question_id INT REFERENCES test_questions(id),
    audio_url TEXT,
    ai_score FLOAT,
    feedback TEXT
);
CREATE TABLE user_writing (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    question_id INT REFERENCES test_questions(id),
    content TEXT,
    ai_score FLOAT,
    feedback TEXT
);
CREATE TABLE achievements (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    icon_url TEXT
);
CREATE TABLE user_achievements (
    user_id UUID REFERENCES users(id),
    achievement_id INT REFERENCES achievements(id),
    achieved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, achievement_id)
);
