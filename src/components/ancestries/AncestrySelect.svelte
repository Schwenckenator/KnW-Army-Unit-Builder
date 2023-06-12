<script lang="ts">
	import { ancestries } from '../../stores/ancestriesStore';
	import Select from '../inputs/Select.svelte';

	export let ancestryId: string;

	const ancestryList = $ancestries.map((ancestry) => ({ name: ancestry.name, value: ancestry.id }));
</script>

<Select label="Ancestry" bind:value={ancestryId} options={ancestryList} />
