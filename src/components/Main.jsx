import '/src/App.css'
import Die from '/src/components/Die.jsx'
import { useState } from 'react'
import RollButton from '/src/components/RollButton.jsx'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'


export default function Main() {
    const [diceNumbers, setDiceNumbers] = useState(allNewDice())
    const [selectedIDs, setSelectedIDs] = useState([])
    const [notSelectedIDs, setNotSelectedIDs] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    const [newGameText, setNewGameText] = useState(false)
    const { width, height } = useWindowSize()


    function allNewDice() {
        const randomNumberArr = []
        for (let i = 0; i < 10; i++) {
            randomNumberArr.push(Math.floor(Math.random() * 6) + 1)
        }
        return randomNumberArr
    }

    const diceElementList = diceNumbers.map(((num, index) => (
        <Die value={num} id={index} handleSelect={handleSelect} selectedDice={selectedIDs}/>
    )))

    function handleSelect(id) {
 
        setSelectedIDs((prev) => {
            let newArr = prev.includes(id) ? prev.filter(num => num !== id) : [...prev, id]
            return newArr
        })

        setNotSelectedIDs((prev) => {
            let newUnselectedArr = prev.includes(id) ? prev.filter(num => num !== id) : [...prev, id]
            return newUnselectedArr
        })
    }

    function handleReroll() {
        setDiceNumbers((prev) => {
            let newArr = [...prev]
            for(let i = 0; i < notSelectedIDs.length; i++) {
                let rand = Math.floor(Math.random() * 6) + 1
                newArr[notSelectedIDs[i]] = rand
            }
            return newArr
        })
    }

    useEffect(() => {
        if (selectedIDs.length === 10) {
            if (diceNumbers.every(num => num === diceNumbers[0])) {
                setNewGameText(prev => !prev)
            }
        }
    }, [selectedIDs])

    function createNewGame() {
        setSelectedIDs([])
        setNotSelectedIDs([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        setNewGameText(false)
        setDiceNumbers(allNewDice())
    }

    return (
        <>
            {newGameText ? <Confetti width={width} height={height} /> : null}
            <h1 className='title'>Tenzies</h1>
            <h3 className='summary'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h3>

            <section className='dieContainer'>
                <section className='row'>
                    {diceElementList.slice(0, 5)}
                </section>
                <section className='row'>
                    {diceElementList.slice(5, 10)}
                </section>
            </section>

            <RollButton handleReroll={newGameText ? createNewGame : handleReroll} isNewGame={newGameText}/>
        </>
    )
}