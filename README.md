Misión M2 · Async Odyssey — Web Development I.

## Cómo probarlo
Abre index.html en el navegador. Inmeadiatamente, tendrás todas las runas a tu disposición con sus nombres y significados. Si quieres buscar
una runa en concreto o un significado en concreto, puedes hacer uso del buscador, que al darle al enter te enseñará las runas que coinciden.

## Uso de IA
Usé Gemini como pareja de programación: para explicar todo lo que tenía que ver con asincronía, generar las primeras iteraciones del html y CSS
y ayudar con la estructura de varias funciones de javascript. También, como ayuda general para corregir errores.

Ejemplo de prompt real: "podrías hacerme un comienzo de página web que tenga unas tarjetas que enseñen las runas de la mitología nordica y una 
explicación o algún dato. tengo ya los datos, quiero un comienzo de como seria el html/css".
Ejemplo de prompt real: "cómo ejecuto cosas de un script en otro?"".

Hice a mano: la organización de los archivos, y separar las funciones en las formas que más me convenían, a parte de escribir el código que no
le especifiqué a la ia, porque tampoco le di todos los datos, y principalmente en las consultas de js le pedía cosas o hacía preguntas concretas
en vez de pedirle que me hiciese funciones o archivos enteros, porque yo quería entender lo que hacía.

## Autopsia
Al principio, para la cache Gemini me recomendó guardar dos objetos por set de datos: uno con los propios datos y uno con el timestamp de cuando lo guardamos, para así poder calcular cuánto tiempo había pasado y renovar la cache de vez en cuando. Pero no me convenció el tener que guardar dos objetos relacionados sin aparente relación a primera vista, así que al principio la cache no tenía un time to leave. Después al indagar más, junto con la IA concluimos que la mejor forma de hacerlo era hacer el stringify de un objeto que tuviese dos atributos: data, que guarda los datos, y timestamp, que guarda cuándo se añadió a la caché. Esta forma es mucho más limpia que la que teníamos originalmente, además de más legible, y también mucho mejor que no limpiar la cache nunca.

Otra decisión que tomamos fue que los mensajes de cargando, error y de que no se encontraron runas de acuerdo con la busqueda estuvieran en el mismo contenedor que donde estarían las tarjetas. De esta forma nos aseguramos de que estén visibles para el usuario. Además, todas tienen el mismo formato, lo que simplifica el css y la complejidad del código de la ui en general.
