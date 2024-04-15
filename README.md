# Frogmi Challenge

Este proyecto es una aplicación que proporciona información sísmica reciente de todo el mundo. Consiste en un backend desarrollado en Ruby on Rails que obtiene datos sísmicos de un feed proporcionado por USGS (United States Geological Survey) y los almacena en una base de datos PostgreSQL. Además, se expone una API REST que permite consultar los datos de eventos sísmicos y agregar comentarios a cada evento. El frontend está construido en React y permite a los usuarios visualizar los eventos sísmicos y agregar comentarios a través de una interfaz web simple y amigable.

## Instalación

### Requisitos Previos

- Ruby [3.2.3]
- Rails [7.1.3.2]
- Node.js [20.12.1]
- npm [1.5.0]
- PostgreSQL [16.2]

### Pasos de Instalación

1. Clona este repositorio:

```bash
git clone https://github.com/tu_usuario/tu_proyecto.git
```

2. Configuración del Backend (Ruby on Rails)

   a. Navega al directorio del backend:

   ```bash
   cd tu_proyecto/backend
   ```

   b. Instala las dependencias:

   ```bash
   bundle install
   ```

   c. Configura la base de datos en `config/database.yml`.

   ```bash
   username: 'your_postgres_username'
   password: 'your_potsgres_password'
   ```
   d. Crea la base de datos y ejecuta las migraciones:

   ```bash
   rails db:create
   rails db:migrate
   ```

   e. Inicia el servidor:

   ```bash
   rails server
   ```

3. Configuración del Frontend (React)

   a. Navega al directorio del frontend:

   ```bash
   cd tu_proyecto/frontend
   ```

   b. Instala las dependencias:

   ```bash
   npm install
   ```

   c. Inicia la aplicación:

   ```bash
   npm start
   ```

## Uso

Una vez que la aplicación esté instalada y funcionando, puedes acceder a ella desde tu navegador. Aquí hay algunas acciones que puedes realizar:

1. **Explorar Eventos Sísmicos:**
   - Al acceder a la aplicación, verás una lista de eventos sísmicos ocurridos en los últimos 30 días.
   - Puedes personalizar la cantidad de eventos mostrados por página seleccionando el número deseado en el menú desplegable "Features por página".
   - Utiliza el menú desplegable "Filtrar por mag_type" para filtrar los eventos por su tipo de magnitud.

2. **Agregar Comentarios:**
   - Cada evento sísmico tiene la opción de incluir comentarios.
   - Ingresa tu comentario en el campo de texto debajo de cada evento y presiona "Enter" para agregarlo.
   - Una vez agregado, el comentario se mostrará debajo del evento correspondiente.
   - Los comentarios son visibles para todos los usuarios que accedan a la aplicación.

## Contribuir

Si quieres contribuir a este proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama nueva (`git checkout -b feature/nueva-funcionalidad`).
3. Haz tus cambios y commitea (`git commit -am 'Añade nueva funcionalidad'`).
4. Haz un push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un pull request.

