# memorion

##SESION 1

**Resumen**
Se ha creado el formulario y la vista del tablero junto con sus correspondientes archivos CSS. Sin funcionalidades.

**Dificultades encontradas**
- dificultad para encontrar la manera correcta de crear el tablero.
- darse cuenta se puede realizar todo en un solo documento HTML modificando los divs.

**Soluciones aplicadas**
- buscar información acerca de ello.
- prestar atención al ejemplo de clase de las tarjetas y ver que se podia modificar objetos vacios. Buscar información para saber vaciar los divs desde el archivo JS.

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
- dificultad para conseguir encajar las opciones personalizadas.

**Soluciones aplicadas**
- reorganización de los tableros.

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
- revisión de código y manuales

**Fuentes consultadas**
- https://www.w3schools.com/js/js_htmldom_nodes.asp

**Decisiones técnicas**
- Se decide cambiar la implementación de la inclusión del contenido de los diferentes divs para utilizar nodos en vez de innerHTML por una cuestión de organización del código y limpieza aparte de para evitar errores.

**Ideas de mejora futura**
- Buscar la mejor manera de hacer las cosas a la primera para no tener que volver a trabajar sobre lo mismo.