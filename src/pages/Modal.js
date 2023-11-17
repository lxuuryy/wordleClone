import React from 'react'

export default function Modal({ isCorrect, solution, turn, userName }) {
  return (
    <div className="modal">
      {isCorrect && (
        <div>
          <h1>Congrats {userName}, You Win!</h1>
          <p className="solution">{solution}</p>
          <p>You found the word in {turn} guesses</p>
        </div>
      )}
      {!isCorrect && (
        <div>
          <h1>Sorry {userName}, Unlucky!</h1>
          <p className="solution">{solution}</p>
          <p>Better luck next time</p>
        </div>
      )}
    </div>
  )
}