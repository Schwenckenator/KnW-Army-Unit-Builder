<script lang="ts">
	import Tickbox from '../../components/inputs/Tickbox.svelte';
	import { ancestries } from '../../stores/ancestriesStore';
	import { bonuses } from '../../stores/bonusesStore';
	import { equipment } from '../../stores/equipmentStore';
	import { experienceLevels } from '../../stores/experienceStore';
	import { units } from '../../stores/unitStore';

	let isExportData = {
		ancestries: true,
		experience: true,
		equipment: true,
		upgrade: true,
		units: true,
	};

	let isShowExportSuccess = false;
	let isShowImportSuccess = false;

	let isShowImportWarning = false;

	$: isShowExportWarning =
		!(isExportData.ancestries && isExportData.experience && isExportData.equipment) &&
		(isExportData.upgrade || isExportData.units);

	$: isDataToExport =
		isExportData.ancestries ||
		isExportData.experience ||
		isExportData.equipment ||
		isExportData.upgrade ||
		isExportData.units;

	let isClearDataBeforeImport = false;

	let importFiles: FileList;
	let importJson: any;

	async function onChangeImportFile(
		e: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		},
	) {
		console.log('On change import file');
		// Only allows 1 file
		const target = e.currentTarget as HTMLInputElement;
		const file = target.files?.[0];

		if (file == null) {
			return;
		}

		importJson = await readJsonFile(file);
		console.log(importJson);

		isShowImportWarning = checkJson(importJson);
		console.log('Is show import warning');
		console.log(isShowImportWarning);
	}

	function checkJson(json: any) {
		console.log('Check JSON');
		const newData = json;

		let overlap = false;
		if (newData.ancestries) {
			overlap = overlap || compareTwoArrays(newData.ancestries, $ancestries, 'id');
		}
		if (newData.experience) {
			overlap = overlap || compareTwoArrays(newData.experience, $experienceLevels, 'id');
		}
		if (newData.equipment) {
			overlap = overlap || compareTwoArrays(newData.equipment, $equipment, 'id');
		}
		// TODO check bonuses
		// if (newData.bonuses) {
		// 	overlap = overlap || compareTwoArrays(newData.ancestries, $ancestries, 'id');
		// }
		if (newData.units) {
			overlap = overlap || compareTwoArrays(newData.units, $units, 'id');
		}
		return overlap;
	}

	function compareTwoArrays(arr1: any[], arr2: any[], compareKey: string) {
		for (let i = 0; i < arr1.length; i++) {
			for (let j = 0; j < arr2.length; j++) {
				if (arr1[i][compareKey] === arr2[j][compareKey]) {
					return true;
				}
			}
		}
		return false;
	}

	function importData() {
		console.log('Before Import');

		console.log($ancestries);
		console.log($experienceLevels);
		console.log($equipment);
		console.log($bonuses);
		console.log($units);

		if (importJson.ancestries) {
			$ancestries = [...$ancestries, ...importJson.ancestries];
		}
		if (importJson.experience) {
			$experienceLevels = [...$experienceLevels, ...importJson.experience];
		}
		if (importJson.equipment) {
			$equipment = [...$equipment, ...importJson.equipment];
		}
		if (importJson.bonuses) {
			$bonuses = {
				experience: {
					artillery: {
						...$bonuses.experience.artillery,
						...importJson.bonuses.experience.artillery,
					},
					cavalry: {
						...$bonuses.experience.cavalry,
						...importJson.bonuses.experience.cavalry,
					},
					infantry: {
						...$bonuses.experience.infantry,
						...importJson.bonuses.experience.infantry,
					},
				},
				equipment: {
					artillery: {
						...$bonuses.equipment.artillery,
						...importJson.bonuses.equipment.artillery,
					},
					cavalry: {
						...$bonuses.equipment.cavalry,
						...importJson.bonuses.equipment.cavalry,
					},
					infantry: {
						...$bonuses.equipment.infantry,
						...importJson.bonuses.equipment.infantry,
					},
				},
			};
		}
		if (importJson.units) {
			$units = [...$units, ...importJson.units];
		}

		console.log('After Import');

		console.log($ancestries);
		console.log($experienceLevels);
		console.log($equipment);
		console.log($bonuses);
		console.log($units);

		isShowImportSuccess = true;
	}

	function readJsonFile(file: File) {
		const reader = new FileReader();
		return new Promise<any>((resolve, reject) => {
			reader.onload = () => resolve(JSON.parse(reader.result?.toString() || ''));
			reader.onerror = reject;
			reader.readAsText(file);
		});
	}

	function exportData() {
		// TODO
		console.log('EXPORT');

		if (!isDataToExport) {
			console.log('Nothing to Export');
			return;
		}

		// Create a Object from all selected stores
		const dataToExport: any = {};

		if (isExportData.ancestries) {
			dataToExport.ancestries = $ancestries;
		}
		if (isExportData.experience) {
			dataToExport.experience = $experienceLevels;
		}
		if (isExportData.equipment) {
			dataToExport.equipment = $equipment;
		}
		if (isExportData.upgrade) {
			dataToExport.upgrade = $bonuses;
		}
		if (isExportData.units) {
			dataToExport.units = $units;
		}

		const date = new Date();
		const fileName = `knw-army-builder-export-data_${date.getFullYear()}-${
			date.getMonth() + 1
		}-${date.getDate()}.json`;
		const json = JSON.stringify(dataToExport);
		const blob = new Blob([json], { type: 'text/json' });

		const a = document.createElement('a');
		a.href = window.URL.createObjectURL(blob);
		a.download = fileName;

		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);

		isShowExportSuccess = true;
	}
