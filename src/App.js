import React from 'react'
import Wordle from './pages/Wordle'

export default function App() {

  const [word, setWord] =  React.useState('')



  React.useEffect(() => {
    const fetchData =  async () => {
      const response = await fetch('https://random-word-api.herokuapp.com/word?length=5')

      const json = await response.json()

      setWord(json)

      
    }

    fetchData()
  
  }, [])

  return (
    <div className='main--app'>
    {word && <Wordle word={word}/>}

    </div>
  )
}
