--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4
-- Dumped by pg_dump version 13.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: exams; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exams (
    id integer NOT NULL,
    name text NOT NULL,
    category_id integer NOT NULL,
    subject_id integer NOT NULL,
    teacher_id integer NOT NULL,
    semester_id integer NOT NULL,
    link text NOT NULL
);


ALTER TABLE public.exams OWNER TO postgres;

--
-- Name: exams_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.exams_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.exams_id_seq OWNER TO postgres;

--
-- Name: exams_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.exams_id_seq OWNED BY public.exams.id;


--
-- Name: semesters; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.semesters (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.semesters OWNER TO postgres;

--
-- Name: semesters_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.semesters_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.semesters_id_seq OWNER TO postgres;

--
-- Name: semesters_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.semesters_id_seq OWNED BY public.semesters.id;


--
-- Name: subjects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subjects (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.subjects OWNER TO postgres;

--
-- Name: subjects_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subjects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.subjects_id_seq OWNER TO postgres;

--
-- Name: subjects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subjects_id_seq OWNED BY public.subjects.id;


--
-- Name: teachers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teachers (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.teachers OWNER TO postgres;

--
-- Name: teachers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.teachers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.teachers_id_seq OWNER TO postgres;

--
-- Name: teachers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.teachers_id_seq OWNED BY public.teachers.id;


--
-- Name: teachers_subjects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teachers_subjects (
    id integer NOT NULL,
    teacher_id integer NOT NULL,
    subject_id integer NOT NULL
);


ALTER TABLE public.teachers_subjects OWNER TO postgres;

--
-- Name: teachers_subjects_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.teachers_subjects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.teachers_subjects_id_seq OWNER TO postgres;

--
-- Name: teachers_subjects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.teachers_subjects_id_seq OWNED BY public.teachers_subjects.id;


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: exams id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exams ALTER COLUMN id SET DEFAULT nextval('public.exams_id_seq'::regclass);


--
-- Name: semesters id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.semesters ALTER COLUMN id SET DEFAULT nextval('public.semesters_id_seq'::regclass);


--
-- Name: subjects id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subjects ALTER COLUMN id SET DEFAULT nextval('public.subjects_id_seq'::regclass);


--
-- Name: teachers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teachers ALTER COLUMN id SET DEFAULT nextval('public.teachers_id_seq'::regclass);


--
-- Name: teachers_subjects id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teachers_subjects ALTER COLUMN id SET DEFAULT nextval('public.teachers_subjects_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name) FROM stdin;
1	P1
2	P2
3	P3
4	2ch
5	Outras
\.


--
-- Data for Name: exams; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.exams (id, name, category_id, subject_id, teacher_id, semester_id, link) FROM stdin;
3	2020.1	1	1	1	1	https://raw.githubusercontent.com/ontiyonke/book-1/master/%5BPROGRAMMING%5D%5BClean%20Code%20by%20Robert%20C%20Martin%5D.pdf
4	2020.1	1	1	1	1	https://raw.githubusercontent.com/ontiyonke/book-1/master/%5BPROGRAMMING%5D%5BClean%20Code%20by%20Robert%20C%20Martin%5D.pdf
5	haha	1	4	1	1	https://raw.githubusercontent.com/ontiyonke/book-1/master/%5BPROGRAMMING%5D%5BClean%20Code%20by%20Robert%20C%20Martin%5D.pdf
6	haha	1	4	1	1	https://raw.githubusercontent.com/ontiyonke/book-1/master/%5BPROGRAMMING%5D%5BClean%20Code%20by%20Robert%20C%20Martin%5D.pdf
7	Provinha maneira	1	1	1	1	https://raw.githubusercontent.com/ontiyonke/book-1/master/%5BPROGRAMMING%5D%5BClean%20Code% 20by%20Robert%20C%20Martin%5D.pdf
8	2020.2	2	2	2	2	https://raw.githubusercontent.com/ontiyonke/book-1/master/%5BPROGRAMMING%5D%5BClean%20Code%20by%20Robert%20C%20Martin%5D.pdf
9	2020.3	2	1	1	1	https://raw.githubusercontent.com/ontiyonke/book-1/master/%5BPROGRAMMING%5D%5BClean%20Code%20by%20Robert%20C%20Martin%5D.pdf
10	2021.5	3	1	1	1	https://eloquentjavascript.net/Eloquent_JavaScript.pdf
11	2020.1	1	1	1	1	https://eloquentjavascript.net/Eloquent_JavaScript.pdf
12	testando	1	1	1	2	https://eloquentjavascript.net/Eloquent_JavaScript.pdf
\.


--
-- Data for Name: semesters; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.semesters (id, name) FROM stdin;
1	1º
2	2º
3	3º
4	4º
5	5º
6	6º
7	7º
8	8º
9	Eletivas
\.


--
-- Data for Name: subjects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subjects (id, name) FROM stdin;
1	Cálculo I
2	Álgebra Linear
3	Eletromagnetismo
4	Mecânica Quântica
\.


--
-- Data for Name: teachers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.teachers (id, name) FROM stdin;
1	João branco
2	José Amarelo
3	Cláudio Vermelho
4	Antônio Azul
\.


--
-- Data for Name: teachers_subjects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.teachers_subjects (id, teacher_id, subject_id) FROM stdin;
1	1	1
2	1	2
3	2	2
4	2	4
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 5, true);


--
-- Name: exams_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.exams_id_seq', 12, true);


--
-- Name: semesters_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.semesters_id_seq', 9, true);


--
-- Name: subjects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subjects_id_seq', 4, true);


--
-- Name: teachers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.teachers_id_seq', 4, true);


--
-- Name: teachers_subjects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.teachers_subjects_id_seq', 4, true);


--
-- Name: categories categories_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pk PRIMARY KEY (id);


--
-- Name: exams exams_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exams
    ADD CONSTRAINT exams_pk PRIMARY KEY (id);


--
-- Name: semesters semesters_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.semesters
    ADD CONSTRAINT semesters_pk PRIMARY KEY (id);


--
-- Name: subjects subjects_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT subjects_pk PRIMARY KEY (id);


--
-- Name: teachers teachers_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT teachers_pk PRIMARY KEY (id);


--
-- Name: teachers_subjects teachers_subjects_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teachers_subjects
    ADD CONSTRAINT teachers_subjects_pk PRIMARY KEY (id);


--
-- Name: exams exams_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exams
    ADD CONSTRAINT exams_fk0 FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- Name: exams exams_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exams
    ADD CONSTRAINT exams_fk1 FOREIGN KEY (subject_id) REFERENCES public.subjects(id);


--
-- Name: exams exams_fk2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exams
    ADD CONSTRAINT exams_fk2 FOREIGN KEY (teacher_id) REFERENCES public.teachers(id);


--
-- Name: exams exams_fk3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exams
    ADD CONSTRAINT exams_fk3 FOREIGN KEY (semester_id) REFERENCES public.semesters(id);


--
-- Name: teachers_subjects teachers_subjects_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teachers_subjects
    ADD CONSTRAINT teachers_subjects_fk0 FOREIGN KEY (teacher_id) REFERENCES public.teachers(id);


--
-- Name: teachers_subjects teachers_subjects_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teachers_subjects
    ADD CONSTRAINT teachers_subjects_fk1 FOREIGN KEY (subject_id) REFERENCES public.subjects(id);


--
-- PostgreSQL database dump complete
--

