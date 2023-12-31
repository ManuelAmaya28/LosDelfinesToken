//variables
let campNumber = document.getElementById("campNumber");
let contraseña = document.getElementById("Contraseña");
let ConfiContraseña = document.getElementById("ConfiContraseña");
let botonIngresar = document.getElementById("botonIngresar");
let correo = document.getElementById("Correo");
let IdNombre = document.getElementById("IdNombre");
let correoValido = true;
let nombreValido = true;
let botonCrear = document.getElementById("botonCrear");
let alertErrorTextoLogin = document.getElementById("alertErrorTextoLogin");
let alertErrorLogin = document.getElementById("alertErrorLogin");
let alertExito = document.getElementById("alertExito");
let errorLogin = document.getElementById("errorLogin");
let errorLoginTexto = document.getElementById("errorLoginTexto");
let idTimeout;
let arrayUsuarios = [];
let correoLogin = document.getElementById("correoLogin");
let contraseñaLogin = document.getElementById("contraseñaLogin");
let alertInicioSesion = document.getElementById("alertInicioSesion");
let inicioSesionTexto = document.getElementById("inicioSesionTexto");
// const URL_MAIN ='https://losdelfinesbackend-production.up.railway.app/api/usuarios/'; 
const URL_MAIN ='http://127.0.0.1:8080/usuarios/';
let arrayValidarRegistro = [];


//Los metodos necesitan del access token, entonces esta funcion pide el access token pero 
//no logre entregarlas en las otras promesas

/* async function login() {
  try {
    const response = await fetch('http://127.0.0.1:8080/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        correo: 'manuel.amaya@hotmail.com',
        contrasena: '28deAbril-',
      }),
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud de login');
    }

    const data = await response.json();

    // Guardar el valor de data en el Local Storage
    localStorage.setItem('loginData', JSON.stringify(data));

    return data;
  } catch (error) {
    console.error(error);
    // Manejo de errores o retorno de un valor por defecto en caso de error
    return null;
  }
}

const storedData = localStorage.getItem('loginData');

console.log(storedData); */

botonCrear.addEventListener("click", function (event) {
    event.preventDefault();
    clearTimeout(idTimeout);
    alertExito.style.display = "none";
    alertErrorTextoLogin.innerHTML = "";
    alertErrorLogin.style.display = "none";
    let NombreErrores = "Los siguientes campos deben ser llenados correctamente:<ul>";

    if (!validarNombre()) {
        NombreErrores += "<li>Escribe un nombre válido.</li>";
        alertErrorLogin.style.display = "block";
    } else {
        IdNombre.style.border = "solid thin green";
    }// if validarNombre



    if (!validarCorreo()) {
        NombreErrores += "<li>Escribe un correo válido.</li>";
        alertErrorLogin.style.display = "block";
    } else {
        correo.style.border = "solid thin green";
    }//if validarCorreo


    if (!validarNumero()) {
        NombreErrores += "<li>Escribe un número válido.</li>";
        alertErrorLogin.style.display = "block";
    } else {
        campNumber.style.border = "solid thin green";
    }//if validarCorreo


    if (!validarContrasena()) {
        NombreErrores += "<li>Escribe una contraseña válida.</li>";
        alertErrorLogin.style.display = "block";
    } else {
        contraseña.style.border = "solid thin green";
    }//if validarCorreo

    NombreErrores += "</ul>";
    alertErrorTextoLogin.insertAdjacentHTML("beforeend", NombreErrores);
    idTimeout = setTimeout(function () {
        alertErrorLogin.style.display = "none";
    }, 10000);

    if (validarNombre() == true && validarCorreo() == true && validarNumero() == true && validarContrasena() == true) {
        let usuario = {
            nombre: IdNombre.value,
            domicilio: "desconocido",
            correo: correo.value,
            contrasena: contraseña.value,
            telefono: campNumber.value
          };
          
          async function obtenerDatos() {
            try {
              const response = await fetch(URL_MAIN, { method: 'get' });
              const json = await response.json();
          
              console.log(json);
              console.log(json.length);
          
              Array.from(json).forEach((item) => {
                arrayValidarRegistro.push(item);
              });
          
              return arrayValidarRegistro;
          
            } catch (err) {
              console.log(err);
            }
          }
          
          obtenerDatos().then((arrayValidarRegistro) => {
            console.log(arrayValidarRegistro);
          
            if (validarUsuarioRegistrado(arrayValidarRegistro, usuario)) {
              fetch(URL_MAIN, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario)
              }).then(response => response.json()).then(usuario => {
                console.log('Success:', usuario);
              }).catch((error) => {
                console.error('Error:', error);
              });
          
              alertExito.style.display = "block";
              IdNombre.value = "";
              correo.value = "";
              campNumber.value = "";
              contraseña.value = "";
              ConfiContraseña.value = "";
              correoLogin.focus();
              idTimeout = setTimeout(function () {
                alertExito.style.display = "none";
              }, 10000);
              arrayValidarRegistro = [];
            } else {
              NombreErrores = "<li>Este correo ya está registrado.</li>";
              alertErrorLogin.style.display = "block";
              alertErrorTextoLogin.insertAdjacentHTML("beforeend", NombreErrores);
              correo.style.border = "solid thin red";
              arrayValidarRegistro = [];
            }
          });
       
    }//mandar datos de registro
});
function validarNombre() {
    nombreValido = true;
    if (/^[a-zA-Z ]+$/.test(IdNombre.value) == false) {
        IdNombre.style.border = "solid thin red";
        nombreValido = false;
    } else {
        IdNombre.style.border = "solid thin green";
        return true;
    }
}
function validarCorreo() {
    correoValido = true;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(correo.value) == false) {
        correo.style.border = "solid thin red";
        correoValido = false;
    } else {
        correo.style.border = "solid thin green";
        return true;
    }
}
function validarNumero() {
    if (/^(?!.*(.)\1{4})\d{10}$/.test(campNumber.value) == false) {
        campNumber.style.border = "solid thin red";
    } else {
        campNumber.style.border = "solid thin green";
        return true;
    }// if else
}// validarNumero
function validarContrasena() {
    if (/^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[a-z]).{8,}$/.test(contraseña.value) == false) {
        contraseña.style.border = "solid thin red";
        ConfiContraseña.style.border = "solid thin red";
    } else {
        contraseña.style.border = "solid thin green";
        if ((contraseña.value !== ConfiContraseña.value)) {
            ConfiContraseña.style.border = "solid thin red";
        } else {
            ConfiContraseña.style.border = "solid thin green";
            return true;//Se cambia posición del return para que no regrese tru hasta que ConfiContraseña este correcta
        }
    }//if else
}//validarContrasena

