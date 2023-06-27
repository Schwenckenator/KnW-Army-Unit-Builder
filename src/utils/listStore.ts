import { writable, derived, type Readable, type Writable } from 'svelte/store';

type IListObject = { id: string }
type IMapObject = {
    [key: string]: IListObject
}

export function createListStore<T extends IListObject>(key: string, initValue: T) {

    const local = localStorage.getItem(key)
    const loaded = local ? JSON.parse(local) : [{ ...initValue, id: generateId() }]

    const { subscribe, set, update } = writable<T[]>(loaded)

    return {
        subscribe,
        set,
        update,
        addNew: () => update(items => [...items, { ...initValue, id: generateId() }]),
        delete: (id: string) => update(items => [...items.filter(x => x.id !== id)])
    }
}

function generateId() {
    return Math.random().toString(36).slice(2)
}

export function saveToLocal(key: string) {
    return (value: any) => localStorage[key] = JSON.stringify(value)
}

export function createMapDerivedStore(store: Writable<any[]>): Readable<any> {
    return derived(
        store,
        $store => $store.reduce(
            (prev: IMapObject, current: any) => ({
                ...prev,
                [current.id]: current,
            }), {}
        )
    )
}
