--
-- PostgreSQL database dump
--

-- Dumped from database version 14.9 (Debian 14.9-1.pgdg110+1)
-- Dumped by pg_dump version 14.9 (Debian 14.9-1.pgdg110+1)

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

--
-- Name: tiger; Type: SCHEMA; Schema: -; Owner: buyrista
--

CREATE SCHEMA tiger;


ALTER SCHEMA tiger OWNER TO buyrista;

--
-- Name: tiger_data; Type: SCHEMA; Schema: -; Owner: buyrista
--

CREATE SCHEMA tiger_data;


ALTER SCHEMA tiger_data OWNER TO buyrista;

--
-- Name: topology; Type: SCHEMA; Schema: -; Owner: buyrista
--

CREATE SCHEMA topology;


ALTER SCHEMA topology OWNER TO buyrista;

--
-- Name: SCHEMA topology; Type: COMMENT; Schema: -; Owner: buyrista
--

COMMENT ON SCHEMA topology IS 'PostGIS Topology schema';


--
-- Name: fuzzystrmatch; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS fuzzystrmatch WITH SCHEMA public;


--
-- Name: EXTENSION fuzzystrmatch; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION fuzzystrmatch IS 'determine similarities and distance between strings';


--
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';


--
-- Name: postgis_tiger_geocoder; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis_tiger_geocoder WITH SCHEMA tiger;


--
-- Name: EXTENSION postgis_tiger_geocoder; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis_tiger_geocoder IS 'PostGIS tiger geocoder and reverse geocoder';


--
-- Name: postgis_topology; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis_topology WITH SCHEMA topology;


--
-- Name: EXTENSION postgis_topology; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis_topology IS 'PostGIS topology spatial types and functions';


--
-- Name: enum_products_category; Type: TYPE; Schema: public; Owner: buyrista
--

CREATE TYPE public.enum_products_category AS ENUM (
    'Electronics',
    'Accessories',
    'Others'
);


ALTER TYPE public.enum_products_category OWNER TO buyrista;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: carts; Type: TABLE; Schema: public; Owner: buyrista
--

CREATE TABLE public.carts (
    count integer NOT NULL,
    "productId" uuid NOT NULL,
    "userId" uuid NOT NULL
);


ALTER TABLE public.carts OWNER TO buyrista;

--
-- Name: deliveryInfos; Type: TABLE; Schema: public; Owner: buyrista
--

CREATE TABLE public."deliveryInfos" (
    id uuid NOT NULL,
    country character varying(255) NOT NULL,
    city character varying(255) NOT NULL,
    "postalCode" integer NOT NULL,
    address character varying(255) NOT NULL,
    phone character varying(255) NOT NULL,
    "contactName" character varying(255) NOT NULL,
    "billingAddress" character varying(255),
    "billingName" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" uuid,
    "orderId" uuid
);


ALTER TABLE public."deliveryInfos" OWNER TO buyrista;

--
-- Name: favourites; Type: TABLE; Schema: public; Owner: buyrista
--

CREATE TABLE public.favourites (
    "productId" uuid NOT NULL,
    "userId" uuid NOT NULL
);


ALTER TABLE public.favourites OWNER TO buyrista;

--
-- Name: orderedProducts; Type: TABLE; Schema: public; Owner: buyrista
--

