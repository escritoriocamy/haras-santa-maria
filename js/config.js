/* ===================================================================
   Haras Santa María de Juncal — configuración general de la web
   Lo único que hay que tocar acá es SCRIPT_URL (cuando esté publicado
   el Apps Script) y MODO_EJEMPLO.
   =================================================================== */
window.HARAS = {
  /* Dirección del Apps Script (Implementar → Aplicación web → URL que termina en /exec).
     Mientras esté vacía, la web funciona igual y muestra los ejemplos. */
  SCRIPT_URL: "",

  /* true = si todavía no hay ejemplares cargados, muestra 2 ejemplares de muestra
     (con la etiqueta "Ejemplo") para presentarle la web al dueño.
     Pasarlo a false el día que empiecen las ventas. */
  MODO_EJEMPLO: true,

  NOMBRE: "Haras Santa María de Juncal",
  WHATSAPP: "59899282486",
  TELEFONO: "(+598) 099 282 486",
  EMAIL: "santamariadejuncal@gmail.com",
  DIRECCION: "Ruta 3 Km 87, San José, Uruguay",
  PARAJE: "Paraje Juncal, San José de Mayo",
  INSTAGRAM: "https://www.instagram.com/harassantamariadejuncal/",
  FACEBOOK: "https://www.facebook.com/harassantamariadejuncal",
  MAPA: { lat: -34.386272, lng: -56.777203 }
};
