import { writable, type Readable } from "svelte/store";
import { createListStore, createMapDerivedStore, saveToLocal } from "../utils/listStore";
import { card } from "./cardStore";
import { equipment } from "./equipmentStore";

export type IExperienceBonus = {
    attacksNo: number,
    attack: number,
    defence: number,
    morale: number,
    command: number,
}
export const initExperienceBonus: IExperienceBonus = {
    attacksNo: 0,
    attack: 0,
    defence: 0,
    morale: 0,
    command: 0,
}

export type IEquipmentBonus = {
    power: number,
    toughness: number,
    damage: number,
}

export const initEquipmentBonus: IEquipmentBonus = {
    power: 0,
    toughness: 0,
    damage: 0
}

export type IExperienceBonusMap = {
    infantry: {
        [key: string]: IExperienceBonus
    }
    cavalry: {
        [key: string]: IExperienceBonus
    }
    artillery: {
        [key: string]: IExperienceBonus
    }
}

export type IEquipmentBonusMap = {
    infantry: {
        [key: string]: IEquipmentBonus
    }
    cavalry: {
        [key: string]: IEquipmentBonus
    }
    artillery: {
        [key: string]: IEquipmentBonus
    }
}

export type IBonusMap = {
    experience: IExperienceBonusMap,
    equipment: IEquipmentBonusMap
}

const initValue: IBonusMap = {
    experience: {
        infantry: {},
        cavalry: {},
        artillery: {},
    },
    equipment: {
        infantry: {},
        cavalry: {},
        artillery: {},
    },
}

const key = 'bonuses'
const local = localStorage.getItem(key)
const loaded = local ? JSON.parse(local) : { ...initValue }

export const bonuses = writable<IBonusMap>(loaded)

bonuses.subscribe(saveToLocal(key))

