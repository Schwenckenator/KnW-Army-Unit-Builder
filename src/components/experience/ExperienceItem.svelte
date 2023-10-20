<script lang="ts">
	import type { IExperience } from '../../stores/experienceStore';
	import TextInput from '../inputs/TextInput.svelte';
	import Select, { type ISelectOption } from '../inputs/Select.svelte';
	import DeleteItemButton from '../inputs/DeleteItemButton.svelte';
	import DragHandle from '../DragHandle.svelte';

	export let experience: IExperience;
	export let dragDisabled: boolean;

	const starsNumOptions: ISelectOption[] = [
		{ name: '0', value: 0 },
		{ name: '1', value: 1 },
		{ name: '2', value: 2 },
		{ name: '3', value: 3 },
	];
</script>

<div class="hbox">
	<DragHandle on:mousedown on:touchstart {dragDisabled} />
	<TextInput label="Name:" bind:value={experience.name} />
	<Select label="Number of Stars:" options={starsNumOptions} bind:value={experience.starsNum} />
	<DeleteItemButton id={experience.id} on:delete />
</div>

<style>
	.hbox {
		display: flex;
		gap: 5px;
		align-items: center;
	}
</style>
