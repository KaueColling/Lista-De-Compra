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
    <div className='bg-fundo h-dvh flex flex-col justify-evenly md:flex-row  px-12 md:px-10  py-12 md:py-8'>

      <div>
        <h1 className='font-mono text-2xl md:text-4xl font-semibold'> Lista de Compras </h1>
        <h2 className='font-mono text-1xl md:text-3xl font-regular my-2'> Adicionar itens a lista </h2>

        <div className='flex flex-col'>
          <input
            className='bg-fundoPlaceholder border-2 rounded-md  my-2 p-1.5 font-mono text-1xl md:text-xl font-regular'
            type="text"
            placeholder="Nome do Item"
            value={textoDeEntrada}
            onChange={(e) => setTextoDeEntrada(e.target.value)}
          />

          <input
            className='bg-fundoPlaceholder border-2 rounded-md  my-2 p-1.5 font-mono text-1xl md:text-xl font-regular'
            type="number"
            placeholder="Quantidade de itens"
            value={quantidades}
            onChange={(e) => setQuantidades(e.target.value)}
          />
        </div>
        <button
          className='bg-roxomaisescuro hover:bg-roxomaisclaro border-2 hover:border-roxomaisescuro rounded-md text-branco hover:text-roxomaisescuro font-mono my-2 p-1.5 text-1xl font-regular w-6/12'
          onClick={adicionarItem}>
          Adicionar
        </button>
      </div>

      <div className='md:w-2/4 overflow-auto'>
        <ol className='list-decimal font-mono text-1xl font-regular mt-8'>
          {itens.map((item, indice) => (

            <li key={indice} className='font-mono text-1xl font-regular'>

              <div>
                <div className='flex flex-row justify-between'>

                  <h1 className=''>{item.titulo}</h1>

                  <h1 className='font-mono text-1xl font-regular'>qtda - {item.quantidade}</h1>

                </div>

                <hr></hr>
              </div>

              <div className='flex flex-row justify-between items-center'>

                <label className=''>
                  <input type="checkbox" class="accent-roxomaisescuro size-5 bg-fundo" />
                </label>

                <button
                  className='bg-roxomaisescuro hover:bg-roxomaisclaro border-2 hover:border-roxomaisescuro rounded-md text-branco hover:text-roxomaisescuro font-mono my-2 p-1.5 text-1xl font-regular w-6/12'
                  onClick={() => excluirItem(indice)}>
                  Excluir
                </button>

              </div>

            </li>
          ))}
        </ol>
      </div>

    </div >
  )
}

export default App
