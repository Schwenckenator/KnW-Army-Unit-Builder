import { writable } from 'svelte/store';
import { initUnit, type IUnit } from './unitStore';

// export type IUnitStats = {
//     unitName: string
//     commander: string
//     traits: string[]
//     size: string
//     ancestry: string
//     unitType: string
//     equipment: string
//     experience: string
//     attacksNo: string
//     damage: string
//     attack: string
//     defence: string
//     power: string
//     toughness: string
//     morale: string
//     command: string
//     tier: string
// }

// const initCard: IUnitStats = {
//     unitName: "",
//     commander: "",
//     traits: ["", "", "", ""],
//     size: "6",
//     ancestry: "",
//     unitType: "",
//     equipment: "",
//     experience: "",
//     attacksNo: "1",
//     damage: "1",
//     attack: "0",
//     defence: "10",
//     power: "0",
//     toughness: "10",
//     morale: "0",
//     command: "0",
//     tier: "I",
// }

// export const card = writable(initCard);
const local = localStorage.getItem('card')
const loaded = local ? JSON.parse(local) : initUnit

export const card = writable<IUnit>(loaded)

card.subscribe((value) => localStorage.card = JSON.stringify(value))
