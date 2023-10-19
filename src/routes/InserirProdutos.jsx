import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Inserir.scss"

export default function InserirProdutos() {
  document.title = 'Inserir Produto';

  const navigate = useNavigate();
  const [produto, setProduto] = useState({
    nome: '',
    desc: '',
    preco: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduto((prevProduto) => ({
      ...prevProduto,
      [name]: value,
    }));
  };

// Fazer a solicitação POST à sua API com os dados do produto
const handleSubmit = (e)=>{
    e.preventDefault();
    fetch(`http://localhost:5000/produtos`, {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(produto)
    })
    .then(response => console.log("STATUS DA INSERÇÃO : " + response.status))
    .catch(error=> console.log(error))
    
    //Redirect
    navigate("/produtos")
  }

  return (
    <div className='tudo'>
      <h1>Inserir Produtos</h1>

      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Produto a ser Inserido:</legend>

          <div>
            <label htmlFor="idNome">Nome</label>
            <input
              type="text"
              name="nome"
              id="idNome"
              placeholder="Digite o nome do produto: "
              value={produto.nome}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="idDesc">Descrição</label>
            <input
              type="text"
              name="desc"
              id="idDesc"
              placeholder="Digite a descrição do produto: "
              value={produto.desc}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="idPreco">Valor</label>
            <input
              type="number"
              name="preco"
              id="idPreco"
              placeholder="Digite o valor do produto: "
              value={produto.preco}
              onChange={handleChange}
            />
          </div>

          <div>
            <button type="submit">INSERIR</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
