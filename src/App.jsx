import { useState, useEffect } from 'react'

function App() {

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
        quantidade: 0, // Adicionando quantidade ao novo item
      };
      setItens([...itens, novoItem]);
      setTextoDeEntrada('');
      salvarDetalhesNoLocalStorage([...itens, novoItem]);
    }
  };

  const excluirItem = (indice) => {
    const itensAtualizados = [...itens];
    itensAtualizados.splice(indice, 1);
    setItens(itensAtualizados);
    salvarDetalhesNoLocalStorage(itensAtualizados);
  };

  const removerQtda = (indice) => {
    const itensAtualizados = [...itens];
    itensAtualizados[indice].quantidade = Math.max(0, itensAtualizados[indice].quantidade - 1);
    setItens(itensAtualizados);
    salvarDetalhesNoLocalStorage(itensAtualizados);
  };

  const adicionarQtda = (indice) => {
    const itensAtualizados = [...itens];
    itensAtualizados[indice].quantidade = itensAtualizados[indice].quantidade + 1;
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
                  {item.titulo}

                  <button className='buttonExcluir' onClick={() => removerQtda(indice)}>-</button>
                  {item.quantidade}
                  <button className='buttonExcluir' onClick={() => adicionarQtda(indice)}>+</button>
                  
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
