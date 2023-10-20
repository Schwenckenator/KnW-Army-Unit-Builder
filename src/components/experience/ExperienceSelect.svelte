<script lang="ts">
	import { experienceLevels } from '../../stores/experienceStore';
	import Select from '../inputs/Select.svelte';

	export let experienceId: string;

	const experienceList = $experienceLevels.map((experience) => ({
		name: experience.name,
		value: experience.id,
	}));
</script>

<Select label="Experience" bind:value={experienceId} options={experienceList} />