CREATE TABLE public."orderedProducts" (
    id uuid NOT NULL,
    "productId" uuid NOT NULL,
    "orderId" uuid NOT NULL,
    quantity integer NOT NULL,
    price numeric(10,2) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."orderedProducts" OWNER TO buyrista;

--
-- Name: orders; Type: TABLE; Schema: public; Owner: buyrista
--

CREATE TABLE public.orders (
    id uuid NOT NULL,
    total numeric(10,2) NOT NULL,
    "isPaid" boolean NOT NULL,
    "isComplete" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" uuid
);


ALTER TABLE public.orders OWNER TO buyrista;

--
-- Name: products; Type: TABLE; Schema: public; Owner: buyrista
--

CREATE TABLE public.products (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    "imageType" character varying(255) NOT NULL,
    "imageName" character varying(255) NOT NULL,
    "imageData" bytea NOT NULL,
    description text NOT NULL,
    brand character varying(255) NOT NULL,
    category public.enum_products_category NOT NULL,
    price numeric(10,2) NOT NULL,
    "countInStock" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.products OWNER TO buyrista;

--
-- Name: reviews; Type: TABLE; Schema: public; Owner: buyrista
--

CREATE TABLE public.reviews (
    id uuid NOT NULL,
    rating integer NOT NULL,
    title text,
    comment text,
    "productId" uuid NOT NULL,
    "userId" uuid NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.reviews OWNER TO buyrista;

--
-- Name: users; Type: TABLE; Schema: public; Owner: buyrista
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "isAdmin" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO buyrista;

--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: buyrista
--

COPY public.carts (count, "productId", "userId") FROM stdin;
\.


--
-- Data for Name: deliveryInfos; Type: TABLE DATA; Schema: public; Owner: buyrista
--

COPY public."deliveryInfos" (id, country, city, "postalCode", address, phone, "contactName", "billingAddress", "billingName", "createdAt", "updatedAt", "userId", "orderId") FROM stdin;
\.


--
-- Data for Name: favourites; Type: TABLE DATA; Schema: public; Owner: buyrista
--

COPY public.favourites ("productId", "userId") FROM stdin;
\.


--
-- Data for Name: orderedProducts; Type: TABLE DATA; Schema: public; Owner: buyrista
--

COPY public."orderedProducts" (id, "productId", "orderId", quantity, price, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: buyrista
--

COPY public.orders (id, total, "isPaid", "isComplete", "createdAt", "updatedAt", "userId") FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: buyrista
--

COPY public.products (id, name, "imageType", "imageName", "imageData", description, brand, category, price, "countInStock", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: buyrista
--

COPY public.reviews (id, rating, title, comment, "productId", "userId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: buyrista
--

COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: buyrista
--

COPY public.users (id, name, email, password, "isAdmin", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: geocode_settings; Type: TABLE DATA; Schema: tiger; Owner: buyrista
--

COPY tiger.geocode_settings (name, setting, unit, category, short_desc) FROM stdin;
\.


--
-- Data for Name: pagc_gaz; Type: TABLE DATA; Schema: tiger; Owner: buyrista
--

COPY tiger.pagc_gaz (id, seq, word, stdword, token, is_custom) FROM stdin;
\.


--
-- Data for Name: pagc_lex; Type: TABLE DATA; Schema: tiger; Owner: buyrista
--

COPY tiger.pagc_lex (id, seq, word, stdword, token, is_custom) FROM stdin;
\.


--
-- Data for Name: pagc_rules; Type: TABLE DATA; Schema: tiger; Owner: buyrista
--

COPY tiger.pagc_rules (id, rule, is_custom) FROM stdin;
\.


--
-- Data for Name: topology; Type: TABLE DATA; Schema: topology; Owner: buyrista
--

COPY topology.topology (id, name, srid, "precision", hasz) FROM stdin;
\.


--
-- Data for Name: layer; Type: TABLE DATA; Schema: topology; Owner: buyrista
--

COPY topology.layer (topology_id, layer_id, schema_name, table_name, feature_column, feature_type, level, child_id) FROM stdin;
\.


--
-- Name: topology_id_seq; Type: SEQUENCE SET; Schema: topology; Owner: buyrista
--

SELECT pg_catalog.setval('topology.topology_id_seq', 1, false);


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: buyrista
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY ("productId", "userId");


--
-- Name: deliveryInfos deliveryInfos_pkey; Type: CONSTRAINT; Schema: public; Owner: buyrista
--

ALTER TABLE ONLY public."deliveryInfos"
    ADD CONSTRAINT "deliveryInfos_pkey" PRIMARY KEY (id);


--
-- Name: favourites favourites_pkey; Type: CONSTRAINT; Schema: public; Owner: buyrista
--

ALTER TABLE ONLY public.favourites
    ADD CONSTRAINT favourites_pkey PRIMARY KEY ("productId", "userId");


--
-- Name: orderedProducts orderedProducts_pkey; Type: CONSTRAINT; Schema: public; Owner: buyrista
--

ALTER TABLE ONLY public."orderedProducts"
    ADD CONSTRAINT "orderedProducts_pkey" PRIMARY KEY (id);


--
-- Name: orderedProducts orderedProducts_productId_orderId_key; Type: CONSTRAINT; Schema: public; Owner: buyrista
--

ALTER TABLE ONLY public."orderedProducts"
    ADD CONSTRAINT "orderedProducts_productId_orderId_key" UNIQUE ("productId", "orderId");


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: buyrista
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: buyrista
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: buyrista
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_productId_userId_key; Type: CONSTRAINT; Schema: public; Owner: buyrista
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT "reviews_productId_userId_key" UNIQUE ("productId", "userId");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: buyrista
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: buyrista
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: carts carts_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: buyrista
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT "carts_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: carts carts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: buyrista
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT "carts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: deliveryInfos deliveryInfos_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: buyrista
--

ALTER TABLE ONLY public."deliveryInfos"
    ADD CONSTRAINT "deliveryInfos_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: deliveryInfos deliveryInfos_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: buyrista
--

ALTER TABLE ONLY public."deliveryInfos"
    ADD CONSTRAINT "deliveryInfos_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: favourites favourites_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: buyrista
--

ALTER TABLE ONLY public.favourites
    ADD CONSTRAINT "favourites_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: favourites favourites_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: buyrista
--

ALTER TABLE ONLY public.favourites
    ADD CONSTRAINT "favourites_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orderedProducts orderedProducts_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: buyrista
--

ALTER TABLE ONLY public."orderedProducts"
    ADD CONSTRAINT "orderedProducts_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orderedProducts orderedProducts_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: buyrista
--

ALTER TABLE ONLY public."orderedProducts"
    ADD CONSTRAINT "orderedProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orders orders_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: buyrista
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: reviews reviews_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: buyrista
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT "reviews_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: reviews reviews_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: buyrista
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

