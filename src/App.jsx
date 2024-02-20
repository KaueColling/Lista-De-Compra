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
      <div className='flex flex-col gap-4 py-[30px] px-[235px]'>
        <h1 className='text-3xl font-bold'> Lista de Compras </h1>
        <h2 className='text-2xl font-medium'> Adicionar itens a lista </h2>

        <div>
          <div>
            <input
              className='bg-fundo border-2 border-azul rounded-2xl w-full p-2 text-lg'
              type="text"
              placeholder="Nome do Item"
              value={textoDeEntrada}
              onChange={(e) => setTextoDeEntrada(e.target.value)}
            />
          </div>
          <button className='mt-4 bg-roxoescuro py-2 pr-4 pl-2 text-fundo rounded-lg' onClick={adicionarItem}>Adicionar</button>
        </div>

        <div>
          <ol className='list-decimal list-inside'>
            {itens.map((item, indice) => (
              <li className='item' key={indice}>
                <hr></hr>
                <div>
                  {item.titulo}

                  <div className='flex flex-row justify-between'>
                    <div className='flex flex-row items-center gap-1'>
                      <button className='bg-roxoescuro text-fundo p-2 w-12 font-bold rounded-lg'
                        onClick={() => removerQtda(indice)}>
                        -
                      </button>

                      <p className='bg-fundo text-roxoescuro p-2 w-12 font-bold rounded-lg'>
                        {item.quantidade}
                      </p>

                      <button className='bg-roxoescuro text-fundo p-2 w-12 font-bold rounded-lg'
                        onClick={() => adicionarQtda(indice)}>
                        +
                      </button>
                    </div>
                    <button className='bg-roxoescuro text-fundo p-2 font-bold rounded-lg'
                      onClick={() => excluirItem(indice)}>
                      Excluir
                    </button>
                  </div>
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
