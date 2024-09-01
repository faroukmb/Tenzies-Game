/* eslint-disable react/prop-types */
function Die(props){
    
    return (
        <div className={ props.isHeld === true ? "dieheld" : "die"} onClick={props.holdDice} >
            <h1>{props.value}</h1>
        </div>
    )
}
export default Die