var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/caterpie');
xhr.send(null);


xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
        console.log(JSON.parse(xhr.responseText));
    }
}