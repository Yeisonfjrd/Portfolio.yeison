---
title: ai-fix
year: 2026
order: 2
featured: true
stack: [Java 21, Maven, JavaParser, Ollama, GitHub Actions]
summary: Plugin de Maven que arregla tests rotos con un modelo local.
github: https://github.com/Yeisonfjrd/ai-fix-maven-plugin
links:
  - { label: En el Marketplace, href: "https://github.com/marketplace/actions/ai-fix-for-maven" }
figures:
  - kind: shot
    caption: El PR que abrió el bot solo. El subtotal no multiplicaba por la cantidad.
    screens:
      - { src: /projects/ai-fix-pr.webp, alt: Pull request abierto por el bot de ai-fix con el arreglo del método subtotal, width: 890, height: 660 }
numbers:
  columns: [Modelo, 1ra, 2da, 3ra]
  rows:
    - { label: "qwen3-coder 30B, en la GPU", values: ["9", "9", "10"] }
    - { label: "qwen2.5-coder 7B, solo CPU", values: ["7", "7", "7"] }
  note: Bugs arreglados de 10, en tres corridas. Solo cuenta si pasan también los tests que el modelo nunca vio.
---

Quería saber si un modelo que corre en mi notebook podía arreglar tests rotos en Java sin inventar nada. Armé un plugin: corre los tests, le pasa al modelo el error y las clases que toca, y solo deja el cambio si pasan todos.

Para no engañarme armé 10 bugs con tests escondidos que el modelo nunca ve. Lo corrí tres veces con cada modelo, y los números de abajo son esos, no el mejor intento.
