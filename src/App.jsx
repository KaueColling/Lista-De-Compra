import { useState, useEffect } from 'react'

function App() {

  const [itens, setItens] = useState([]);

  const [textoDeEntrada, setTextoDeEntrada] = useState('');

  const [quantidades, setQuantidades] = useState('');

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
        quantidade: quantidades, // Adicionando quantidade ao novo item
      };
      setItens([...itens, novoItem]);
      setTextoDeEntrada('');
      setQuantidades('');
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
    <div className='bg-fundo h-dvh flex flex-col gap-4 grid justify-items-center '>
      <div className=' w-11/12 pt-6'>
        <h1 className='text-3xl font-bold '> Lista de Compras </h1>
        <h2 className='text-2xl font-medium'> Adicionar itens a lista </h2>

        <div>
          <div>
            <input
              className='bg-fundoPlaceholder my-2 border-2 border-azul rounded-2xl w-full p-2 text-lg'
              type="text"
              placeholder="Nome do Item"
              value={textoDeEntrada}
              onChange={(e) => setTextoDeEntrada(e.target.value)}
            />

            <input
              className='bg-fundoPlaceholder my-2 border-2 border-azul rounded-2xl w-full p-2 text-lg'
              type="number"
              placeholder="Quantidade de itens"
              value={quantidades}
              onChange={(e) => setQuantidades(e.target.value)}
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
                  {item.titulo} {item.quantidade}
                </div>
                <button className='bg-roxoescuro text-fundo p-2 font-bold rounded-lg'
                  onClick={() => excluirItem(indice)}>
                  Excluir
                </button>
              </li>
            ))}
          </ol>
        </div>

      </div>
    </div >
  )
}

export default App
