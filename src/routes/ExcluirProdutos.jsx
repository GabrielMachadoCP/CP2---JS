import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Excluir.scss"
export default function ExcluirProduto() {
  document.title = 'Excluir Produto';

  const navigate = useNavigate();

  const [produtos, setProdutos] = useState([]);
  const [produtoId, setProdutoId] = useState('');
  const [produtoExcluido, setProdutoExcluido] = useState(false);

  const fetchProdutos = () => {
    fetch('http://localhost:5000/produtos')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Erro ao buscar produtos: ${response.status}`);
        }
      })
      .then((data) => setProdutos(data))
      .catch((error) => console.error('Erro ao buscar produtos:', error));
  };

  const handleExcluirProduto = () => {
    fetch(`http://localhost:5000/produtos/${produtoId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setProdutoExcluido(true);
        } else {
          throw new Error(`Erro ao excluir o produto: ${response.status}`);
        }
      })
      .catch((error) => {
        console.error('Erro na solicitação DELETE:', error);
        alert('Erro ao excluir o produto. Verifique o ID e tente novamente.');
      });

      //Redirect
      navigate("/produtos")
  };


  useEffect(() => {
    fetchProdutos();
  }, [produtoExcluido]);

  return (
    <div className='comp'>
      <h1>Excluir Produto</h1>

      {produtoExcluido ? (
        <p>Produto excluído com sucesso!</p>
      ) : (
        <div className='oioi'>
          <label htmlFor="idProduto">Selecione o produto a ser excluído:</label>
          <select id="idProduto" onChange={(e) => setProdutoId(e.target.value)}>
            <option value="">Selecione um produto</option>
            {produtos.map((produto) => (
              <option key={produto.id} value={produto.id}>
                {produto.nome}
              </option>
            ))}
          </select>
          <div className='delete'><button onClick={handleExcluirProduto}>Confirmar Exclusão</button></div>
        </div>
      )}
    </div>
  );
}
