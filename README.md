# memorion

##SESION 1

**Resumen**
Se ha creado el formulario y la vista del tablero junto con sus correspondientes archivos CSS. Sin funcionalidades.

**Dificultades encontradas**
- Dificultad para encontrar la manera correcta de crear el tablero.
- Darse cuenta se puede realizar todo en un solo documento HTML modificando los divs.

**Soluciones aplicadas**
- Buscar información acerca de ello.
- Prestar atención al ejemplo de clase de las tarjetas y ver que se podia modificar objetos vacios. Buscar información para saber vaciar los divs desde el archivo JS.

**Fuentes Consultadas**
- https://support.microsoft.com/es-es/topic/onclick-propiedad-9fc822dd-a32c-404e-aa1f-9b83b098948f
- https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting

**Decisiones Técnicas**
- Se escoge el estilo de la página de esta manera porque se cree que es limpio y vistoso.
- Se escoge la estructura en tabla para la configuracion puesto que se cree que es la manera más sencilla de completarlo.
- Se escoge la estructura en divs para la realización de las diferentes vistas de juego porque se cree que es la mejor manera para ello.

**Ideas de mejora futura**
- Revisar la funcionalidad y diseño del contador y del cronometro y que este último no aparezca cuando no se ha seleccionado la opción.
- Revisar los tamaños de las diferentes cartas.



##SESION 2

**Resumen**
Se ha añadido la opción de crear tableros personalizados controlando todas las opciones de error posibles y teniendo en cuenta las imágenes que tenemos.

**Dificultades encontradas**
- Dificultad para conseguir encajar las opciones personalizadas.

**Soluciones aplicadas**
- Reorganización de los tableros.

**Fuentes consultadas**
-https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event

**Decisiones técnicas**
- Decidimos finalmente crear las diferentes filas para cada opción de tablero utilizando los display que ya utilizabamos para los divs de las pantallas y asi poder manejar de manera correcta las opciones de los tableros.

**Ideas de mejora futura**
- Posible uso de transicciones entre pantallas.
- Mejorar el aleatorio y que sea aleatorio sin mostrar que tema es.



##SESIÓN 3

**Resumen**
Se programa el volteo de cartas correctamente y la comparación de parejas, comprobando que durante la comprobación de cartas quede el tablero bloqueado. Gestión de cartas acertadas o falladas y contador. Se han cambiado los contenidos de los divs y se han implementado nodos. Se añaden transicciones a los botones.

**Dificultades encontradas**
- Dificultad para ver y entender los nodos de primeras.
- Hacer funcionar de manera correcta el aleatorio

**Soluciones aplicadas**
- Revisión de código y manuales

**Fuentes consultadas**
- https://www.w3schools.com/js/js_htmldom_nodes.asp

**Decisiones técnicas**
- Se decide cambiar la implementación de la inclusión del contenido de los diferentes divs para utilizar nodos en vez de innerHTML por una cuestión de organización del código y limpieza aparte de para evitar errores.

**Ideas de mejora futura**
- Buscar la mejor manera de hacer las cosas a la primera para no tener que volver a trabajar sobre lo mismo.
- Mejorar el color verde



##SESION 4

**Resumen**
Se ha programado el reloj para que funcione al realizar el primer click y solo si se selecciona la opción del temporizador. Se han cambiado los fondos, el css general (letras,botones,colores...). 

**Dificultades encontradas**
- Poner el temporizador solo cuando se activa la opción
- Que el contador se actualice en la pantalla

**Soluciones aplicadas**
- Ir actualizando el div para que aparezca

**Fuentes consultadas**
- https://developer.mozilla.org/es/docs/Web/JavaScript

**Decisiones tecnicas**
- Cambio de aspecto de la página buscando uno más desarrollado.

**Ideas de mejora futura**
- Revisar el diseño




##SESION 5

**Resumen**
Se ha programado el ranking para que aparezca en la pantalla del resumen final con todas las partidas jugadas y poder ordenarlas segun diferentes criterios. Se ha añadido un tema nuevo.

**Dificultades encontradas**
-Uso del localStorage

**Soluciones aplicadas**
- Buscar información

**Fuentes consultadas**
- https://developer.mozilla.org/es/docs/Web/API/Window/localStorage
- https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map
- https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/join

**Decisiones tecnicas**
- Se ha añadido un tema nuevo más acorde a la estética adquirida.
- Se decide crear los rakings de esta manera porque se cree que es en la que mejor queda.

**Ideas de mejora futura**
- Posible cambio de temas acordes a la estetica adquirida.



##SESION 6

**Resumen**
Se han añadido efectos de sonido y nuevos efectos en las cartas. Organizado el código. Se ha terminado de cambiar los temas. Se ha añadido la opción de publicar el resultado de la partida en Facebook. Se ha mejorado la implementación del ranking, pudiendo vaciarlo. Se ha insertado el **huevo de pascua**. Al pulsar en el titulo girará y mostrara un chiste sobre cartas y parejas.

**Dificultades encontradas**
- Localizar de manera correcta los lugares donde añadir los efectos a las cartas para que ocurran en los momentos adecuados.
- Implementar la opción de compartir en Facebook.

**Soluciones aplicadas**
- Busqueda de información

**Fuentes consultadas**
- https://www.lostiemposcambian.com/blog/facebook/compartir-urls-en-facebook/comment-page-3/
- https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText

**Decisiones tecnicas**
- Se acaban de modificar los temas para que lleven una estetica similar a la del juego.
- Se decide poner este huevo de pascua por darle un punto más cómico al juego.
- Se decide poner el botón de vaciar el ranking porque cuando llevas varias partidas jugadas es dificil aclararse, asi se le da la oportunidad al usuario de mantener todos los registros o poder ir borrando si no quiere guardarlos todos.
