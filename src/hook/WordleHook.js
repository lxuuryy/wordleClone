import React from 'react'

export default function WordleHook (word) {


    const [turn, setTurn] = React.useState(0);
    const [currentGuess, setCurrentGuess] = React.useState('');
    const [guesses, setGuesses] = React.useState([...Array(6)]);
    const [isCorrect, setIsCorrect] = React.useState(false);
    const [history, setHistory] = React.useState([])
    const [usedKeys, setUsedKeys] = React.useState({})

    
    const formatGuess = () => {
        let solutionArray = [...word].toString().split('')
        
       
        let formattedGuess = [...currentGuess].map(l => {
          return {key: l, color: 'grey'}
        })
    
        // find any green letters
        formattedGuess.forEach((l, i) => {
          if (solutionArray[i] === l.key) {
            formattedGuess[i].color = 'green'
            solutionArray[i] = null
          }
        })
        
        // find any yellow letters
        formattedGuess.forEach((l, i) => {
          if (solutionArray.includes(l.key) && l.color !== 'green') {
            formattedGuess[i].color = 'yellow'
            solutionArray[solutionArray.indexOf(l.key)] = null
          }
        })
    
        return formattedGuess
    }

    const addNewGuess = (formattedGuess) => {
        console.log([...word].toString().split(''))
        console.log(currentGuess)
        console.log(word.toString())
        if(currentGuess === word.toString()){
            setIsCorrect(true)
        }

        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses]
        newGuesses[turn] = formattedGuess
        return newGuesses
        }) 

        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess]
        })
        
        setTurn((prevTurn) => {
            return prevTurn + 1
        })

        setUsedKeys(prevUsedKeys => {
            formattedGuess.forEach(l => {
              const currentColor = prevUsedKeys[l.key]
      
              if (l.color === 'green') {
                prevUsedKeys[l.key] = 'green'
                return
              }
              if (l.color === 'yellow' && currentColor !== 'green') {
                prevUsedKeys[l.key] = 'yellow'
                return
              }
              if (l.color === 'grey' && currentColor !== ('green' || 'yellow')) {
                prevUsedKeys[l.key] = 'grey'
                return
              }
            })
      
            return prevUsedKeys
          })
         

        setCurrentGuess('')
    }
    
    
    const handleKeyup = ({key}) => {
     
    
    
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
        
    
        if (key === 'Backspace'){
            setCurrentGuess((prev) => {
                return prev.slice(0, -1)
            })
    
            return
        }
        
        
        if(/^[A-Za-z]$/.test(key) && currentGuess.length < 5 ){
            setCurrentGuess((prev) => {
         return prev + key.toLowerCase()})
       }
    
    
       
    
        
    
    
    }
    
    return { handleKeyup, currentGuess, guesses, usedKeys, isCorrect, turn, setCurrentGuess, history, formatGuess, addNewGuess}
        
    }

