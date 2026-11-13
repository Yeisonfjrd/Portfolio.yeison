---
title: Garmin Coach
year: 2026
order: 3
featured: true
stack: [TypeScript, MCP, Node, Vitest]
summary: Servidor MCP que lee Garmin Connect y escribe entrenamientos en el reloj.
github: https://github.com/Yeisonfjrd/garmin-coach-mcp
links:
  - { label: En npm, href: "https://www.npmjs.com/package/garmin-coach-mcp" }
figures:
  - kind: shot
    caption: Una corrida real contra mi cuenta. Crea 6 x 400 m, lo agenda el miércoles y aparece en el calendario que se sincroniza con el reloj.
    screens:
      - { src: /projects/garmin-demo.gif, alt: "Grabación: le pido 6 x 400 m para el miércoles, el servidor crea el entrenamiento y aparece en el calendario", width: 820, height: 480 }
---

Casi todo lo que encontré para conectar una IA con Garmin solo leía datos. Yo quería que además me armara el entrenamiento y lo mandara al reloj, así que hice este servidor MCP: lee sueño, salud y actividades, y escribe entrenamientos con series en el calendario.

Fue el primer proyecto donde los tests me enseñaron algo que no sabía: 11 fallaban solo si la compu no estaba en UTC, por cómo JavaScript lee las fechas. Desde ahí el CI corre en las dos zonas.
