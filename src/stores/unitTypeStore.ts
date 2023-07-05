import { derived, readable, type Readable } from "svelte/store"
import type { IExperienceBonusMap } from "./bonusesStore"

export type IUnitType = {
    id: string
    name: string
    displayName: string
    icon: string
}

export type IUnitTypeMap = {
    [key: string]: IUnitType
}

export const emptyUnitType: IUnitType = {
    id: "",
    name: "",
    displayName: "",
    icon: ""
}

export const unitUpgradeTypeMap: { [key: string]: keyof IExperienceBonusMap } = {
    levies: 'infantry',
    infantry: 'infantry',
    artillery: 'artillery',
    siege: 'artillery',
    cavalry: 'cavalry',
    aerial: 'cavalry',
}

const unitTypeList: IUnitType[] = [
    { id: 'levies', name: 'Levies', displayName: 'Infantry', icon: 'icons/levies.svg' },
    { id: 'infantry', name: 'Infantry', displayName: 'Infantry', icon: 'icons/infantry.svg' },
    { id: 'artillery', name: 'Artillery', displayName: 'Artillery', icon: 'icons/artillery.svg' },
    { id: 'siege', name: 'Siege Engine', displayName: 'Artillery', icon: 'icons/siege-weapon.svg' },
    { id: 'cavalry', name: 'Cavalry', displayName: 'Cavalry', icon: 'icons/cavalry.svg' },
    { id: 'aerial', name: 'Aerial', displayName: 'Aerial', icon: 'icons/aerial.svg' },
];

export const unitTypes = readable<IUnitType[]>(unitTypeList)

export const unitTypeMap: Readable<IUnitTypeMap> = derived(
    unitTypes,
    $unitTypes => $unitTypes.reduce(
        (prev, current) => ({
            ...prev,
            [current.id]: current,
        }), {}
    )
)
