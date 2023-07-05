<script lang="ts">
	import { card } from '../stores/cardStore';
	import Select from './inputs/Select.svelte';
	import TextInput from './inputs/TextInput.svelte';
	import AncestrySelect from './ancestries/AncestrySelect.svelte';
	import ExperienceSelect from './experience/ExperienceSelect.svelte';
	import { equipment } from '../stores/equipmentStore';
	import { unitTypes } from '../stores/unitTypeStore';
	import { units } from '../stores/unitStore';
	import { goto } from '$app/navigation';

	const equipmentList = $equipment.map((equip) => ({
		name: equip.name,
		value: equip.id,
	}));

	const unitTypeList = $unitTypes.map((unit) => ({
		name: unit.name,
		value: unit.id,
	}));

	const tierList = [
		{ name: 'I', value: 'I' },
		{ name: 'II', value: 'II' },
		{ name: 'III', value: 'III' },
		{ name: 'IV', value: 'IV' },
		{ name: 'V', value: 'V' },
	];

	function saveUnit() {
		if ($card.id) {
			units.save($card);
		} else {
			units.saveNew({ ...$card, id: '' });
		}
		goto('/');
	}
	function cancel() {
		goto('/');
	}
</script>

<section>
	<form on:submit|preventDefault={saveUnit}>
		<div class="hbox">
			<div class="vbox">
				<!-- Main Card -->
				<TextInput label="Unit Name" bind:value={$card.unitName} />
				<TextInput label="Commander" bind:value={$card.commander} />

				<!-- Traits -->
				<TextInput label="Trait 1" bind:value={$card.traits[0]} />
				<TextInput label="Trait 2" bind:value={$card.traits[1]} />
				<TextInput label="Trait 3" bind:value={$card.traits[2]} />
				<TextInput label="Trait 4" bind:value={$card.traits[3]} />
			</div>
			<div class="vbox">
				<!-- Attacks and Damage -->
				<TextInput label="Number of Attacks" bind:value={$card.attacksNo} />
				<TextInput label="Damage" bind:value={$card.damage} />

				<!-- Side bar -->
				<TextInput label="Size" bind:value={$card.size} />
				<ExperienceSelect bind:experienceId={$card.experience} />
				<Select label="Equipment" bind:value={$card.equipment} options={equipmentList} />
				<AncestrySelect bind:ancestryId={$card.ancestry} />
				<Select label="Unit Type" bind:value={$card.unitType} options={unitTypeList} />
			</div>
			<div class="vbox">
				<!-- Bottom Bar -->
				<Select label="Tier" bind:value={$card.tier} options={tierList} />
				<TextInput label="Attack" bind:value={$card.attack} />
				<TextInput label="Defence" bind:value={$card.defence} />
				<TextInput label="Power" bind:value={$card.power} />
				<TextInput label="Toughness" bind:value={$card.toughness} />
				<TextInput label="Morale" bind:value={$card.morale} />
				<TextInput label="Command" bind:value={$card.command} />
			</div>
		</div>

		<button type="submit">Save Unit</button>
		<button type="button" on:click={cancel}>Return without saving</button>
	</form>
</section>

<style>
	.vbox {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
	section {
		margin-bottom: 12px;
	}
</style>
