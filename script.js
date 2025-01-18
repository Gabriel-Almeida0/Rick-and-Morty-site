let personagens = document.getElementById("personagens");
let episodios = document.getElementById("episodios");
let contagempersonagem = 1;
let limitepersonagem = 5;
let contagemepisodio = 1;
let limiteepisodio = 5;
let btPersonagem, btEpisodio;
let TotalDePersonagens, TotalDeEpisodios;
let Status
let Species
let Gender

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
            Status = null
            let requestPersonagem = await fetch(`https://rickandmortyapi.com/api/character/${contagempersonagem}`);
            let responsePersonagem = await requestPersonagem.json();
            let div = document.createElement('div');
            if(responsePersonagem.status === 'Alive' && responsePersonagem.gender === 'Male'){
                Status = "Vivo"
            }else if(responsePersonagem.status === 'Alive' && responsePersonagem.gender === 'Female'){
                Status = "Viva"
            }else if(responsePersonagem.status === 'Alive' && responsePersonagem.gender === 'unknown'){
                Status = "Vivo"
            }else if(responsePersonagem.status === 'unknown' && responsePersonagem.gender === 'Male'){
                Status = "Desconhecido"
            }else if(responsePersonagem.status === 'unknown' && responsePersonagem.gender === 'Female'){
                Status = "Desconhecido"
            }else if(responsePersonagem.status === 'Dead' && responsePersonagem.gender === 'Male'){
                Status = "Morto"
            }else if(responsePersonagem.status === 'Dead' && responsePersonagem.gender === 'Female'){
                Status = "Morta"
            }else if(responsePersonagem.status === 'Dead' && responsePersonagem.gender === 'unknown'){
                Status = "Morto"
            }

            if(responsePersonagem.species === 'Human'){
                Species = "Humana";
            }else if(responsePersonagem.species === 'Alien'){
                Species = "Alienigena"
            }else if(responsePersonagem.species === 'unknown'){
                Species = "Desconhecido"
            }

            if(responsePersonagem.gender === 'Female'){
                Gender = "Feminino"
            }else if(responsePersonagem.gender === 'Male'){
                Gender = "Masculino"
            }else if(responsePersonagem.gender === 'unknown'){
                Gender = "Desconhecido"
            }
            div.innerHTML = `
                <img src="${responsePersonagem.image}" alt="${responsePersonagem.name}">
                <p><strong>Nome:</strong> ${responsePersonagem.name}</p>
                <p><strong>Status:</strong> ${Status}</p>
                <p><strong>Espécie:</strong> ${Species}</p>
                <p><strong>Gênero:</strong> ${Gender}</p>
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
