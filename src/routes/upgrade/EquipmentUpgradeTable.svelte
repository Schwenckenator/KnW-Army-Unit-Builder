<script lang="ts">
	import NumberInput from '../../components/inputs/NumberInput.svelte';
	import type { IEquipmentBonus } from '../../stores/bonusesStore';
	import { equipmentMap } from '../../stores/equipmentStore';

	export let unitTypeName: string;
	export let valueMap: { [key: string]: IEquipmentBonus };

	type IEquipmentValue = IEquipmentBonus & {
		key: string;
		equipment: string;
	};

	const columns: { field: keyof IEquipmentBonus | 'equipment'; label: string }[] = [
		{ field: 'equipment', label: `${unitTypeName} Equipment` },
		{ field: 'power', label: 'Power' },
		{ field: 'toughness', label: 'Toughness' },
		{ field: 'damage', label: 'Damage' },
	];

	const values: IEquipmentValue[] = Object.keys(valueMap).map((key) => ({
		...valueMap[key],
		equipment: $equipmentMap[key]?.name ?? '',
		key: key,
	}));

	const setValue = (expKey: string, field: keyof IEquipmentBonus) => (e: Event) => {
		const target = e.currentTarget as HTMLInputElement;
		const value = target.value;

		if (Number.isNaN(Number(value))) return;

		valueMap[expKey][field] = Number(value);
	};
</script>

<div class="grid" style:grid-template-columns="repeat({columns.length}, auto)">
	<!-- Head -->
	{#each columns as column}
		<div class="cell head border-bottom" class:border-right={column.field === 'equipment'}>
			<div>
				{column.label}
			</div>
		</div>
	{/each}
	<!-- Body -->
	{#each values as value}
		{#each columns as column}
			{#if column.field === 'equipment'}
				<div class="cell border-right">
					<span>{value[column.field]}</span>
				</div>
			{:else}
				<div class="cell">
					<NumberInput value={value[column.field]} on:change={setValue(value.key, column.field)} />
				</div>
			{/if}
		{/each}
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: auto;
		border-top: solid black 2px;
		border-bottom: solid black 2px;
	}
	.head {
		display: flex;
		align-items: end;
	}
	.cell {
		padding: 4px;
		white-space: pre-line;
	}
	.border-bottom {
		border-bottom: solid black 2px;
	}
	.border-right {
		border-right: solid black 2px;
	}
</style>
