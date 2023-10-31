import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./ModalAction.scss";

function ModalActionE(props) {

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
          props.setCloseE(false); // Feche o modal
          // Recarregue a página após a exclusão
          window.location.reload();
        } else {
          throw new Error(`Erro ao excluir o produto: ${response.status}`);
        }
      })
      .catch((error) => {
        console.error('Erro na solicitação DELETE:', error);
        alert('Erro ao excluir o produto. Verifique o ID e tente novamente.');
      });
  };
  

  useEffect(() => {
    fetchProdutos();
  }, [produtoExcluido]);

  if (props.openE) {
    return (
      <div className="modal">
        <div className="tudo">
          <h1>Excluir Produto</h1>
        <div className="botao"><button onClick={()=>props.setCloseE(false)}>SAIR</button></div>
        {produtoExcluido ? (
          <p>Produto excluído com sucesso!</p>
        ) : (
          <div className="oioi">
            <label htmlFor="idProduto">Selecione o produto a ser excluído:</label>
            <select id="idProduto" onChange={(e) => setProdutoId(e.target.value)}>
              <option value="">Selecione um produto</option>
              {produtos.map((produto) => (
                <option key={produto.id} value={produto.id}>
                  {produto.nome}
                </option>
              ))}
            </select>
            <div className="delete">
              <button onClick={handleExcluirProduto}>Confirmar Exclusão</button>
            </div>
          </div>
        )}
      </div>
        </div>
        
    );
  }
}

export default ModalActionE;