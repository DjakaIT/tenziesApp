import { useState, useEffect } from 'react'
import Die from "./Components/Die"
import {nanoid} from "nanoid"
export default function App(){

  const[diceNum, setDiceNum] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

 

  

  useEffect(() => {
    //diceNum - the state we are checking
    //allHeld uses every and checks for every dice's isHeld property(dice is an object)
    //allDiceSame uses every method also and checks for every dice's value property
    //in the end, set the state of the dices to true an if condition(using conditional rendering caused errors)
    //
    const allHeld = diceNum.every(die => die.isHeld)
    const allDiceSame = diceNum.every(die => die.value === diceNum[0].value)
    
    if(allHeld && allDiceSame){
      setTenzies(true)
      console.log("YOU WON!")
    }
  }, [diceNum])
  


  function generateNewdice() {
    return{
      value: (Math.ceil(Math.random() * 6)),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
        newDice.push(generateNewdice)
  }
    return newDice

}



function rollDice() {
  setDiceNum(prevDice => prevDice.map(dice => {
    return dice.isHeld ? dice : generateNewdice()
  }))
}

function holdDice(id) {
  setDiceNum(prevDice => prevDice.map(die => {
    return die.id === id ? {...die, isHeld: !die.isHeld} : die
  }))
}
  

const diceElements = diceNum.map(diceNumber => {
  return <Die key={diceNumber.id} value={diceNumber.value} isHeld={diceNumber.isHeld} handleClick={() => holdDice(diceNumber.id)}/>;



});

  return(
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-dice" onClick={rollDice}>Roll</button>
    </main>
  )
}