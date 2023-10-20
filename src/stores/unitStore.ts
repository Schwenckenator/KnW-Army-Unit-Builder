import { writable, type Readable } from "svelte/store"
import { createMapDerivedStore, generateId, saveToLocal } from "../utils/listStore"

export type IUnit = {
    id: string
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
export type IUnitMap = {
    [id: string]: IUnit
}

export const initUnit: IUnit = {
    id: '',
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
    attack: "0",
    defence: "10",
    power: "0",
    toughness: "10",
    morale: "0",
    command: "0",
    tier: "I",
}

const key = 'unit'

function createStore(key: string) {

    const local = localStorage.getItem(key)
    const loaded = local ? JSON.parse(local) : []

    const { subscribe, set, update } = writable<IUnit[]>(loaded)

    return {
        subscribe,
        set,
        update,
        save: (unit: IUnit) => update(items => {
            const index = items.findIndex(x => x.id === unit.id)
            if (index < 0) return [...items] // Not found, don't change anything
            return [
                ...items.slice(0, index),
                { ...unit },
                ...items.slice(index + 1)
            ]
        }),
        saveNew: (newUnit: IUnit) => update(items => [...items, { ...newUnit, id: generateId() }]),
        saveNewAt: (newUnit: IUnit, index: number) => update(
            items => [
                ...items.slice(0, index),
                { ...newUnit, id: generateId() },
                ...items.slice(index),
            ]
        ),
        delete: (id: string) => update(items => [...items.filter(x => x.id !== id)])
    }
}

export const units = createStore(key)

units.subscribe(saveToLocal(key))

export const unitMap: Readable<IUnitMap> = createMapDerivedStore(units)
