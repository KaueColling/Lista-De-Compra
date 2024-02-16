import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [count, setCount] = useState(0)

  const [itens, setItens] = useState([]);

  const [textoDeEntrada, setTextoDeEntrada] = useState('');

  const salvarDetalhesNoLocalStorage = (itensAtualizados) => {
    localStorage.setItem('itens', JSON.stringify(itensAtualizados));
  };

  useEffect(() => {
    const savedItens = JSON.parse(localStorage.getItem('itens'));
    if (savedItens) {
      setItens(savedItens);
    }
  }, []);

  const adicionarItem = () => {
    if (textoDeEntrada.trim() !== '') {
      const novoItem = {
        titulo: textoDeEntrada,
      };
      setItens([...itens, novoItem]);
      setTextoDeEntrada('');
      setCount('');
      salvarDetalhesNoLocalStorage([...itens, novoItem]);
    }
  };

  const excluirItem = (indice) => {
    const itensAtualizados = [...itens];
    itensAtualizados.splice(indice, 1);
    setItens(itensAtualizados);
    salvarDetalhesNoLocalStorage(itensAtualizados);
  };

  return (
    <>
      <div>
        <h1> Lista de Compras </h1>
        <h2> Adicionar Items </h2>

        <div className='ParteDaLista'>
          <div className="forma">
            <input
              className="inputNomeItem"
              type="text"
              placeholder="Nome do Item"
              value={textoDeEntrada}
              onChange={(e) => setTextoDeEntrada(e.target.value)}
            />
          </div>
          <button className='btAdicionarLivro' onClick={adicionarItem}>Adicionar Item</button>
        </div>

        <div className='items'>
          <ol className='UL'>
            {itens.map((item, indice) => (
              <li className='item' key={indice}>
                <hr></hr>
                <div className='divNomeLivro'>
                  {item.titulo} - {item.status}

                  <button className='buttonExcluir' onClick={() => adicionarMaisItem(indice)}>+</button>
                  
                  <button className='buttonExcluir' onClick={() => adicionarMaisItem(indice)}>+</button>
                  
                  <button className='buttonExcluir' onClick={() => excluirItem(indice)}>Excluir</button>
                </div>
              </li>
            ))}
          </ol>
        </div>

      </div>
    </>
  )
}

export default App
