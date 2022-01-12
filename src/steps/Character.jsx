import AWarrior from '../assets/images/char/a_warrior.png';
import AHunter from '../assets/images/char/a_hunter.png';
import ARogue from '../assets/images/char/a_rogue.png';
import APaladin from '../assets/images/char/a_paladin.png';
import APriest from '../assets/images/char/a_priest.png';
import AMage from '../assets/images/char/a_mage.png';
import AWarlock from '../assets/images/char/a_warlock.png';
import ADruid from '../assets/images/char/a_druid.png';
import AShaman from '../assets/images/char/a_shaman.png';
import HWarrior from '../assets/images/char/h_warrior.png';
import HHunter from '../assets/images/char/h_hunter.png';
import HRogue from '../assets/images/char/h_rogue.png';
import HPaladin from '../assets/images/char/h_paladin.png';
import HPriest from '../assets/images/char/h_priest.png';
import HMage from '../assets/images/char/h_mage.png';
import HWarlock from '../assets/images/char/h_warlock.png';
import HDruid from '../assets/images/char/h_druid.png';
import HShaman from '../assets/images/char/h_shaman.png';

export default function Character({ character, stepAction, setCharacter }) {

  const classes = {
    alliance: {
      warrior: AWarrior,
      hunter: AHunter,
      rogue: ARogue,
      paladin: APaladin,
      priest: APriest,
      mage: AMage,
      warlock: AWarlock,
      druid: ADruid,
      shaman: AShaman
    },
    horde: {
      warrior: HWarrior,
      hunter: HHunter,
      rogue: HRogue,
      paladin: HPaladin,
      priest: HPriest,
      mage: HMage,
      warlock: HWarlock,
      druid: HDruid,
      shaman: HShaman
    }
  }

  return (
    <div className="step step-character">
      <p>Choose your character</p>

      <div>
        {Object.keys(classes).map((faction) => (
          <div key={faction}>
            {Object.keys(classes[faction]).map((c) => {
              let tmpCharacter = {
                faction: faction, 
                class: c, 
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
