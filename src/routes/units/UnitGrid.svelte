<script lang="ts">
	import { goto } from '$app/navigation';
	import { ancestriesMap } from '../../stores/ancestriesStore';
	import { bonuses, type IEquipmentBonus, type IExperienceBonus } from '../../stores/bonusesStore';
	import { card } from '../../stores/cardStore';
	import { equipmentMap, equipment } from '../../stores/equipmentStore';
	import { experienceMap, experienceLevels } from '../../stores/experienceStore';
	import { units, type IUnit, unitMap, initUnit } from '../../stores/unitStore';
	import { unitTypeMap, unitUpgradeTypeMap } from '../../stores/unitTypeStore';

	export let editUnit: (id?: string, isCopy?: boolean) => void;

	const columns: { field: keyof IUnit | 'delete'; label: string }[] = [
		{ field: 'unitName', label: 'Unit' },
		{ field: 'commander', label: 'Commander' },
		{ field: 'ancestry', label: 'Ancestry' },
		{ field: 'unitType', label: 'Type' },
		{ field: 'experience', label: 'Experience' },
		{ field: 'equipment', label: 'Equipment' },
		{ field: 'delete', label: '' },
	];

	$: values = $units.map((unit) => {
		return {
			...unit,
			experience: $experienceMap[unit.experience].name,
			equipment: $equipmentMap[unit.equipment].name,
			unitType: $unitTypeMap[unit.unitType].displayName,
			ancestry: $ancestriesMap[unit.ancestry].name,
		};
	});

	function upgradeExperience(id: string, index: number) {
		const oldUnit: IUnit = { ...$unitMap[id] };

		const prevExperience = oldUnit.experience;

		// Find the current experience index
		const expIndex = $experienceLevels.findIndex((exp) => exp.id === oldUnit.experience);
		// Add 1 to index
		const newExpId = $experienceLevels[expIndex + 1].id;
		// Set value

		function getBonusDifference(prevExp: string, newExp: string): IExperienceBonus {
			const unitBonuses = $bonuses.experience[unitUpgradeType];

			return {
				attacksNo: unitBonuses[newExp].attacksNo - unitBonuses[prevExp].attacksNo,
				attack: unitBonuses[newExp].attack - unitBonuses[prevExp].attack,
				defence: unitBonuses[newExp].defence - unitBonuses[prevExp].defence,
				morale: unitBonuses[newExp].morale - unitBonuses[prevExp].morale,
				command: unitBonuses[newExp].command - unitBonuses[prevExp].command,
			};
		}

		// Get unit type
		const unitUpgradeType = unitUpgradeTypeMap[oldUnit.unitType];

		const newBonuses: IExperienceBonus = getBonusDifference(prevExperience, newExpId);

		const newUnit: IUnit = {
			...oldUnit,
			experience: newExpId,
			attacksNo: (+oldUnit.attacksNo + +newBonuses.attacksNo).toString(),
			attack: (+oldUnit.attack + +newBonuses.attack).toString(),
			defence: (+oldUnit.defence + +newBonuses.defence).toString(),
			morale: (+oldUnit.morale + +newBonuses.morale).toString(),
			command: (+oldUnit.command + +newBonuses.command).toString(),
		};

		units.saveNewAt(newUnit, index + 1);
	}

	function upgradeEquipment(id: string, index: number) {
		const oldUnit: IUnit = { ...$unitMap[id] };

		const prevEquipment = oldUnit.equipment;

		// Find the current equipment index
		const equipIndex = $equipment.findIndex((equip) => equip.id === oldUnit.equipment);
		// Add 1 to index
		const newEquipId = $equipment[equipIndex + 1].id;
		// Set value

		function getBonusDifference(prevEquip: string, newEquip: string): IEquipmentBonus {
			const unitBonuses = $bonuses.equipment[unitUpgradeType];

			return {
				power: unitBonuses[newEquip].power - unitBonuses[prevEquip].power,
				toughness: unitBonuses[newEquip].toughness - unitBonuses[prevEquip].toughness,
				damage: unitBonuses[newEquip].damage - unitBonuses[prevEquip].damage,
			};
		}

		// Get unit type
		const unitUpgradeType = unitUpgradeTypeMap[oldUnit.unitType];

		const newBonuses: IEquipmentBonus = getBonusDifference(prevEquipment, newEquipId);

		const newUnit: IUnit = {
			...oldUnit,
			equipment: newEquipId,
			power: (+oldUnit.power + +newBonuses.power).toString(),
			toughness: (+oldUnit.toughness + +newBonuses.toughness).toString(),
			damage: (+oldUnit.damage + +newBonuses.damage).toString(),
		};

		units.saveNewAt(newUnit, index + 1);
	}

	function deleteUnit(id: string) {
		units.delete(id);
	}
</script>

<div class="grid" style:grid-template-columns="repeat(7, auto)">
	<!-- Head -->
	{#each columns as column}
		<div class="cell head border-bottom">
			{column.label}
		</div>
	{/each}
	<!-- Body -->
	{#each values as value, index}
		<div class="cell pd-r">
			<button on:click={() => editUnit(value.id)}>Edit</button>
			<button on:click={() => editUnit(value.id, true)}>Edit Copy</button>
			{value.unitName}
		</div>
		<div class="cell">
			{value.commander}
		</div>
		<div class="cell">
			{value.ancestry}
		</div>
		<div class="cell">
			{value.unitType}
		</div>
		<div class="cell">
			{value.experience}
			<button on:click={() => upgradeExperience(value.id, index)}>Upgrade</button>
		</div>
		<div class="cell">
			{value.equipment}
			<button on:click={() => upgradeEquipment(value.id, index)}>Upgrade</button>
		</div>

		<div class="cell">
			<button on:click={() => deleteUnit(value.id)}>Delete</button>
		</div>
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
		min-width: 65px;
	}
	.pd-r {
		padding-right: 20px;
	}
	.border-bottom {
		border-bottom: solid black 2px;
	}
	.border-right {
		border-right: dashed black 1px;
	}
</style>
