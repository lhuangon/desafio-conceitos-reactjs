import React, {useState, useEffect} from "react";
import Header from "./components/Header";
import api from "./services/api";

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]); //UseState retorna um array com duas posições.

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, []); //recebe dois parâmetro, o 1º é uma função que queremos disparar e a outra e quando queremos dispara 

  async function handleAddRepository() {

    const response = await api.post('repositories', { //Usamos API para enviar informações do back-end para o front
      title: `Novo item do repositório ${Date.now()}`, // colocamos os dados em uma variavel 
    });

    const repository = response.data;

    setRepositories([...repositories, repository]); //usando o conceito de estado e imutabilidade 
  }

  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id !== id));

  }

  return (
    <>
    <Header title = "Repositories"/>
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repository => <li key={repository.id}>{repository.title}
    
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
    </>
  );
}

export default App;
