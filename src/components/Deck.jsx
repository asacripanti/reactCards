import React from "react"

export default function Deck(){
    const [deck, setDeck] = React.useState(null)
    const [remainingCards, setRemainingCards] = React.useState(null)
    const [drawnCard, setDrawnCard] = React.useState(null)
    const [error, setError] = React.useState(null);

    React.useEffect(()=>{
        fetch("https://deckofcardsapi.com/api/deck/new/")
            .then(res => res.json())
            .then(data => {
                setDeck(data.deck_id);
                setRemainingCards(data.remaining);
            })
    }, [])

    function drawCard(){
        if (remainingCards === 0) {
            setError("Error: no cards remaining!");
            return;
        }

       fetch(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`)
        .then(res => res.json())
        .then(data => {
            setRemainingCards(data.remaining);
            setDrawnCard(data.cards[0])
            console.log("Drawn card:", data.cards[0]);
        })
    }

    function shuffleDeck(){
        fetch(`https://deckofcardsapi.com/api/deck/${deck}/shuffle/`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to shuffle deck");
                }
                console.log("Shuffled")
                setRemainingCards(null);
                setDrawnCard(null);
                setError(null);
            })
    }
    return(
        <div>
            {error && <h1>{error}</h1>}
            <button onClick={drawCard} className="newCard">
                Card Please
            </button>
            <button onClick={shuffleDeck} className="shuffleDeck">Shuffle Deck</button>
            <h2>{deck}</h2>
            <h3>{remainingCards}</h3>
            {drawnCard && <div>
                <img src={drawnCard.image} alt="Drawn Card" />
            </div>}
        </div>
    )
}