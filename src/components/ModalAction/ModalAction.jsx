import "./ModalAction.scss";

export default function ModalAction(props){
    if(props.open){return(
        <div className="modal">
            <h1>Componente modal</h1>
            <div className="botao"><button onClick={()=>props.setClose(false)}>CLOSE-MODAL</button></div>
        </div>
        )
    }
}
