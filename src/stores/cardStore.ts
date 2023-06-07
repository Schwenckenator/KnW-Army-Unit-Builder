import { writable } from 'svelte/store';

export type unitStats = {
    unitName: string
    commander: string
    traits: string[]
    size: string
    ancestry: string
    unitType: string
    equipment: string
    experience: string
    attacksNo: string
    damage: string
    attack: string
    defence: string
    power: string
    toughness: string
    morale: string
    command: string
    tier: string
}

const initCard = {
    unitName: "",
    commander: "",
    traits: ["", "", "", ""],
    size: "6",
    ancestry: "",
    unitType: "",
    equipment: "",
    experience: "",
    attacksNo: "1",
    damage: "1",
    attack: "",
    defence: "",
    power: "",
    toughness: "",
    morale: "",
    command: "",
    tier: "",
}

export const card = writable(initCard);
