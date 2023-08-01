/**
 * Función que se ejecuta cuando el contenido del DOM ha sido completamente cargado.
 * Aquí se agregan los eventos a los elementos del DOM y se define la lógica para buscar y mostrar datos de Pokémon.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Obtener referencias a los elementos del DOM que se utilizarán
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const resultContainer = document.getElementById('resultContainer');
  
    /**
     * Evento click en el botón de búsqueda.
     * Se realiza la búsqueda del Pokémon con el término ingresado en el campo de texto.
     */
    searchButton.addEventListener('click', async () => {
      const searchTerm = searchInput.value.trim();
      if (!searchTerm) {
        // Si el término de búsqueda está vacío, no se realiza la búsqueda.
        return;
      }
  
      try {
        // Obtener los datos del Pokémon utilizando la función getPokemonData
        const pokemonData = await getPokemonData(searchTerm);
        // Mostrar los datos del Pokémon utilizando la función displayPokemonData
        displayPokemonData(pokemonData);
      } catch (error) {
        // En caso de error, mostrar un mensaje de error en el contenedor de resultados.
        console.error('Error fetching Pokémon data:', error);
        resultContainer.innerHTML = 'Error al obtener los datos del Pokémon. Intente nuevamente.';
      }
    });
  
    /**
     * Función para obtener los datos de un Pokémon desde la API de pokeapi.co.
     * @param {string} searchTerm - El término de búsqueda que puede ser el nombre o número del Pokémon.
     * @returns {Promise<object>} - Una promesa que resuelve con los datos del Pokémon encontrado.
     * @throws {Error} - Si no se pudo obtener la información del Pokémon.
     */
    const getPokemonData = async (searchTerm) => {
      // Realizar una solicitud a la API utilizando fetch y el término de búsqueda proporcionado.
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
      if (!response.ok) {
        // Si la respuesta no es exitosa (por ejemplo, 404 Not Found), lanzar un error.
        throw new Error('No se pudo obtener la información del Pokémon.');
      }
      // Devolver los datos del Pokémon como un objeto JSON.
      return response.json();
    };
  
    /**
     * Función para mostrar los datos de un Pokémon en el contenedor de resultados del DOM.
     * @param {object} pokemonData - Los datos del Pokémon obtenidos de la API.
     */
    const displayPokemonData = (pokemonData) => {
      // Crear el contenido HTML para mostrar los datos del Pokémon.
      resultContainer.innerHTML = `
        <h2>${pokemonData.name}</h2>
        <p>Número: ${pokemonData.id}</p>
        <p>Tipo: ${pokemonData.types.map(type => type.type.name).join(', ')}</p>
        <p>Peso: ${pokemonData.weight} kg</p>
        <p>Altura: ${pokemonData.height} dm</p>
        <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}" />
      `;
    };
  });