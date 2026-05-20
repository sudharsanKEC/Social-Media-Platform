import "./Popup.css"
function Popup({message}){
    return (
        <div>
            <div className="popup">{message}<br/>You can continue your signup.</div>
        </div>
    );
}
export { Popup };