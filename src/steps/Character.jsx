import { classes, species } from '../data/character.js';

export default function Character({ character, stepAction, setCharacter }) {
  return (
    <div className="step step-character">
      <p>Choose your character</p>

      <div>
        {Object.keys(species).map((faction) => (
          <div key={faction}>
            {Object.keys(species[faction]).map((c) => {
              let tmpCharacter = {
                faction: faction, 
                class: c, 
                species: species[faction][c],
                img: classes[faction][c],
                alt: `${faction} ${c} character`
              };

              return (
                <button 
                  key={c}
                  className={`btn-char ${character.faction === faction && character.class === c ? 'btn-char-selected' : ''} border-${faction}`}
                  onClick={() => setCharacter(tmpCharacter)}
                >
                  <img src={tmpCharacter.img} alt={tmpCharacter.alt} />
                </button>
              )
            })}
          </div>
        ))}
      </div>

      {character.faction && 
        <div>
          <button className="btn" onClick={() => stepAction()}>
            Start the game
          </button>
        </div>
      }
    </div>
  )
}
