
import React from 'react'
import Grid from'./Grid'
import WordleHook from '../hook/WordleHook.js'
import Modal from './Modal'
import { FiAlignLeft 
} from "react-icons/fi";
import { BsQuestionCircle } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import {motion} from 'framer-motion'
import Switch from 'react-ios-switch'
import Auth from './Auth'




import Keypad from './Keypad'

export default function Wordle ({word}){


    const [userName, setUserName] = React.useState('')

   


    const [color, setColor] = React.useState(false)


    const [showInstructions, setShowInstructions] = React.useState(false)

    const [toggle, setToggle] = React.useState(false)
 
    const handleKeyPress = (key) => {
        // Handle the key press, update currentGuess, or perform any other logic
        setCurrentGuess((prev) => (prev.length < 5 ? prev + key : prev));

      
    }

    const {handleKeyup, currentGuess, guesses, isCorrect, turn, usedKeys, setCurrentGuess, history, formatGuess, addNewGuess} = WordleHook(word)

    const [modal, setModal] = React.useState(false)

    React.useEffect(() => {
        window.addEventListener('keyup', handleKeyup)

        if (isCorrect) {
            console.log(isCorrect)
            setTimeout(() => setModal(true), 2000)
            console.log("first modal is " , modal)
            window.removeEventListener('keyup', handleKeyup)
          }
          if (turn > 5) {
            setTimeout(() => setModal(true), 2000)
            window.removeEventListener('keyup', handleKeyup)
          }

          if(toggle){
            window.removeEventListener('keyup', handleKeyup)
          }

        return () => window.removeEventListener('keyup', handleKeyup)
    }, [handleKeyup, isCorrect, turn, modal, toggle])


    React.useEffect(()=> {
        console.log(guesses, isCorrect, turn)
    }, [guesses, isCorrect, turn])

    function toggleInstructions (){
        setShowInstructions(prevShow => !prevShow)
    }
    

    function toggleTheme () {
        setToggle(prevToggle => !prevToggle)



    }

    const bodyStyles = {
        margin: 0,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        backgroundColor: !color ? '#121213' : 'white',
        color: !color ? 'white' : 'black',
        
      };

    



        const handleChange = () => {
            setColor(!color);
          };

          

          const handleChangeColor = () => {
            // Change the background color based on your logic
            const newColor = color ? 'white' : 'black';
        
            // Update the state and body background color
            setColor(!color);
            document.body.style.backgroundColor = newColor;
          };
    

    return(
        <div className='wordle--container'   >


    







            { toggle && <motion.div initial={{width: 0}} transition={{ delay: 0.2, type: 'spring'}} animate={{width: 200}}  className={ color ? 'toggle--menu light': 'toggle--menu'}>
                
            <motion.div  className='toggle--button'initial={{opacity: 0}} transition={{delay: 0.5}} animate={{opacity: 1}} >

            <h2>{ color ?  'Light Mode' : 'Dark Mode'}</h2>
            <Switch

onClick={handleChangeColor}         
  checked={color}
  onChange={handleChange}
/>

<Auth userName={userName} setUserName={setUserName}/>
</motion.div>
        
</motion.div>}
           { showInstructions &&   <div className='faded--background'>
                <div className={!color ? 'instructions--div' : 'instructions--div white'}> 
               < MdOutlineClose  

                onClick={toggleInstructions}
                style={{ cursor:'pointer', position: "absolute", right:'20px', top: 30, fontSize:'20px'}}/>
              
                    <div>
                        <h2 className='rule--header'>How To Play</h2>
                        <p>Guess the Wordle in 6 tries</p>
                        <ul>
                            <li>Each Guess must be a 5-letter word.</li>
                            <li>Pay attention to color of the tiles</li>
                        </ul>
                    </div>
                    <div>
                        <div>
                            <h2>Examples</h2>
                            <img src='/images/wordle1.png' alt='first--item'/>
                            <p><b>W</b> is in the correct word and the right position</p>
                        </div>
                        <div>
                            <img src='/images/wordle2.png' alt='second--item'/>
                            <p><b>I</b> s in the word but the wrong position</p>
                        </div>
                        <div>
                            <img src='/images/wordle3.png' alt='third--item'/>
                            <p><b>U</b> is not present at all in the word</p>
                        </div>
                    </div>
                    <div> 
                        
</div>
                </div>
            </div>}
            <div className={color? 'nav--bar light' : 'nav--bar'}>
                <div className='app--title'>
                <div><FiAlignLeft style={{fontSize:'45px'}} onClick={toggleTheme} /></div><div>{userName.length > 0  && `Hi ${userName} ,`} WORDLE <span className='my--span'>by Akmal Ashwin</span></div> <div><BsQuestionCircle onClick={toggleInstructions} style={{fontSize:'40px', cursor:'pointer', paddingRight:'30px'}} /></div>

                </div>
            </div>
            
            <Grid guesses={guesses} currentGuess={currentGuess} turn={turn}/>
            
                <Keypad toggles={toggle} color={color} turn={turn} history={history} currentGuess={currentGuess} formatGuess={formatGuess} addNewGuess={addNewGuess} usedKeys={usedKeys} setCurrentGuess={setCurrentGuess} onKeyPress={handleKeyPress} handleKeyup={handleKeyup}/>

            {modal && <Modal userName={userName} isCorrect={isCorrect} turn={turn} word={word}/>}
            

            <style>{`
        body {
          margin: ${bodyStyles.margin};
          font-family: ${bodyStyles.fontFamily};
          -webkit-font-smoothing: ${bodyStyles.WebkitFontSmoothing};
          -moz-osx-font-smoothing: ${bodyStyles.MozOsxFontSmoothing};
          background-color: ${bodyStyles.backgroundColor};
          color: ${bodyStyles.color};
        }
      `}</style>
        </div>
    )

} 