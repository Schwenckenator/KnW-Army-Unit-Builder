<script lang="ts">
	import { goto } from '$app/navigation';
	import { card } from '../stores/cardStore';
	import { initUnit, unitMap } from '../stores/unitStore';
	import UnitGrid from './units/UnitGrid.svelte';

	function editUnit(id?: string, isCopy?: boolean) {
		// Put values into card store
		if (id) {
			// If copying, don't pass ID
			if (isCopy) {
				$card = { ...$unitMap[id], id: '' };
			} else {
				$card = { ...$unitMap[id] };
			}
		} else {
			// If no id, make a completely new unit
			$card = { ...initUnit };
		}
		// Open card screen
		goto('/card');
	}
</script>

<div>
	<button on:click={() => editUnit()}>Create New Unit</button>
	<UnitGrid {editUnit} />
</div>

<style>
	button {
		margin-bottom: 12px;
	}
</style>
