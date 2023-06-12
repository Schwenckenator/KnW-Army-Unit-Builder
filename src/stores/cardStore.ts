import { writable } from 'svelte/store';

export type IUnitStats = {
    unitName: string
    commander: string
    traits: string[]
    size: string
    ancestry: string
    unitType: {
        name: string,
        icon: string,
    }
    equipment: {
        name: string,
    }
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

const initCard: IUnitStats = {
    unitName: "",
    commander: "",
    traits: ["", "", "", ""],
    size: "6",
    ancestry: "",
    unitType: {
        name: "",
        icon: "",
    },
    equipment: {
        name: "",
    },
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

// export const card = writable(initCard);
const local = localStorage.getItem('card')
const loaded = local ? JSON.parse(local) : initCard

export const card = writable<IUnitStats>(loaded)

card.subscribe((value) => localStorage.card = JSON.stringify(value))
