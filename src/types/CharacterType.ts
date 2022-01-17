/*
TODO: mybe delete
type TFaction = '' | 'alliance' | 'horde';
type TClass = '' | 'warrior' | 'rogue' | 'hunter' | 'paladin' | 'warlock' | 'priest' | 'mage' | 'druid' | 'shaman';
type TSpecies = '' | 'human' | 'dwarf' | 'nightelf' | 'gnome' | 'draenei' | 'orc' | 'forsaken' | 'tauren' | 'troll' | 'bloodelf';*/

type TCharacter = {
  name: string,
  faction: string,
  class: string,
  species: string,
  img: any,
  alt: string
};