// =====================================================
// LÓGICA DEL FORMULARIO
// =====================================================

/**
 * Inicializa los event listeners para validación en tiempo real
 */
function inicializarValidacionesFormulario() {
  // Validación de nombre
  document.getElementById('nombre')?.addEventListener('blur', function () {
    if (!validarNombre(this.value)) {
      mostrarError('nombre', '⚠️ El nombre debe tener al menos 3 caracteres');
    } else {
      mostrarValido('nombre');
    }
  });

  // Validación de teléfono
  document.getElementById('telefono')?.addEventListener('blur', function () {
    if (!validarTelefono(this.value)) {
      mostrarError('telefono', '⚠️ El teléfono debe tener exactamente 8 dígitos');
    } else {
      mostrarValido('telefono');
    }
  });

  // Validación de correo
  document.getElementById('correo')?.addEventListener('blur', function () {
    if (!validarEmail(this.value)) {
      mostrarError('correo', '⚠️ Ingrese un email válido');
    } else {
      mostrarValido('correo');
    }
  });

  // Validación de fecha de nacimiento
  document.getElementById('fechaNacimiento')?.addEventListener('change', function () {
    if (!validarFechaNacimiento(this.value)) {
      mostrarError('fechaNacimiento', '⚠️ Debe ser mayor de 18 años');
    } else {
      mostrarValido('fechaNacimiento');
      const edad = calcularEdad(this.value);
      document.getElementById('edadCalculada').value = edad;
      console.log('✅ Edad calculada:', edad, 'años');
    }
  });

  // Validación de dirección
  document.getElementById('direccion')?.addEventListener('blur', function () {
    if (!validarDireccion(this.value)) {
      mostrarError('direccion', '⚠️ La dirección debe tener al menos 10 caracteres');
    } else {
      mostrarValido('direccion');
    }
  });

  // Validación de rango de ingreso
  document.getElementById('rangoIngreso')?.addEventListener('change', function () {
    if (this.value === '') {
      mostrarError('rangoIngreso', '⚠️ Seleccione un rango de ingreso');
    } else {
      mostrarValido('rangoIngreso');
    }
  });

  // Validación de grado académico
  document.getElementById('gradoAcademico')?.addEventListener('change', function () {
    if (!validarGradoAcademico(this)) {
      mostrarError('gradoAcademico', '⚠️ Seleccione al menos un grado académico');
    } else {
      mostrarValido('gradoAcademico');
    }
  });

  // Validación de tipo de carga
  document.getElementById('tipoCarga')?.addEventListener('change', function () {
    if (this.value === '') {
      mostrarError('tipoCarga', '⚠️ Seleccione un tipo de carga');
    } else {
      mostrarValido('tipoCarga');
    }
  });
}

/**
 * Valida todos los campos del formulario antes de enviar
 * @param {HTMLFormElement} form - Formulario a validar
 * @returns {boolean} - true si todos los campos son válidos
 */
