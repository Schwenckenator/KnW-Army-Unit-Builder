<script lang="ts">
	import { onMount } from 'svelte';
	import {
		bonuses,
		initEquipmentBonus,
		initExperienceBonus,
		type IExperienceBonusMap,
		type IEquipmentBonusMap,
	} from '../../stores/bonusesStore';
	import { experienceLevels } from '../../stores/experienceStore';
	import ExperienceUpgradeTable from './ExperienceUpgradeTable.svelte';
	import { equipment } from '../../stores/equipmentStore';
	import EquipmentUpgradeTable from './EquipmentUpgradeTable.svelte';

	console.log('On upgrade page');
	// Add an entry for each experience type
	const newExperienceBonuses: IExperienceBonusMap = {
		infantry: {},
		cavalry: {},
		artillery: {},
	};
	for (let exp of $experienceLevels) {
		newExperienceBonuses.artillery[exp.id] = $bonuses.experience.artillery[exp.id] ?? {
			...initExperienceBonus,
		};
		newExperienceBonuses.cavalry[exp.id] = $bonuses.experience.cavalry[exp.id] ?? {
			...initExperienceBonus,
		};
		newExperienceBonuses.infantry[exp.id] = $bonuses.experience.infantry[exp.id] ?? {
			...initExperienceBonus,
		};
	}

	$bonuses.experience = newExperienceBonuses;

	const newEquipmentBonuses: IEquipmentBonusMap = {
		infantry: {},
		cavalry: {},
		artillery: {},
	};
	// Add an entry for each equipment type
	for (let equip of $equipment) {
		newEquipmentBonuses.artillery[equip.id] = $bonuses.equipment.artillery[equip.id] ?? {
			...initEquipmentBonus,
		};
		newEquipmentBonuses.cavalry[equip.id] = $bonuses.equipment.cavalry[equip.id] ?? {
			...initEquipmentBonus,
		};
		newEquipmentBonuses.infantry[equip.id] = $bonuses.equipment.infantry[equip.id] ?? {
			...initEquipmentBonus,
		};
	}

	$bonuses.equipment = newEquipmentBonuses;
</script>

<section>
	<!-- Infantry -->
	<ExperienceUpgradeTable unitTypeName={'Infantry'} bind:valueMap={$bonuses.experience.infantry} />
	<EquipmentUpgradeTable unitTypeName={'Infantry'} bind:valueMap={$bonuses.equipment.infantry} />

	<!-- Cavalry and Aerial -->
	<ExperienceUpgradeTable
		unitTypeName={'Cavalry and\nAerial'}
		bind:valueMap={$bonuses.experience.cavalry}
	/>
	<EquipmentUpgradeTable
		unitTypeName={'Cavalry and\nAerial'}
		bind:valueMap={$bonuses.equipment.cavalry}
	/>

	<!-- Artillery -->
	<ExperienceUpgradeTable
		unitTypeName={'Artillery'}
		bind:valueMap={$bonuses.experience.artillery}
	/>
	<EquipmentUpgradeTable unitTypeName={'Artillery'} bind:valueMap={$bonuses.equipment.artillery} />
</section>

<style>
	section {
		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: 35px;
		row-gap: 20px;
	}
</style>
