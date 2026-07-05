# Tripleten web_project_around_es

# Around The U.S.

Una aplicación web interactiva que permite a los usuarios compartir y explorar fotografías de lugares emblemáticos de Estados Unidos.

## 📖 Descripción

Around The U.S. es una plataforma social donde los usuarios pueden:

- Ver una galería de tarjetas con imágenes de lugares icónicos
- Editar su información de perfil
- Agregar nuevas tarjetas con sus propias imágenes
- Dar "me gusta" a las tarjetas que les gusten
- Ver imágenes en tamaño completo
- Eliminar tarjetas de la galería

## ✨ Funcionalidades

### 🖼️ Galería de Imágenes

- **Visualización de tarjetas**: Muestra una colección de imágenes con títulos descriptivos
- **Vista ampliada**: Haz clic en cualquier imagen para verla en tamaño completo
- **Interacción social**: Sistema de "me gusta" para cada tarjeta

### 👤 Gestión de Perfil

- **Edición de perfil**: Modifica tu nombre y descripción personal
- **Interfaz intuitiva**: Modal emergente para editar información

### ➕ Creación de Contenido

- **Agregar tarjetas**: Sube nuevas imágenes con título y URL
- **Validación de formularios**: Campos requeridos para garantizar calidad del contenido
- **Eliminación de tarjetas**: Remueve tarjetas que ya no desees

### 🎨 Experiencia de Usuario

- **Modales interactivos**: Ventanas emergentes elegantes para todas las acciones
- **Diseño responsivo**: Funciona perfectamente en dispositivos móviles y desktop
- **Interfaz intuitiva**: Navegación clara y accesible

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos modernos con metodología BEM
- **JavaScript ES6+**: Funcionalidad interactiva y manipulación del DOM
- **TypeScript** Para agregar tipado estático y mejorar la mantenibilidad del código.
- **Programación Orientada a Objetos (POO)** mediante clases, encapsulamiento, herencia y composición.
- **Template HTML**: Para la generación dinámica de tarjetas.
- **Git y GitHub**: Para el control de versiones y publicación del proyecto.

## 🚀 Conceptos aplicados

Durante el desarrollo de este proyecto se utilizaron los siguientes conceptos:

Encapsulamiento.
Herencia.
Composición de objetos.
Interfaces en TypeScript.
Tipado estático.
Genéricos (Section<T>).
Manipulación del DOM con TypeScript.
Separación de responsabilidades (SRP).
Organización modular del código.

🌐 Demo

https://jeunb.github.io/web_project_around_es/

## 📁 Estructura del Proyecto

```
web_project_around_es/
│
├── README.md
├── tsconfig.json
├── .prettierignore
│
├── src/                          # Código fuente en TypeScript
│   │
│   ├── index.ts                  # Punto de entrada de la aplicación
│   │
│   ├── components/               # Componentes basados en POO
│   │   ├── Card.ts
│   │   ├── FormValidator.ts
│   │   ├── Popup.ts
│   │   ├── PopupWithForm.ts
│   │   ├── PopupWithImage.ts
│   │   ├── Section.ts
│   │   └── UserInfo.ts
│   │
│   └── utils/
│       └── constants.ts          # Configuración y datos iniciales
│
└── public/                       # Archivos compilados y recursos estáticos
    │
    ├── index.html
    ├── index.js                  # JavaScript generado por TypeScript
    │
    ├── components/               # Clases compiladas (.js)
    ├── utils/                    # Utilidades compiladas (.js)
    │
    ├── blocks/                   # Estilos CSS (metodología BEM)
    ├── pages/                    # Hoja de estilos principal
    ├── images/                   # Recursos gráficos
    └── vendor/                   # Normalización y tipografías
```

Esta estructura deja claro que:

- **`src/`** contiene el código fuente escrito en **TypeScript**.
- **`public/`** contiene los archivos **JavaScript compilados**, además del HTML, CSS, imágenes y demás recursos estáticos utilizados por la aplicación.
- La lógica de la aplicación está organizada en componentes reutilizables siguiendo los principios de **Programación Orientada a Objetos (POO)** y una arquitectura modular.

```

## 🌐 Demo en Vivo

https://jeunb.github.io/web_project_around_es/
```