function validarFormularioCompleto(form) {
  let esValido = true;

  // Validar nombre
  if (!validarNombre(form.nombre.value)) {
    mostrarError('nombre', '⚠️ El nombre debe tener al menos 3 caracteres');
    esValido = false;
  } else {
    mostrarValido('nombre');
  }

  // Validar teléfono
  if (!validarTelefono(form.telefono.value)) {
    mostrarError('telefono', '⚠️ El teléfono debe tener exactamente 8 dígitos');
    esValido = false;
  } else {
    mostrarValido('telefono');
  }

  // Validar email
  if (!validarEmail(form.correo.value)) {
    mostrarError('correo', '⚠️ Ingrese un email válido');
    esValido = false;
  } else {
    mostrarValido('correo');
  }

  // Validar fecha de nacimiento
  if (!validarFechaNacimiento(form.fechaNacimiento.value)) {
    mostrarError('fechaNacimiento', '⚠️ Debe ser mayor de 18 años');
    esValido = false;
  } else {
    mostrarValido('fechaNacimiento');
    const edad = calcularEdad(form.fechaNacimiento.value);
    document.getElementById('edadCalculada').value = edad;
  }

  // Validar rango de ingreso
  if (form.rangoIngreso.value === '') {
    mostrarError('rangoIngreso', '⚠️ Seleccione un rango de ingreso');
    esValido = false;
  } else {
    mostrarValido('rangoIngreso');
  }

  // Validar grado académico
  const gradoAcademico = document.getElementById('gradoAcademico');
  if (!validarGradoAcademico(gradoAcademico)) {
    mostrarError('gradoAcademico', '⚠️ Seleccione al menos un grado académico');
    esValido = false;
  } else {
    mostrarValido('gradoAcademico');
  }

  // Validar género
  const genero = form.querySelector('input[name="genero"]:checked');
  if (!genero) {
    mostrarError('genero', '⚠️ Seleccione un género');
    esValido = false;
  }

  // Validar preferencia
  const preferencia = form.querySelector('input[name="preferencia"]:checked');
  if (!preferencia) {
    mostrarError('preferencia', '⚠️ Seleccione una preferencia');
    esValido = false;
  }

  // Validar dirección
  if (!validarDireccion(form.direccion.value)) {
    mostrarError('direccion', '⚠️ La dirección debe tener al menos 10 caracteres');
    esValido = false;
  } else {
    mostrarValido('direccion');
  }

  // Validar tipo de carga
  if (form.tipoCarga.value === '') {
    mostrarError('tipoCarga', '⚠️ Seleccione un tipo de carga');
    esValido = false;
  } else {
    mostrarValido('tipoCarga');
  }

  return esValido;
}

/**
 * Obtiene los datos del formulario preparados para envío
 * @param {HTMLFormElement} form - Formulario
 * @returns {Object} - Objeto con los datos del formulario
 */
function obtenerDatosFormulario(form) {
  const gradoAcademico = document.getElementById('gradoAcademico');
  const gradosSeleccionados = Array.from(gradoAcademico.selectedOptions)
    .map(option => option.value)
    .join(', ');

  const genero = form.querySelector('input[name="genero"]:checked');
  const preferencia = form.querySelector('input[name="preferencia"]:checked');

  return {
    nombre: form.nombre.value,
    telefono: form.telefono.value,
    correo: form.correo.value,
    fechaNacimiento: form.fechaNacimiento.value,
    edad: document.getElementById('edadCalculada').value,
    rangoIngreso: form.rangoIngreso.value,
    gradoAcademico: gradosSeleccionados,
    genero: genero ? genero.value : '',
    preferencia: preferencia ? preferencia.value : '',
    direccion: form.direccion.value,
    tipoCarga: form.tipoCarga.value,
    mensaje: form.mensaje.value || 'Sin mensaje adicional'
  };
}

/**
 * Inicializa el manejador de envío del formulario
 */
function inicializarEnvioFormulario() {
  const form = document.getElementById("formContacto");
  if (!form) return;

  const loading = form.querySelector('.loading');
  const errorMessage = form.querySelector('.error-message');
  const sentMessage = form.querySelector('.sent-message');

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    console.log('📤 Iniciando validación y envío del formulario...');

    // Validar todos los campos
    if (!validarFormularioCompleto(form)) {
      errorMessage.textContent = '❌ Por favor corrija los errores antes de enviar';
      errorMessage.style.display = 'block';
      setTimeout(() => {
        errorMessage.style.display = 'none';
      }, 5000);
      console.log('❌ Validación fallida, envío cancelado');
      return;
    }

    // Obtener datos del formulario
    const datosFormulario = obtenerDatosFormulario(form);

    // Mostrar loading
    loading.style.display = 'block';
    errorMessage.style.display = 'none';
    sentMessage.style.display = 'none';

    console.log('✅ Formulario válido, enviando con EmailJS...');

    // Inicializar EmailJS
    emailjs.init(CONFIG.emailJS.publicKey);

    // Enviar email
    emailjs.send(CONFIG.emailJS.serviceId, CONFIG.emailJS.templateId, datosFormulario)
      .then(() => {
        loading.style.display = 'none';
        sentMessage.style.display = 'block';
        form.reset();
        limpiarValidaciones();
        console.log('✅ Mensaje enviado exitosamente');
      })
      .catch((error) => {
        loading.style.display = 'none';
        errorMessage.textContent = '❌ Error al enviar. Intenta nuevamente.';
        errorMessage.style.display = 'block';
        console.error('❌ Error al enviar:', error);
      });
  });
}