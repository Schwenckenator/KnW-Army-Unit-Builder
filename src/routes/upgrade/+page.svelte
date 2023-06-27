<script>
	import { onMount } from 'svelte';
	import { bonuses, initEquipmentBonus, initExperienceBonus } from '../../stores/bonusesStore';
	import { experienceLevels, experienceMap } from '../../stores/experienceStore';
	import ExperienceUpgradeTable from './ExperienceUpgradeTable.svelte';
	import { equipment, equipmentMap } from '../../stores/equipmentStore';
	import EquipmentUpgradeTable from './EquipmentUpgradeTable.svelte';

	console.log('on upgrade page');

	onMount(() => {
		// Add an entry for each experience type
		for (let exp of $experienceLevels) {
			$bonuses.experience.artillery[exp.id] = $bonuses.experience.artillery[exp.id] ?? {
				...initExperienceBonus,
			};
			$bonuses.experience.cavalry[exp.id] = $bonuses.experience.cavalry[exp.id] ?? {
				...initExperienceBonus,
			};
			$bonuses.experience.infantry[exp.id] = $bonuses.experience.infantry[exp.id] ?? {
				...initExperienceBonus,
			};
		}

		// Delete removed bonuses
		for (let exp of Object.keys($bonuses.experience.infantry)) {
			// TODO: Broken
			if (!$experienceMap.hasOwnProperty(exp)) {
				delete $bonuses.experience.artillery[exp];
				delete $bonuses.experience.cavalry[exp];
				delete $bonuses.experience.infantry[exp];
			}
		}

		// Add an entry for each equipment type
		for (let equip of $equipment) {
			$bonuses.equipment.artillery[equip.id] = $bonuses.equipment.artillery[equip.id] ?? {
				...initEquipmentBonus,
			};
			$bonuses.equipment.cavalry[equip.id] = $bonuses.equipment.cavalry[equip.id] ?? {
				...initEquipmentBonus,
			};
			$bonuses.equipment.infantry[equip.id] = $bonuses.equipment.infantry[equip.id] ?? {
				...initEquipmentBonus,
			};
		}

		// Delete removed bonuses
		for (let equip of Object.keys($bonuses.equipment.infantry)) {
			// TODO: Broken
			if (!$equipmentMap.hasOwnProperty(equip)) {
				delete $bonuses.equipment.artillery[equip];
				delete $bonuses.equipment.cavalry[equip];
				delete $bonuses.equipment.infantry[equip];
			}
		}
	});
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
