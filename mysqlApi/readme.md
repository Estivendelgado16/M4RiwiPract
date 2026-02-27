##UNIQUE — Campo único

`CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    nombre VARCHAR(50)
);`


##FOREIGN KEY (FK) — Relaciones

Ejemplo real: clientes y pedidos

Tabla clientes

`CREATE TABLE cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50)
);`

Tabla pedidos

CREATE TABLE pedido (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    fecha DATE,
    FOREIGN KEY (id_cliente)
        REFERENCES cliente(id_cliente)
);


##Relación MUCHOS a MUCHOS (N:M)

Ejemplo:

estudiantes

cursos

Un estudiante puede tener muchos cursos.
Un curso muchos estudiantes.

tablas principales:

`CREATE TABLE estudiante (
    id_estudiante INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50)
);

CREATE TABLE curso (
    id_curso INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50)
);`

tabla intermedia:

`CREATE TABLE inscripcion (
    id_estudiante INT,
    id_curso INT,
    PRIMARY KEY (id_estudiante, id_curso),
    FOREIGN KEY (id_estudiante)
        REFERENCES estudiante(id_estudiante),
    FOREIGN KEY (id_curso)
        REFERENCES curso(id_curso)
);`


##ON DELETE y ON UPDATE

`CREATE TABLE empresa (
    id_empresa INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE empleado (
    id_empleado INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    salario DECIMAL(10,2) CHECK (salario > 0),
    id_empresa INT,
    FOREIGN KEY (id_empresa)
        REFERENCES empresa(id_empresa)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);`

