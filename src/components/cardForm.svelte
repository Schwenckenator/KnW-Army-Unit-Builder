<script lang="ts">
	import { card } from '../stores/cardStore';
	import TextInput from './inputs/textInput.svelte';
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
		<TextInput label="Experience" bind:value={$card.experience} />
		<TextInput label="Equipment" bind:value={$card.equipment} />
		<TextInput label="Ancestry" bind:value={$card.ancestry} />
		<TextInput label="Unit Type" bind:value={$card.unitType} />
		<TextInput label="Tier" bind:value={$card.tier} />
		<TextInput label="Attack" bind:value={$card.attack} />
		<TextInput label="Defence" bind:value={$card.defence} />
		<TextInput label="Power" bind:value={$card.power} />
		<TextInput label="Toughness" bind:value={$card.toughness} />
		<TextInput label="Morale" bind:value={$card.morale} />
		<TextInput label="Command" bind:value={$card.command} />
	</form>
</div>
