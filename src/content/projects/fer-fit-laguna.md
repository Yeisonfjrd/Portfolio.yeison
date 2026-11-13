---
title: Fer Fit Laguna
year: 2026
order: 1
featured: true
stack: [Java 21, Spring Boot 4, PostgreSQL, Flyway, Render y Neon, sin costo]
summary: App de reservas y pagos para las clases de funcional de Fer.
privateNote: El código es privado porque es de Fer.
figures:
  - kind: phones
    caption: Una alumna pagando el mes, y el panel donde Fer arma los horarios. Capturas de la demo, con datos de prueba.
    screens:
      - { src: /projects/fer-pagar.webp, alt: Pantalla de una alumna pagando el abono por alias, width: 390, height: 844 }
      - { src: /projects/fer-horario.webp, alt: Panel de Fer con los horarios de la semana y el cupo de cada clase, width: 390, height: 880 }
  - kind: phones
    caption: Las clases de la semana en el panel de Fer, con los pagos que le falta confirmar arriba.
    screens:
      - { src: /projects/fer-panel.webp, alt: Panel de Fer con un pago para confirmar y la próxima clase, width: 390, height: 700 }
---

Fer da clases de funcional y llevaba todo por WhatsApp: quién venía, quién pagó, cuántos lugares quedaban. Le armé una app para que sus alumnas reserven y paguen por alias, y ella confirma todo desde su panel.

Es el primer proyecto mío que usa gente de verdad. Los errores los voy viendo en los logs del backend en Render, y con el uso me di cuenta de varias cosas que no había pensado desde el lado de las alumnas. Por ejemplo, una alumna nueva podía reservar antes de elegir su abono y esas clases se le contaban como sueltas. Ahora cambiar de plan recalcula sus reservas.
