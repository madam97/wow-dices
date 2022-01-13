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

/** Faction-class-image connections */
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
};

/** The class-species connections */
const species = {
  alliance: {
    paladin: 'human',
    warlock: 'human',
    hunter: 'dwarf',
    priest: 'dwarf',
    druid: 'nightelf',
    warrior: 'nightelf',
    mage: 'gnome',
    rogue: 'gnome',
    shaman: 'draenei'
  },
  horde: {
    warrior: 'orc',
    shaman: 'orc',
    warlock: 'forsaken',
    mage: 'forsaken',
    hunter: 'tauren',
    druid: 'tauren',
    rogue: 'troll',
    priest: 'troll',
    paladin: 'bloodelf'
  }
};

/** Character texts grouped by factions, classes and species */
const texts = {
  faction: {
    alliance: [
      'For the Alliance!',
    ],
    horde: [
      'For the Horde!',
    ]
  },

  class: {
    warrior: [
      'For honor.',
      'Taste my blade!'
    ],
    hunter: [
      'Fire!',
      'One shot, one kill.'
    ],
    rogue: [
      'My blade thirsts!',
      'Say your prayers!'
    ],
    paladin: [
      'Light give me strength!',
      'Justice will be served!'
    ],
    priest: [
      'Light give me hope!',
      'Begone, spawn of darkness!'
    ],
    mage: [
      'Infury frostaris sedaa!',
      'For Dalaran!'
    ],
    warlock: [
      'They shall burn!',
      'Your soul shall burn.'
    ],
    druid: [
      'For the trees.',
      'Feel nature\'s wrath!'
    ],
    shaman: [
      'Lightning!',
      'Feel the ground tremble!'
    ]
  },

  species: {
    human: [
      'For the king!',
      'Die you monster!'
    ],
    dwarf: [
      'For Ironforge!',
      'Death comes for ye!'
    ],
    nightelf: [
      'By the light of the moon!',
      'Fear the night!'
    ],
    gnome: [
      'For Gnomeragan!',
      'Watch yourself!'
    ],
    draenei: [
      'For Draenor!',
      'Kosh\'agal!'
    ],
    orc: [
      'Lok\'tar!',
      'For Warchief Thrall!'
    ],
    troll: [
      'Taz\'dingo!',
      'Killin\' be easy.'
    ],
    forsaken: [
      'Let life cease!',
      'Feel my pain!'
    ],
    tauren: [
      'For the tribes!',
      'Whuuuooooo!'
    ],
    bloodelf: [
      'For Quel\'thalas!',
      'Glory, to the blood elves.'
    ]
  }
};

export { classes, species, texts };