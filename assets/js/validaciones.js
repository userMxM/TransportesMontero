// =====================================================
// FUNCIONES DE VALIDACIÓN
// =====================================================

/**
 * Valida que el nombre tenga al menos 3 caracteres y solo letras
 * @param {string} nombre - Nombre a validar
 * @returns {boolean}
 */
function validarNombre(nombre) {
  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/;
  return regex.test(nombre.trim());
}

/**
 * Valida que el teléfono tenga exactamente 8 dígitos
 * @param {string} telefono - Teléfono a validar
 * @returns {boolean}
 */
function validarTelefono(telefono) {
  const regex = /^\d{8}$/;
  return regex.test(telefono.trim());
}

/**
 * Valida formato de email
 * @param {string} email - Email a validar
 * @returns {boolean}
 */
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
}

/**
 * Valida que la fecha de nacimiento corresponda a alguien mayor de 18 años
 * @param {string} fecha - Fecha en formato YYYY-MM-DD
 * @returns {boolean}
 */
function validarFechaNacimiento(fecha) {
  const hoy = new Date();
  const nacimiento = new Date(fecha);

  if (isNaN(nacimiento.getTime())) return false;
  if (nacimiento >= hoy) return false;

  const edad = calcularEdad(fecha);
  return edad >= 18 && edad <= 100;
}

/**
 * Calcula la edad a partir de una fecha de nacimiento
 * @param {string} fechaNacimiento - Fecha en formato YYYY-MM-DD
 * @returns {number} - Edad en años
 */
function calcularEdad(fechaNacimiento) {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();

  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }

  return edad;
}

/**
 * Valida que la dirección tenga al menos 10 caracteres
 * @param {string} direccion - Dirección a validar
 * @returns {boolean}
 */
function validarDireccion(direccion) {
  return direccion.trim().length >= 10;
}

/**
 * Valida que al menos un grado académico esté seleccionado
 * @param {HTMLSelectElement} select - Elemento select
 * @returns {boolean}
 */
function validarGradoAcademico(select) {
  return select.selectedOptions.length > 0;
}

/**
 * Muestra mensaje de error en un campo
 * @param {string} inputId - ID del campo
 * @param {string} mensaje - Mensaje de error
 */
function mostrarError(inputId, mensaje) {
  const input = document.getElementById(inputId);
  const errorText = document.getElementById(`error-${inputId}`);

  if (!input || !errorText) return;

  input.classList.add('is-invalid');
  input.classList.remove('is-valid');
  errorText.textContent = mensaje;
  errorText.classList.add('show');
}

/**
 * Muestra que un campo es válido
 * @param {string} inputId - ID del campo
 */
function mostrarValido(inputId) {
  const input = document.getElementById(inputId);
  const errorText = document.getElementById(`error-${inputId}`);

  if (!input || !errorText) return;

  input.classList.remove('is-invalid');
  input.classList.add('is-valid');
  errorText.classList.remove('show');
}

/**
 * Limpia todas las validaciones visuales del formulario
 */
function limpiarValidaciones() {
  document.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
    el.classList.remove('is-valid', 'is-invalid');
  });
}