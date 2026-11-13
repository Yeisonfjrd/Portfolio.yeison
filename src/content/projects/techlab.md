---
title: TechLab
year: 2025
order: 4
featured: true
stack: [Java 21, Spring Boot 4, PostgreSQL, Flyway]
summary: API de una tienda, reescrita en Spring Boot desde un simulador en JavaScript.
github: https://github.com/Yeisonfjrd/techlab-ecommerce-simulator
figures:
  - kind: shot
    caption: Los endpoints, tal como están en el README del repo.
    screens:
      - { src: /projects/techlab-endpoints.webp, alt: Lista de endpoints de la API de TechLab en el README, width: 872, height: 660 }
---

Fue mi proyecto final del curso de backend de TechLab: una tienda entera simulada en una sola página con JavaScript. Después la reescribí en Spring Boot para practicar lo que en el navegador no existe: base de datos, validaciones, transacciones y tests.

Pasando las reglas me di cuenta de cosas que el simulador hacía mal, como rechazar stock 0 porque en JavaScript el 0 cuenta como falso. También probé qué pasa si dos personas compran el último producto a la vez: la segunda recibe un 409.
