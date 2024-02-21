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
    <div className='bg-fundo h-dvh flex flex-row flex justify-evenly py-8'>

      <div>
        <h1 className='font-mono text-4xl font-semibold'> Lista de Compras </h1>
        <h2 className='font-mono text-3xl font-regular my-2'> Adicionar itens a lista </h2>

        <div className='flex flex-col'>
          <input
            className='bg-fundoPlaceholder border-2 rounded-md  my-2 p-1.5 font-mono text-1xl font-regular'
            type="text"
            placeholder="Nome do Item"
            value={textoDeEntrada}
            onChange={(e) => setTextoDeEntrada(e.target.value)}
          />

          <input
            className='bg-fundoPlaceholder border-2 rounded-md  my-2 p-1.5 font-mono text-1xl font-regular'
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

      <div className='w-2/4'>
        <ol className='list-decimal list-image-[url(checkmark.png)]'>
          {itens.map((item, indice) => (

            <li key={indice}>

              <div>
                <div className='flex flex-row flex justify-between'>

                  <h1 className='font-mono text-1xl font-regular'>{item.titulo}</h1>

                  <h1 className='font-mono text-1xl font-regular'>qtda - {item.quantidade}</h1>

                </div>

                <hr></hr>
              </div>
              <button
                className='bg-roxomaisescuro hover:bg-roxomaisclaro border-2 hover:border-roxomaisescuro rounded-md text-branco hover:text-roxomaisescuro font-mono my-2 p-1.5 text-1xl font-regular w-6/12'
                onClick={() => excluirItem(indice)}>
                Excluir
              </button>
            </li>

          ))}
        </ol>
      </div>

    </div >
  )
}

export default App
