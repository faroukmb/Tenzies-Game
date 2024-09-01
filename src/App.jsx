import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import './App.css'
import Die from './die'
import Confetti from 'react-confetti';

function App() {
const [dice,setDice]=useState(allNewDice())
const [tenzies,setTenzies]=useState(false)
const [rollsnumber,setRollsNumber]=useState(0);
useEffect(
  ()=>{
    const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            console.log("You won!")
        }
  },[dice]
)
function allNewDice(){
  const dicearray= [];
  for(let i=0;i<10 ;i++){
    dicearray.push({value: Math.floor(Math.random() * 6) + 1, isHeld : false, id: nanoid()})
  }
  return dicearray;
}
function rolldice(){
  setDice(olddice=> olddice.map(dice=>{
    return dice.isHeld === true ? dice : {...dice, value: Math.floor(Math.random() * 6) + 1, isHeld : false, id: nanoid() }
  }))
  setRollsNumber( prev => prev+ 1)
}
function holdDice(id){
  const newdice= dice.map(dice => dice.id === id ? {...dice, isHeld : !dice.isHeld} : dice)
  setDice(newdice)
 }


 
 return (
  
    <main>
     {tenzies && <Confetti/>  }
          <div className='container'>
           <div className="presentation">
          <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          {!tenzies ? <h2>You rolled {rollsnumber} times</h2> : <h2>Congrats! <br/>Your final score is {rollsnumber}</h2>}
        </div>
        <div className="dices">
        {
          dice.map((die)=> <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={()=> holdDice(die.id)} dice={dice}/>)
        }
        </div>
        
       <button className='roll' onClick={tenzies ? ()=>{setDice(allNewDice(), setTenzies(false) ,setRollsNumber(0))} : rolldice}>{tenzies ? "Reset Game" : "Roll"}</button>
       </div>
      </main> 

      
     
      

  )
}

export default App
