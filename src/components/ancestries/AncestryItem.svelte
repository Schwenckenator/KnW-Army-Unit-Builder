<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { IAncestry } from '../../stores/ancestriesStore';
	import TextInput from '../inputs/TextInput.svelte';
	import AncestryIconSelect from './AncestryIconSelect.svelte';
	import ColourInput from '../inputs/ColourInput.svelte';

	export let ancestry: IAncestry;

	type IEvents = {
		delete: { id: string };
	};

	const dispatch = createEventDispatcher<IEvents>();

	function deleteMe() {
		dispatch('delete', {
			id: ancestry.id,
		});
	}
</script>

<div class="hbox">
	<!-- Name Input -->
	<TextInput label="Name:" bind:value={ancestry.name} />
	<!-- Icon Select -->
	<!-- <div>{ancestry.icon}</div> -->
	<AncestryIconSelect bind:value={ancestry.icon} />
	<!-- Colour Select -->
	<ColourInput label="Top" bind:value={ancestry.colour.top} />
	<ColourInput label="Bottom" bind:value={ancestry.colour.bottom} />
	<button on:click={deleteMe}>Delete</button>
</div>

<style>
	.hbox {
		display: flex;
		gap: 5px;
		align-items: center;
	}
</style>
