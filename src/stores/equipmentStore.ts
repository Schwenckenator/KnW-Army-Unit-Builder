
import type { Readable } from "svelte/store";
import { createListStore, createMapDerivedStore, saveToLocal } from "../utils/listStore";

export type IEquipment = {
    id: string
    name: string
}
export type IEquipmentMap = {
    [id: string]: IEquipment
}

const initEquipment = {
    id: '',
    name: '',
}

const key = 'equipment'

export const equipment = createListStore<IEquipment>(key, initEquipment)

equipment.subscribe(saveToLocal(key))

export const equipmentMap: Readable<IEquipmentMap> = createMapDerivedStore(equipment)
