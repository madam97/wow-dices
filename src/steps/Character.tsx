import { classes, species, names } from '../data/character';

type CharacterProps = {
  character: TCharacter, 
  stepAction(): void, 
  setCharacter(character: TCharacter): void
};

const Character = ({
  character, 
  stepAction, 
  setCharacter
}: CharacterProps): JSX.Element => {
  return (
    <div className="step step-character">
      {character.name === '' && <p>Choose your character</p>}
      {character.name !== '' && <p>{character.name}</p>}

      <div>
        {Object.keys(species).map((faction): JSX.Element => (
          <div key={faction}>
            {Object.keys(species[faction]).map((c): JSX.Element => {
              let tmpCharacter: TCharacter = {
                name: names[faction][c],
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

export default Character;