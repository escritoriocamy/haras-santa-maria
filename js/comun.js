/* ===================================================================
   Haras Santa María de Juncal — funciones compartidas
   =================================================================== */
(function () {
  const C = window.HARAS;

  /* ---------- Íconos ---------- */
  const ICONOS = {
    flecha: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 12h15M13 6l6 6-6 6"/></svg>',
    izq: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M15 5l-7 7 7 7"/></svg>',
    der: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 5l7 7-7 7"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l12-7.5z"/></svg>',
    cerrar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 5l14 14M19 5L5 19"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z"/></svg>',
    telefono: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 7l9 6 9-6"/></svg>',
    lugar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.25-1.46 1.5-1.46h1.55V4.47A20 20 0 0 0 14.3 4.3c-2.25 0-3.8 1.37-3.8 3.9v2.3H8v3h2.5V21z"/></svg>',
    compartir: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4"/></svg>',
    rombo: '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor"><path d="M7 1l6 6-6 6-6-6z"/></svg>'
  };

  /* ---------- Ayudantes ---------- */
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function idDrive(url) {
    const m = String(url || "").match(/(?:\/d\/|id=|\/file\/d\/)([\w-]{20,})/);
    return m ? m[1] : "";
  }
  function idYoutube(url) {
    const m = String(url || "").match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
    return m ? m[1] : "";
  }
  /* Las fotos guardadas en Google Drive se muestran desde su servidor de imágenes */
  function foto(url, ancho) {
    const id = idDrive(url);
    if (id) return "https://lh3.googleusercontent.com/d/" + id + "=w" + (ancho || 1600);
    return url;
  }
  function videoEmbed(url) {
    const yt = idYoutube(url);
    if (yt) return { tipo: "iframe", src: "https://www.youtube-nocookie.com/embed/" + yt + "?rel=0&modestbranding=1" };
    const d = idDrive(url);
    if (d) return { tipo: "iframe", src: "https://drive.google.com/file/d/" + d + "/preview", vertical: true };
    if (url) return { tipo: "video", src: url };
    return null;
  }

  const SEXOS = { M: "Macho", H: "Hembra", C: "Macho castrado" };
  function sexoTexto(s) {
    s = String(s || "").trim();
    return SEXOS[s.charAt(0).toUpperCase()] || s;
  }
  function esHembra(e) { return String(e.sexo || "").trim().charAt(0).toUpperCase() === "H"; }

  function anioNac(e) {
    const m = String(e.nacimiento || "").match(/(\d{4})/);
    return m ? Number(m[1]) : null;
  }
  function edadTexto(e) {
    const a = anioNac(e);
    if (!a) return "";
    const n = new Date().getFullYear() - a;
    return n <= 0 ? "" : n + (n === 1 ? " año" : " años");
  }
  function fechaLarga(v) {
    const m = String(v || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!m) return String(v || "");
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    return Number(m[3]) + " de " + meses[Number(m[2]) - 1] + " de " + m[1];
  }
  function precioTexto(e) {
    const mostrar = String(e.mostrar_precio).toLowerCase();
    if (!e.precio || mostrar === "false" || mostrar === "no") return "";
    const num = Number(String(e.precio).replace(/[^\d]/g, ""));
    if (!num) return esc(e.precio);
    return (e.moneda || "USD") + " " + num.toLocaleString("es-UY");
  }
  function estadoClase(e) {
    const s = String(e.estado || "").toLowerCase();
    if (s.indexOf("vend") === 0) return "vendido";
    if (s.indexOf("reserv") === 0) return "reservado";
    return "disponible";
  }
  function waLink(texto) {
    return "https://wa.me/" + C.WHATSAPP + "?text=" + encodeURIComponent(texto || "Hola, les escribo desde la web del Haras Santa María de Juncal.");
  }
  function sangreTexto(e) {
    const p = e.ped || {};
    if (!p.p && !p.m) return "";
    return esc(p.p || "—") + " y " + esc(p.m || "—") + (p.mp ? ", por " + esc(p.mp) : "");
  }

  /* ---------- Datos de ejemplares en venta ---------- */
  let cacheVentas = null;
  async function cargarVentas() {
    if (cacheVentas) return cacheVentas;
    let lista = [];
    let conectado = false;
    if (C.SCRIPT_URL) {
      try {
        const r = await fetch(C.SCRIPT_URL + "?accion=listar", { cache: "no-store" });
        const j = await r.json();
        if (j && j.success) { lista = j.ejemplares || []; conectado = true; }
      } catch (err) { /* sin conexión con la planilla: se sigue con lo que haya */ }
    }
    if (!lista.length && C.MODO_EJEMPLO) {
      try {
        const r = await fetch("data/ejemplo-venta.json");
        lista = (await r.json()).map((e) => Object.assign(e, { ejemplo: true }));
      } catch (err) {}
    }
    cacheVentas = { lista: lista, conectado: conectado };
    return cacheVentas;
  }

  function tarjetaVenta(e) {
    const clase = estadoClase(e);
    const fotos = e.fotos || [];
    const portada = fotos[0] ? foto(fotos[0], 900) : "img/v-potrillos.jpg";
    const anio = anioNac(e);
    const estado = clase === "vendido" ? "Vendido" : clase === "reservado" ? "Reservado" : "";
    const meta = [sexoTexto(e.sexo), e.pelaje, anio].filter(Boolean).map(esc).join(", ");
    const precio = precioTexto(e);
    return '<a class="tarjeta' + (clase === "vendido" ? " vendida" : "") + '" href="ejemplar.html?id=' + encodeURIComponent(e.id) + '">' +
      '<div class="tarjeta-foto"><img src="' + esc(portada) + '" alt="' + esc(e.nombre) + '" loading="lazy"></div>' +
      '<div class="tarjeta-cuerpo">' +
        '<span class="meta">' + meta + (estado ? ' · <span class="marca-estado">' + estado + '</span>' : "") + (e.ejemplo ? ' · ficha de ejemplo' : "") + '</span>' +
        '<h3 class="nombre">' + esc(e.nombre) + '</h3>' +
        '<div class="tarjeta-sangre">' + sangreTexto(e) + '</div>' +
        '<div class="tarjeta-pie">' +
          '<span class="precio">' + (clase === "vendido" ? "<i>Vendido</i>" : precio ? precio : "<i>Precio a consultar</i>") + '</span>' +
          '<span class="ver">Ver ficha</span>' +
        '</div>' +
      '</div>' +
    '</a>';
  }

  function bloqueProximamente() {
    return '<div class="proximamente">' +
      '<h3>Próximamente</h3>' +
      '<p>Además del remate anual, el Haras ofrecerá en venta particular ejemplares seleccionados de su producción. Cada uno tendrá su ficha con fotos, video y pedigrí.</p>' +
      '<div class="acciones">' +
        '<a class="boton" href="' + waLink("Hola, quisiera recibir información cuando publiquen ejemplares en venta.") + '" target="_blank" rel="noopener">Avisarme por WhatsApp</a>' +
        '<a class="enlace" href="index.html#contacto">Escribirnos</a>' +
      '</div>' +
    '</div>';
  }

  /* ---------- Encabezado y pie ---------- */
  function encabezado(activo) {
    const izq = [["index.html#haras", "El Haras", "haras"], ["index.html#padrillos", "Padrillos", "padrillos"], ["plantel.html", "Plantel", "plantel"]];
    const der = [["venta.html", "En venta", "venta"], ["index.html#contacto", "Contacto", "contacto"]];
    const enlaces = (l) => l.map((i) => '<a href="' + i[0] + '"' + (i[2] === activo ? ' class="activo"' : "") + '>' + i[1] + '</a>').join("");
    const h = document.createElement("header");
    h.className = "encabezado";
    h.innerHTML =
      '<div class="contenedor enc-grid">' +
        '<nav class="nav izq" aria-label="Principal">' + enlaces(izq) + '</nav>' +
        '<a class="marca" href="index.html" aria-label="' + esc(C.NOMBRE) + ' — inicio"><img class="marca-azul" src="img/logo-azul.png" alt="' + esc(C.NOMBRE) + '" width="630" height="600"></a>' +
        '<nav class="nav der" aria-label="Ventas y contacto">' + enlaces(der) + '</nav>' +
        '<button class="boton-menu" type="button" aria-expanded="false">Menú</button>' +
      '</div>' +
      '<nav class="nav-movil" aria-label="Menú">' +
        '<button class="cerrar-menu" type="button">Cerrar</button>' +
        '<a href="index.html">Inicio</a>' + enlaces(izq) + enlaces(der) +
      '</nav>';
    document.body.prepend(h);
    const boton = h.querySelector(".boton-menu");
    const cerrar = () => { document.body.classList.remove("menu-abierto"); boton.setAttribute("aria-expanded", "false"); };
    boton.addEventListener("click", () => { document.body.classList.add("menu-abierto"); boton.setAttribute("aria-expanded", "true"); });
    h.querySelector(".cerrar-menu").addEventListener("click", cerrar);
    h.querySelectorAll(".nav-movil a").forEach((a) => a.addEventListener("click", cerrar));
  }

  function pie() {
    const f = document.createElement("footer");
    f.className = "pie";
    f.innerHTML =
      '<div class="contenedor">' +
        '<img class="pie-logo" src="img/logo-azul.png" alt="' + esc(C.NOMBRE) + '" loading="lazy">' +
        '<nav class="pie-links">' +
          '<a href="index.html#haras">El Haras</a><a href="index.html#padrillos">Padrillos</a><a href="venta.html">En venta</a>' +
          '<a href="plantel.html">Plantel</a><a href="index.html#contacto">Contacto</a>' +
          '<a href="' + C.INSTAGRAM + '" target="_blank" rel="noopener">Instagram</a><a href="' + C.FACEBOOK + '" target="_blank" rel="noopener">Facebook</a>' +
        '</nav>' +
        '<p class="pie-datos">' + esc(C.DIRECCION) + ' · <a href="' + waLink() + '" target="_blank" rel="noopener">' + esc(C.TELEFONO) + '</a> · <a href="mailto:' + C.EMAIL + '">' + esc(C.EMAIL) + '</a></p>' +
        '<p class="pie-legal">© ' + new Date().getFullYear() + ' ' + esc(C.NOMBRE) + '</p>' +
      '</div>';
    document.body.appendChild(f);
  }

  /* ---------- Aparición al hacer scroll ---------- */
  let observador = null;
  function animar(raiz) {
    const els = (raiz || document).querySelectorAll(".aparecer:not(.visible)");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("visible")); return; }
    if (!observador) {
      observador = new IntersectionObserver((entradas) => {
        entradas.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("visible"); observador.unobserve(en.target); } });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    }
    els.forEach((e) => observador.observe(e));
  }

  /* ---------- Modal ---------- */
  function abrirModal(html) {
    let m = document.querySelector(".modal");
    if (!m) {
      m = document.createElement("div");
      m.className = "modal";
      m.setAttribute("role", "dialog");
      m.setAttribute("aria-modal", "true");
      document.body.appendChild(m);
      m.addEventListener("click", (ev) => { if (ev.target === m || ev.target.closest(".modal-cerrar")) cerrarModal(); });
      document.addEventListener("keydown", (ev) => { if (ev.key === "Escape") cerrarModal(); });
    }
    m.innerHTML = '<button class="modal-cerrar" aria-label="Cerrar">' + ICONOS.cerrar + '</button>' + html;
    m.classList.add("abierto");
    document.body.style.overflow = "hidden";
    return m;
  }
  function cerrarModal() {
    const m = document.querySelector(".modal");
    if (!m) return;
    m.classList.remove("abierto");
    m.innerHTML = "";
    document.body.style.overflow = "";
  }
  function abrirFilm() {
    const m = abrirModal('<video src="video/haras-film.mp4" controls autoplay playsinline></video>');
    const v = m.querySelector("video");
    v.volume = 0.8;
  }

  /* ---------- Formulario de consulta ---------- */
  function conectarFormulario(form, extra) {
    if (!form) return;
    form.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      const datos = Object.fromEntries(new FormData(form).entries());
      Object.assign(datos, extra ? extra() : {});
      const boton = form.querySelector("button[type=submit]");
      const ok = form.querySelector(".mensaje-ok");
      const texto = "Hola, soy " + (datos.nombre || "") + ". " + (datos.ejemplar ? "Consulta por " + datos.ejemplar + ". " : "") + (datos.mensaje || "") + (datos.telefono ? " — Tel: " + datos.telefono : "");

      if (!C.SCRIPT_URL) {
        window.open(waLink(texto), "_blank", "noopener");
        if (ok) { ok.textContent = "Abrimos WhatsApp con tu mensaje listo para enviar."; ok.classList.add("visible"); }
        return;
      }
      boton.disabled = true;
      const original = boton.innerHTML;
      boton.textContent = "Enviando…";
      try {
        const r = await fetch(C.SCRIPT_URL, { method: "POST", body: JSON.stringify(Object.assign({ accion: "consulta" }, datos)) });
        const j = await r.json();
        if (!j.success) throw new Error(j.message || "");
        form.reset();
        if (ok) { ok.textContent = "¡Gracias! Recibimos tu consulta y te responderemos a la brevedad."; ok.classList.add("visible"); }
      } catch (err) {
        window.open(waLink(texto), "_blank", "noopener");
        if (ok) { ok.textContent = "No pudimos enviar el formulario; te abrimos WhatsApp con el mensaje listo."; ok.classList.add("visible"); }
      } finally {
        boton.disabled = false;
        boton.innerHTML = original;
      }
    });
  }

  window.Haras = {
    ICONOS, esc, foto, videoEmbed, idDrive, idYoutube, sexoTexto, esHembra, anioNac, edadTexto, fechaLarga,
    precioTexto, estadoClase, waLink, sangreTexto, cargarVentas, tarjetaVenta, bloqueProximamente,
    encabezado, pie, animar, abrirModal, cerrarModal, abrirFilm, conectarFormulario
  };
})();
