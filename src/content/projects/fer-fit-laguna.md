---
title: Fer Fit Laguna
year: 2026
order: 1
featured: true
stack: [Java 21, Spring Boot 4, PostgreSQL, Flyway, Render, Neon]
summary: App de reservas y pagos para las clases de funcional de Fer.
privateNote: El código es privado porque es de Fer.
facts:
  - { label: En uso, value: Desde octubre de 2026 }
  - { label: Clases, value: "6 lugares por clase, los sábados sin límite" }
  - { label: Pagos, value: "Por alias: la alumna avisa y Fer confirma" }
  - { label: Costo, value: "$0 por mes, en Render y Neon gratis" }
# Cuando Fer mande su reseña, va acá tal cual la escribió:
# testimonial: { quote: "...", author: Fer, role: entrenadora de funcional }
---

Fer da clases de funcional y llevaba todo por WhatsApp: quién venía, quién pagó, cuántos lugares quedaban. Le armé una app para que sus alumnas reserven y paguen por alias, y ella confirma todo desde su panel.

Es el primer proyecto mío que usa gente de verdad. Los errores los voy viendo en los logs del backend en Render, y con el uso me di cuenta de varias cosas que no había pensado desde el lado de las alumnas. Por ejemplo, una alumna nueva podía reservar antes de elegir su abono y esas clases se le contaban como sueltas. Ahora cambiar de plan recalcula sus reservas.
