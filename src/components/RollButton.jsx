export default function RollButton(props) {
    return (
        <section onClick={props.handleReroll} className='buttonContainer'>
            <button className='btn' style={props.isNewGame ? {width: '250px'} : {width: '184.32px'}}>{props.isNewGame ? "New Game" : "Reroll"}</button>
        </section>
    )
}