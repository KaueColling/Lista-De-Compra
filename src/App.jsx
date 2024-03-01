import { useState, useEffect } from 'react'

function App() {

   // Define os estados para armazenar itens da lista, texto de entrada e quantidades
   const [itens, setItens] = useState([]);
   const [textoDeEntrada, setTextoDeEntrada] = useState('');
   const [quantidades, setQuantidades] = useState('');
 
   // Função para salvar os detalhes da lista no armazenamento local
   const salvarDetalhesNoLocalStorage = (itensAtualizados) => {
     localStorage.setItem('itens', JSON.stringify(itensAtualizados));
   };
 
   // Efeito para carregar os itens salvos do armazenamento local quando o componente monta
   useEffect(() => {
     const savedItens = JSON.parse(localStorage.getItem('itens'));
     if (savedItens) {
       setItens(savedItens);
     }
   }, []);
 
   // Função para adicionar um novo item à lista
   const adicionarItem = () => {
     if (textoDeEntrada.trim() !== '') {
       const novoItem = {
         titulo: textoDeEntrada,
         quantidade: quantidades,
       };
       setItens([...itens, novoItem]);
       setTextoDeEntrada('');
       setQuantidades('');
       salvarDetalhesNoLocalStorage([...itens, novoItem]);
     }
   };
 
   // Função para excluir um item da lista
   const excluirItem = (indice) => {
     const itensAtualizados = [...itens];
     itensAtualizados.splice(indice, 1);
     setItens(itensAtualizados);
     salvarDetalhesNoLocalStorage(itensAtualizados);
   };


  return (
    <div className='font-montserrat bg-fundo h-dvh flex flex-col justify-evenly md:flex-row  px-12 md:px-10  py-8 md:py-2'>

      <div className='pt-8'>
        <h1 className='text-roxoescuro font-anton font-extralight tracking-wide text-3xl md:text-3xl'> Lista de Compras </h1>
        <h2 className='text-xl md:text-xl font-regular my-2'> Adicionar itens a lista </h2>

        <div className='flex flex-col'>
          <input
            className='bg-fundoPlaceholder border-2 rounded-md  my-2 p-1.5 text-1xl md:text-md font-regular w-auto'
            type="text"
            placeholder="Nome do Item"
            value={textoDeEntrada}
            onChange={(e) => setTextoDeEntrada(e.target.value)}
          />

          <input
            className='bg-fundoPlaceholder border-2 rounded-md  my-2 p-1.5 text-1xl md:text-md font-regular w-auto'
            type="number"
            placeholder="Quantidade de itens"
            value={quantidades}
            onChange={(e) => setQuantidades(e.target.value)}
          />
        </div>
        <button
          className='bg-roxomaisescuro hover:bg-roxomaisclaro border-2 hover:border-roxomaisescuro rounded-md text-branco hover:text-roxomaisescuro my-2 p-1.5 text-1xl font-regular w-6/12'
          onClick={adicionarItem}>
          Adicionar
        </button>
      </div>

      <div className='md:w-2/4 overflow-auto'>
        <ol className='list-decimal text-1xl font-regular mt-8'>
          {itens.map((item, indice) => (

            <li key={indice} className='font-regular pb-6'>

              <div>
                <div className='flex flex-row justify-between'>

                  <h1 className='text-xl text-roxoescuro font-anton tracking-wide'>{item.titulo}</h1>

                  <h1 className='text-md font-regular'>Quantidade - {item.quantidade}</h1>

                </div>

                <hr></hr>
              </div>

              <div className='flex flex-row justify-between items-center'>

                <label className=''>
                  <input type="checkbox" class="accent-roxomaisescuro size-5 bg-fundo" />
                </label>

                <button
                  className='bg-roxomaisescuro hover:bg-roxomaisclaro border-2 hover:border-roxomaisescuro rounded-md text-branco hover:text-roxomaisescuro my-2 p-1.5 text-1xl font-regular w-3/12'
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
