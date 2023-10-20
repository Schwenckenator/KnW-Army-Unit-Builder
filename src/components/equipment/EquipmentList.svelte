<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import { equipment } from '../../stores/equipmentStore';
	import TextInput from '../inputs/TextInput.svelte';
	import DeleteItemButton from '../inputs/DeleteItemButton.svelte';
	import DragHandle from '../DragHandle.svelte';

	function handleDelete(event: CustomEvent<{ id: string }>) {
		equipment.delete(event.detail.id);
	}
	function handleAddNew() {
		equipment.addNew();
	}

	const flipDurationMs = 150;

	let dragDisabled = true;

	function startDrag(e: any) {
		e.preventDefault();
		dragDisabled = false;
	}
	function considerDrag(e: any) {
		$equipment = e.detail.items;
	}
	function finishDrag(e: any) {
		$equipment = e.detail.items;
		dragDisabled = true;
	}
</script>

<ul
	use:dndzone={{ items: $equipment, flipDurationMs, dragDisabled }}
	on:consider={considerDrag}
	on:finalize={finishDrag}
>
	{#each $equipment as equip (equip.id)}
		<li animate:flip={{ duration: flipDurationMs }}>
			<div class="hbox">
				<DragHandle on:mousedown={startDrag} on:touchstart={startDrag} {dragDisabled} />
				<TextInput label="Name:" bind:value={equip.name} />
				<DeleteItemButton id={equip.id} on:delete={handleDelete} />
			</div>
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
	.hbox {
		display: flex;
		gap: 5px;
		align-items: center;
	}
	.handle {
	}
</style>
