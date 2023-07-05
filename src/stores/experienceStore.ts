import { writable, derived, type Readable } from 'svelte/store';

export type IExperience = {
    id: string,
    name: string,
    starsNum: number,
}

export type IExperienceMap = {
    [key: string]: IExperience
}

export const initExperience: IExperience = {
    id: generateId(),
    name: "",
    starsNum: 0,
}

const initExperienceLevels: IExperience[] = [initExperience]

const local = localStorage.getItem('experience')
const loaded = local ? JSON.parse(local) : initExperienceLevels

function createStore() {
    const { subscribe, set, update } = writable<IExperience[]>(loaded)

    return {
        subscribe,
        set,
        update,
        addNew: () => update(items => [...items, { ...initExperience, id: generateId() }]),
        delete: (id: string) => update(items => [...items.filter(x => x.id !== id)])
    }
}

function generateId() {
    return Math.random().toString(36).slice(2)
}

export const experienceLevels = createStore()

experienceLevels.subscribe((value) => localStorage.experience = JSON.stringify(value))

export const experienceMap: Readable<IExperienceMap> = derived(
    experienceLevels,
    $experienceLevels => $experienceLevels.reduce(
        (prev, current) => ({
            ...prev,
            [current.id]: current,
        }), {}
    )
)
