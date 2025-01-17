let personagens = document.getElementById("personagens");
let episodios = document.getElementById("episodios");
let contagempersonagem = 1;
let limitepersonagem = 5;
let contagemepisodio = 1;
let limiteepisodio = 5;
let btPersonagem, btEpisodio;
let TotalDePersonagens, TotalDeEpisodios;

function criabt(container, functions, contagem, limite, total, tipo) {
    let bt = document.getElementById(`bt-carregar-${tipo.toLowerCase()}`);
    if (!bt && contagem <= total) {
        bt = document.createElement('button');
        bt.innerText = `Carregar mais ${tipo}`;
        bt.id = `bt-carregar-${tipo.toLowerCase()}`;
        container.appendChild(bt);

        bt.addEventListener('click', () => {
            if (tipo === "Personagens") {
                limitepersonagem += 10;
            } else if (tipo === "Episódios") {
                limiteepisodio += 5;
            }
            bt.remove();
            functions();
        });
    }
}

async function caregarpersonagens() {
    try {
        let request = await fetch('https://rickandmortyapi.com/api/character');
        let response = await request.json();
        TotalDePersonagens = response.info.count;

        while (contagempersonagem <= limitepersonagem && contagempersonagem <= TotalDePersonagens) {
            let requestPersonagem = await fetch(`https://rickandmortyapi.com/api/character/${contagempersonagem}`);
            let responsePersonagem = await requestPersonagem.json();
            let div = document.createElement('div');
            div.innerHTML = `
                <img src="${responsePersonagem.image}" alt="${responsePersonagem.name}">
                <p><strong>Nome:</strong> ${responsePersonagem.name}</p>
                <p><strong>Status:</strong> ${responsePersonagem.status}</p>
                <p><strong>Espécie:</strong> ${responsePersonagem.species}</p>
                <p><strong>Gênero:</strong> ${responsePersonagem.gender}</p>
            `;
            personagens.appendChild(div);
            contagempersonagem++;
        }

        criabt(personagens, caregarpersonagens, contagempersonagem, limitepersonagem, TotalDePersonagens, "Personagens");
    } catch (error) {
        console.error("Erro ao carregar personagens:", error);
    }
}

async function caregarepisodios() {
    try {
        let requestEp = await fetch('https://rickandmortyapi.com/api/episode');
        let responseEp = await requestEp.json();
        TotalDeEpisodios = responseEp.info.count;

        while (contagemepisodio <= limiteepisodio && contagemepisodio <= TotalDeEpisodios) {
            let requestEpisodio = await fetch(`https://rickandmortyapi.com/api/episode/${contagemepisodio}`);
            let responseEpisodio = await requestEpisodio.json();
            let div = document.createElement('div');
            div.innerHTML = `
                <h3>Episode ${responseEpisodio.id}: ${responseEpisodio.name}</h3>
                <p><strong>Data de Lançamento:</strong> ${responseEpisodio.air_date}</p>
                <p><strong>Código do Episódio:</strong> ${responseEpisodio.episode}</p>
            `;
            episodios.appendChild(div);
            contagemepisodio++;
        }

        criabt(episodios, caregarepisodios, contagemepisodio, limiteepisodio, TotalDeEpisodios, "Episódios");
    } catch (error) {
        console.error("Erro ao carregar episódios:", error);
    }
}

caregarpersonagens();
caregarepisodios();
