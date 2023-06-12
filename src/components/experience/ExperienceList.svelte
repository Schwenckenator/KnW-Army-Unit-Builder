<script lang="ts">
	import { experienceLevels } from '../../stores/experienceStore';
	import ExperienceItem from './ExperienceItem.svelte';

	// $: console.log($experienceLevels);

	function handleDelete(event: CustomEvent<{ id: string }>) {
		experienceLevels.delete(event.detail.id);
	}
	function handleAddNew() {
		experienceLevels.addNew();
	}
</script>

<ul>
	{#each $experienceLevels as experience (experience.id)}
		<li>
			<ExperienceItem bind:experience on:delete={handleDelete} />
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