function validarUsuarioRegistrado(arrayValidarRegistro, usuario) {
    for (let i = 0; i < arrayValidarRegistro.length; i++) {
        if (arrayValidarRegistro[i].correo === usuario.correo) {
            return false;
         }
    }
    return true;
}

function validarCorreoLogin() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(correoLogin.value) == false) {
        correoLogin.style.border = "solid thin red";
    } else {
        correoLogin.style.border = "solid thin green";
        return true;
    }
}
function validarContrasenaLogin() {
    if (/^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[a-z]).{8,}$/.test(contraseñaLogin.value) == false) {
        contraseñaLogin.style.border = "solid thin red";
    } else {
        contraseñaLogin.style.border = "solid thin green";
        return true;
    }//if else
}



// function validarUsuarioLogin(correo, contra) {
//     let arrayUsuarios = [];
//     fetch(URL_MAIN, { method: 'get' }).then(function(response) { response.json().then(function (json) {
//            console.log(json);
//            console.log(json.length);
//            arrayUsuarios = json;
//            for (let i = 0; i < arrayUsuarios.length; i++) {
//             console.log(arrayUsuarios[i]);
//             if ((arrayUsuarios[i].correo === (correo)) && (arrayUsuarios[i].contrasena === contra)) {
//                 return true;
//             }
//         }
//         });//then
//     }).catch(function(err) {
//        console.log(err);
//     });   
// }
botonIngresar.addEventListener("click", function (event) {
    event.preventDefault();
    errorLoginTexto.innerHTML = "";
    errorLogin.style.display = "none";
    let mensajeError = "Los siguientes campos deben ser llenados correctamente:<ul>";
    clearTimeout(idTimeout);
  
    validarUsuarioLogin(correoLogin.value, contraseñaLogin.value)
      .then((resultado) => {
        if (resultado) {
          console.log("INICIO DE SESION EXITOSO");
          window.location.replace("./loading.html");
        } else {
          mensajeError += "<li>Correo y/o contraseña incorrectos.</li>";
          errorLogin.style.display = "block";
          console.log("correo ya registrado");
  
          correoLogin.style.border = "solid thin red";
          contraseñaLogin.style.border = "solid thin red";
  
          mensajeError += "</ul>";
          errorLoginTexto.insertAdjacentHTML("beforeend", mensajeError);
        }
      }).catch((error) => {
        console.log(error);
        // Manejar el error aquí
      });
  
  });
  async function validarUsuarioLogin(correo, contra) {
    try {
      const response = await fetch(URL_MAIN, { method: 'get' });
      const json = await response.json();
     
      console.log(json);
      console.log(json.length);
  
      for (let i = 0; i < json.length; i++) {
        console.log(json[i]);
        if (json[i].correo === correo && json[i].contrasena === contra) {
          const idUsuario = json[i].id;
          localStorage.setItem("idUsuario", idUsuario);
          return true;
        }
      }
      return false;
  
    } catch (err) {
      console.log(err);
      return false;
    }
} 
  
function obtenerUsuario(correo) {
    if (localStorage.getItem("arrayUsuarios") != null) {
      arrayUsuarios = JSON.parse(localStorage.getItem("arrayUsuarios"));
      for (let i = 0; i < arrayUsuarios.length; i++) {
        if (arrayUsuarios[i].correo === correo) {
          return arrayUsuarios[i];
        }
      }
    }
    return null;
  }//obtener usuario especifico con el correo

function mensajeInicio(nombreUsuario){
    const mensaje = `¡Bienvenido, ${nombreUsuario}!`;
    return mensaje;
}//aquí se pone el mensaje mas el nombre del usuario



/* login().then(data => obtenerDatos(data.accessToken))
.then(data => validarUsuarioLogin(correo, contra,)) */