import api from './api';

class App {
    constructor() {
        this.repositories = [];

        this.formEl = document.getElementById('repo-form');
        this.inputEl = document.querySelector('input[name=repository');
        this.listEl = document.getElementById('repo-list');

        this.registerHandlers();
    }

    registerHandlers() {
        this.formEl.onsubmit = event => this.addRepository(event);
    }

    setLoading(loading = true) {
        if (loading === true) {
            let loadingEl = document.createElement('span');
            loadingEl.appendChild(document.createTextNode('Carregando...'));
            loadingEl.setAttribute('id', 'loading');

            this.formEl.appendChild(loadingEl);
        } else {
            document.getElementById('loading').remove();
        }
    }

    async addRepository(event) {
        try {
            this.setLoading();
            
            event.preventDefault(); // Irá impedir o funcionamento padrão do formulário

            const repoInput = this.inputEl.value;
            
            if (repoInput.length === 0)
                return;

            const response = await api.get(`pokemon/${repoInput}`);
            const { id, name, species: { url }, sprites: { front_default } } = response.data;
            console.log(response.data);

            const especie = await api.get(url);
            let flavor_text = '';
            especie.data.flavor_text_entries.forEach(data => {
                if (flavor_text.length === 0 && data.language.name == 'en') {
                    flavor_text = data.flavor_text;
                    return;
                }
            });
            this.repositories.push({
                name: id + ' - ' + name,
                flavor_text,
                front_default,
                html_url: 'https://pokeapi.co/',
            });

            this.inputEl.value = '';
            this.render();
        } catch (err) {
            alert('Pokemon does not exist');
        } finally {
            this.setLoading(false);
        }
    }

    render() {
        this.listEl.innerHTML = '';

        this.repositories.forEach(repo => {
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.front_default);

            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.name));

            let descriptionEl = document.createElement('p');
            descriptionEl.appendChild(document.createTextNode(repo.flavor_text));

            let linkEl = document.createElement('a');
            linkEl.setAttribute('target', '_blank');
            linkEl.setAttribute('href', repo.html_url);
            linkEl.appendChild(document.createTextNode('Acessar'));

            let listItemEl = document.createElement('li');
            listItemEl.appendChild(imgEl);
            listItemEl.appendChild(titleEl);
            listItemEl.appendChild(descriptionEl);
            listItemEl.appendChild(linkEl);

            this.listEl.appendChild(listItemEl);
        });
    }
}

new App();