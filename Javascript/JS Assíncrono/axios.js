axios.get('https://pokeapi.co/api/v2/pokemon/mewtwo')
    .then(function(response) {
        console.log(response)
    })
    .catch(function(error) {
        console.warn(error);
    });