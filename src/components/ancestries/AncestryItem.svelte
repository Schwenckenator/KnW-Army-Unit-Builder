<script lang="ts">
	import type { IAncestry } from '../../stores/ancestriesStore';
	import TextInput from '../inputs/TextInput.svelte';
	import AncestryIconSelect from './AncestryIconSelect.svelte';
	import ColourInput from '../inputs/ColourInput.svelte';
	import DeleteItemButton from '../inputs/DeleteItemButton.svelte';

	export let ancestry: IAncestry;
</script>

<div class="hbox">
	<!-- Name Input -->
	<TextInput label="Name:" bind:value={ancestry.name} />
	<!-- Icon Select -->
	<AncestryIconSelect bind:value={ancestry.icon} />
	<!-- Colour Select -->
	<ColourInput label="Top" bind:value={ancestry.colour.top} />
	<ColourInput label="Bottom" bind:value={ancestry.colour.bottom} />
	<!-- Delete Button -->
	<DeleteItemButton id={ancestry.id} on:delete />
</div>

<style>
	.hbox {
		display: flex;
		gap: 5px;
		align-items: center;
	}
</style>
