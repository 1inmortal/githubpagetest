// public/js/app.js

document.addEventListener('DOMContentLoaded', () => {
    const registroForm = document.getElementById('registro-form');
    const loginForm = document.getElementById('login-form');
    const categoriasDiv = document.getElementById('categorias');
    const listaCategorias = document.getElementById('lista-categorias');
    const agregarCategoriaForm = document.getElementById('agregar-categoria-form');
    const cerrarSesionBtn = document.getElementById('cerrar-sesion');
  
    // Registrar Usuario
    registroForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nombre = document.getElementById('nombre').value;
      const email = document.getElementById('email').value;
      const contraseña = document.getElementById('contraseña').value;
      const rol = document.getElementById('rol').value;
  
      try {
        const res = await fetch('http://localhost:3000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre, email, contraseña, rol })
        });
        const data = await res.json();
        alert(data.mensaje);
        if (res.status === 201) {
          registroForm.reset();
        }
      } catch (error) {
        console.error(error);
      }
    });
  
    // Iniciar Sesión
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const contraseña = document.getElementById('login-contraseña').value;
  
      try {
        const res = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, contraseña })
        });
        const data = await res.json();
        if (res.ok) {
          localStorage.setItem('token', data.token);
          loginForm.reset();
          mostrarCategorias();
        } else {
          alert(data.mensaje);
        }
      } catch (error) {
        console.error(error);
      }
    });
  
    // Mostrar Categorías
    const mostrarCategorias = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
  
      categoriasDiv.style.display = 'block';
      document.getElementById('registro').style.display = 'none';
      document.getElementById('login').style.display = 'none';
  
      try {
        const res = await fetch('http://localhost:3000/api/categorias', {
          headers: { 'auth-token': token }
        });
        const categorias = await res.json();
        listaCategorias.innerHTML = '';
        categorias.forEach(categoria => {
          const div = document.createElement('div');
          div.innerHTML = `<strong>${categoria.nombre}</strong>: ${categoria.descripcion}`;
          listaCategorias.appendChild(div);
        });
      } catch (error) {
        console.error(error);
      }
    };
  
    // Agregar Categoría
    agregarCategoriaForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nombre = document.getElementById('categoria-nombre').value;
      const descripcion = document.getElementById('categoria-descripcion').value;
      const token = localStorage.getItem('token');
  
      try {
        const res = await fetch('http://localhost:3000/api/categorias', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'auth-token': token 
          },
          body: JSON.stringify({ nombre, descripcion })
        });
        const data = await res.json();
        alert(data.mensaje);
        if (res.status === 201) {
          agregarCategoriaForm.reset();
          mostrarCategorias();
        }
      } catch (error) {
        console.error(error);
      }
    });
  
    // Cerrar Sesión
    cerrarSesionBtn.addEventListener('click', () => {
      localStorage.removeItem('token');
      categoriasDiv.style.display = 'none';
      document.getElementById('registro').style.display = 'block';
      document.getElementById('login').style.display = 'block';
    });
  
    // Verificar si hay un token almacenado al cargar la página
    if (localStorage.getItem('token')) {
      mostrarCategorias();
    }
  });
  