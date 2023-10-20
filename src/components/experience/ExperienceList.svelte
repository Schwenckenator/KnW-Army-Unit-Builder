<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import { experienceLevels } from '../../stores/experienceStore';
	import ExperienceItem from './ExperienceItem.svelte';

	function handleDelete(event: CustomEvent<{ id: string }>) {
		experienceLevels.delete(event.detail.id);
	}
	function handleAddNew() {
		experienceLevels.addNew();
	}

	const flipDurationMs = 150;

	let dragDisabled = true;

	function startDrag(e: any) {
		e.preventDefault();
		dragDisabled = false;
	}
	function considerDrag(e: any) {
		$experienceLevels = e.detail.items;
	}
	function finishDrag(e: any) {
		$experienceLevels = e.detail.items;
		dragDisabled = true;
	}
</script>

<ul
	use:dndzone={{ items: $experienceLevels, flipDurationMs, dragDisabled }}
	on:consider={considerDrag}
	on:finalize={finishDrag}
>
	{#each $experienceLevels as experience (experience.id)}
		<li animate:flip={{ duration: flipDurationMs }}>
			<ExperienceItem
				bind:experience
				on:delete={handleDelete}
				on:mousedown={startDrag}
				on:touchstart={startDrag}
				{dragDisabled}
			/>
		</li>
	{/each}
</ul>
<button on:click={handleAddNew}>+ Add New</button>

<style>
	ul {
		list-style-type: none;
	}
	li {
		height: 40px;
	}
</style>