</script>

<section>
	<article>
		<h3>Import</h3>
		<p>Import data from a JSON file.</p>
		<form on:submit|preventDefault={importData}>
			<div class="mgB-10">
				<Tickbox label={'Delete all previous data'} bind:checked={isClearDataBeforeImport} />
			</div>
			<div class="mgB-10">
				<input
					type="file"
					bind:files={importFiles}
					accept=".json"
					on:change={async (e) => await onChangeImportFile(e)}
				/>
			</div>
			<div class="warn" class:show={isShowImportWarning}>
				<span>Warning!</span> Conflicting Ids have been found, <br />
				data will be overwritten!
			</div>
			<div class="success" class:show={isShowImportSuccess}>Import successful!</div>
			<div>
				<button class="big mgT-20">Import</button>
			</div>
		</form>
	</article>
	<article>
		<h3>Export</h3>
		<p>Export the data as a JSON file.</p>
		<form on:submit|preventDefault={exportData}>
			<div>Data to export</div>
			<Tickbox label={'Ancestries'} bind:checked={isExportData.ancestries} />
			<Tickbox label={'Experience'} bind:checked={isExportData.experience} />
			<Tickbox label={'Equipment'} bind:checked={isExportData.equipment} />
			<Tickbox label={'Upgrade Settings'} bind:checked={isExportData.upgrade} />
			<Tickbox label={'Units'} bind:checked={isExportData.units} />
			<div class="warn" class:show={isShowExportWarning}>
				<span>Warning!</span> If you have not previously imported <br />
				ancestries, experience, and equipment from <br />
				this browser, importing this file will not work properly!
			</div>
			<div class="success" class:show={isShowExportSuccess}>Export successful!</div>
			<button class="big mgT-20" disabled={!isDataToExport}>Export</button>
		</form>
	</article>
</section>

<style>
	section {
		display: flex;
		gap: 20px;
	}
	.mgB-10 {
		margin-bottom: 10px;
	}
	.mgT-20 {
		margin-top: 20px;
	}
	.big {
		font-size: 1.1rem;
	}
	.warn {
		height: 0;
		color: #ff3030;
		overflow: hidden;
	}
	.warn.show {
		height: auto;
	}
	.warn span {
		font-weight: 600;
	}
	.success {
		height: 0;
		color: #10fa30;
		overflow: hidden;
	}
	.success.show {
		height: auto;
	}
</style>
