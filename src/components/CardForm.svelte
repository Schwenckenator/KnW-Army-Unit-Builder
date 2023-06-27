<script lang="ts">
	import { card } from '../stores/cardStore';
	import Select from './inputs/Select.svelte';
	import TextInput from './inputs/TextInput.svelte';
	import AncestrySelect from './ancestries/AncestrySelect.svelte';
	import ExperienceSelect from './experience/ExperienceSelect.svelte';
	import { equipment } from '../stores/equipmentStore';

	const equipmentList = $equipment.map((equip) => ({
		name: equip.name,
		value: equip.id,
	}));

	const unitTypeList = [
		{ name: 'Levies', value: { name: 'Infantry', icon: 'icons/levies.svg' } },
		{ name: 'Infantry', value: { name: 'Infantry', icon: 'icons/infantry.svg' } },
		{ name: 'Artillery', value: { name: 'Artillery', icon: 'icons/artillery.svg' } },
		{ name: 'Siege Engine', value: { name: 'Artillery', icon: 'icons/siege-weapon.svg' } },
		{ name: 'Cavalry', value: { name: 'Cavalry', icon: 'icons/cavalry.svg' } },
		{ name: 'Aerial', value: { name: 'Aerial', icon: 'icons/infantry.svg' } },
	];
</script>

<div>
	<form>
		<TextInput label="Unit Name" bind:value={$card.unitName} />
		<TextInput label="Commander" bind:value={$card.commander} />
		<TextInput label="Trait 1" bind:value={$card.traits[0]} />
		<TextInput label="Trait 2" bind:value={$card.traits[1]} />
		<TextInput label="Trait 3" bind:value={$card.traits[2]} />
		<TextInput label="Trait 4" bind:value={$card.traits[3]} />
		<TextInput label="Number of Attacks" bind:value={$card.attacksNo} />
		<TextInput label="Damage" bind:value={$card.damage} />
		<TextInput label="Size" bind:value={$card.size} />
		<!-- <Select label="Experience" bind:value={$card.experience} options={experienceList} /> -->
		<ExperienceSelect bind:experienceId={$card.experience} />
		<Select label="Equipment" bind:value={$card.equipment} options={equipmentList} />
		<!-- <Select label="Ancestry" bind:value={$card.ancestry} options={$ancestries} /> -->
		<AncestrySelect bind:ancestryId={$card.ancestry} />
		<Select label="Unit Type" bind:value={$card.unitType} options={unitTypeList} />
		<TextInput label="Tier" bind:value={$card.tier} />
		<TextInput label="Attack" bind:value={$card.attack} />
		<TextInput label="Defence" bind:value={$card.defence} />
		<TextInput label="Power" bind:value={$card.power} />
		<TextInput label="Toughness" bind:value={$card.toughness} />
		<TextInput label="Morale" bind:value={$card.morale} />
		<TextInput label="Command" bind:value={$card.command} />
	</form>
</div>
