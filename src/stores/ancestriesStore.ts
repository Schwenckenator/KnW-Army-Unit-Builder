import { writable, derived, type Readable } from 'svelte/store';

export type IAncestry = {
    id: string,
    name: string,
    icon: string,
    colour: {
        top: string,
        bottom: string,
    }
}

export type IAncestryMap = {
    [key: string]: IAncestry
}

const initAncestry: IAncestry = {
    id: generateId(),
    name: "",
    icon: "",
    colour: {
        top: "#fff",
        bottom: "#fff"
    }
}

const initAncestries: IAncestry[] = [initAncestry]

const local = localStorage.getItem('ancestries')
const loaded = local ? JSON.parse(local) : initAncestries

function createStore() {
    const { subscribe, set, update } = writable<IAncestry[]>(loaded)

    return {
        subscribe,
        set,
        update,
        addNew: () => update(items => [...items, { ...initAncestry, id: generateId() }]),
        delete: (id: string) => update(items => [...items.filter(x => x.id !== id)])
    }
}

function generateId() {
    return Math.random().toString(36).slice(2)
}

export const ancestries = createStore()

ancestries.subscribe((value) => localStorage.ancestries = JSON.stringify(value))

export const ancestriesMap: Readable<IAncestryMap> = derived(
    ancestries,
    $ancestries => $ancestries.reduce(
        (prev, current) => ({
            ...prev,
            [current.id]: current,
        }), {}
    )
)
