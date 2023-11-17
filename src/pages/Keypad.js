import React from 'react';
import Letters from './Letters';
export default function Keypad({color, toggles, keys, usedKeys, onKeyPress, handleKeyup, setCurrentGuess, turn, history, currentGuess, formatGuess, addNewGuess}) {




  const handleKeyPress = (key) => {


   
    
    if (key === 'Enter') {

     
      console.log('Enter key pressed');
      if (key === 'Enter'){
    
        if(turn > 5){
            console.log('you have reached your limit')
            return
        }

        if(history.includes(currentGuess)){
            console.log('you have entered the word before')
            return
        }

        if(currentGuess.length !== 5 ){
            console.log('please enter a valid word')
            return

        }



        const myGuess = formatGuess()
        console.log(myGuess)
        addNewGuess(myGuess)
    }
      // Add your logic for handling Enter key press, e.g., submitting the current guess
    } else if (key === 'Delete') {
      // Handle Delete key press
      console.log('Delete key pressed');
      // Add your logic for handling Delete key press, e.g., deleting the last letter in the current guess
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else {
  
   
      // Handle other key presses
      onKeyPress(key);
  }
  
    
  };
    return (
      <div className='keypad--div'>
      <div className="keypad">
        <div onClick={ ()=> handleKeyPress('Delete')} className='backspace--button'>Delete</div>
        {Letters.map(l => {
          const color = usedKeys[l.key]
          return (
            <div key={l.key} className={color}
            onClick={ !toggles ? () => handleKeyPress(l.key) : ()=> {
              return
            }}
            >{l.key}</div>
          )
        })}
        
        <div onClick={ ()=> handleKeyPress('Enter')} className='enter--tag'>Enter</div>
      </div>
      </div>
      

    )
  }