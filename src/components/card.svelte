<script>
	import { card } from '../stores/cardStore';

	function checkStore() {
		console.log($card);
	}

	function loadFile(event) {
		const id = event.target.id;
		const image = document.getElementById(`${id}-img`);

		image.src = URL.createObjectURL(event.target.files[0]);
	}

	function setColour(event) {
		const background = document.getElementById(`background`);
		const topColour = document.getElementById(`top-colour`);
		const bottomColour = document.getElementById(`bottom-colour`);

		background.style = `background-image: linear-gradient(${topColour.value} 0%, ${bottomColour.value} 100%);`;
	}

	function setStars(event) {
		const starNum = event.target.value;
		const stars = [
			document.getElementById('star-0'),
			document.getElementById('star-1'),
			document.getElementById('star-2'),
		];

		if (starNum == 0) {
			stars[0].classList.add('is-hidden');
			stars[1].classList.add('is-hidden');
			stars[2].classList.add('is-hidden');
		} else if (starNum == 1) {
			stars[0].classList.add('is-hidden');
			stars[1].classList.add('is-hidden');
			stars[2].classList.remove('is-hidden');
		} else if (starNum == 2) {
			stars[0].classList.add('is-hidden');
			stars[1].classList.remove('is-hidden');
			stars[2].classList.remove('is-hidden');
		} else if (starNum == 3) {
			stars[0].classList.remove('is-hidden');
			stars[1].classList.remove('is-hidden');
			stars[2].classList.remove('is-hidden');
		}
	}
</script>

<section>
	<div class="card">
		<div class="title">
			<input
				name="name"
				type="text"
				title="Unit Name"
				placeholder="Unit Name"
				bind:value={$card.unitName}
			/>
		</div>
		<div class="owner">
			Commander
			<input
				name="owner"
				type="text"
				title="Unit Owner"
				placeholder="Owner of unit"
				bind:value={$card.commander}
			/>
		</div>

		<div class="image">
			<img id="bg-img" src="" alt="" />
		</div>
		<div id="background" class="background" />
		<div class="traits">
			<div class="traits-title">TRAITS</div>
			<div class="item">
				<input
					name="trait1"
					type="text"
					required
					pattern=".*\S.*"
					bind:value={$card.traits[0]}
				/><span>&nbsp;</span>
			</div>
			<div class="item">
				<input
					name="trait2"
					type="text"
					required
					pattern=".*\S.*"
					bind:value={$card.traits[1]}
				/><span>&nbsp;</span>
			</div>
			<div class="item">
				<input
					name="trait3"
					type="text"
					required
					pattern=".*\S.*"
					bind:value={$card.traits[2]}
				/><span>&nbsp;</span>
			</div>
			<div class="item">
				<input
					name="trait4"
					type="text"
					required
					pattern=".*\S.*"
					bind:value={$card.traits[3]}
				/><span>&nbsp;</span>
			</div>
		</div>

		<div class="attacks">
			<img src="icons/attack-sword.svg" style="top: -45px; left: -5px" alt="" />
			<div class="attack-num">
				<input name="attacks" type="text" bind:value={$card.attacksNo} />
			</div>
			<img src="icons/damage-splat.svg" style="top: 110px; width: 90%; left: 5%;" alt="" />
			<div class="damage">
				<input name="damage" type="text" bind:value={$card.damage} />
			</div>
		</div>
		<div class="symbols">
			<img id="anc-img" src="" alt="" />

			<img id="type-img" src="" alt="" />
		</div>
		<div class="stars">
			<img class="is-hidden" id="star-0" src="icons/star.svg" alt="" />
			<img class="is-hidden" id="star-1" src="icons/star.svg" alt="" />
			<img class="is-hidden" id="star-2" src="icons/star.svg" alt="" />
		</div>

		<div class="sidebar">
			<div class="size-circle">
				<input name="size" type="text" bind:value={$card.size} />
				SIZE
			</div>
			<div class="details">
				<input name="exp" type="text" title="Experience" bind:value={$card.experience} />
				<input name="equip" title="Equipment" type="text" bind:value={$card.equipment} />
				<input name="ancestry" title="Ancestry" type="text" bind:value={$card.ancestry} />
				<input name="type" title="Unit Type" type="text" bind:value={$card.unitType} />
			</div>
		</div>
		<div class="tier">
			<div>TIER</div>
		</div>
		<input name="tier" class="tier" type="text" bind:value={$card.tier} />
		<table class="stat-table">
			<tr>
				<td><input name="ATK" id="ATK" class="num" type="text" bind:value={$card.attack} /></td>
				<td><input name="DEF" class="num" type="text" bind:value={$card.defence} /></td>
				<td><input name="POW" class="num" type="text" bind:value={$card.power} /></td>
				<td>&nbsp;</td>
				<td><input name="TOU" class="num" type="text" bind:value={$card.toughness} /></td>
				<td><input name="MOR" class="num" type="text" bind:value={$card.morale} /></td>
				<td><input name="COM" class="num" type="text" bind:value={$card.command} /></td>
			</tr>
			<tr class="stat">
				<td>ATK</td>
				<td>DEF</td>
				<td>POW</td>
				<td>&nbsp;</td>
				<td>TOU</td>
				<td>MOR</td>
				<td>COM</td>
			</tr>
		</table>
	</div>
	<div class="image-upload">
		<div>
			<label
				>Background Image:
				<input
					type="file"
					id="bg"
					accept="image/gif, image/jpeg, image/png, image/svg+xml"
					on:change={loadFile}
				/></label
			>
		</div>
		<div>
			<label
				>Background Colours:
				<input id="top-colour" type="color" on:change={setColour} />
				<input id="bottom-colour" type="color" on:change={setColour} />
			</label>
		</div>
		<div>
			<label
				>Ancestry Image:
				<input
					type="file"
					id="anc"
					accept="image/gif, image/jpeg, image/png, image/svg+xml"
					on:change={loadFile}
				/>
			</label>
		</div>
		<div>
			<label
				>Unit Type Image:
				<input
					type="file"
					id="type"
					accept="image/gif, image/jpeg, image/png, image/svg+xml"
					on:change={loadFile}
				/>
			</label>
		</div>
		<div>
			<label
				>Number of Stars: (Experience)
				<select on:change={setStars}>
					<option value="0">0</option>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</select>
			</label>
		</div>
		<button on:click={checkStore}>Check Store</button>
	</div>
</section>

<style>
	section {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.image,
	.background {
		position: absolute;
		left: 0;
		top: 0;
		right: 20%;
		bottom: 88px;
	}

	.background {
		z-index: -15;
		background-color: white;
	}

	.image {
		z-index: -10;
	}

	.image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.stat-table {
		width: 100%;
		height: 90px;
		padding: 4px;
		position: absolute;
		bottom: 0;
		border-top: solid 3px black;
		background-color: white;
		z-index: 5;
	}

	.stat-table td {
		width: 14%;
	}

	.card {
		box-sizing: border-box;
		border: 3px solid black;
		width: 525px;
		height: 375px;
		position: relative;
	}

	.tier {
		text-align: center;
		font-size: large;
		display: block;
		position: absolute;
		left: 0;
		right: 0;
		margin: auto auto;
		bottom: 20px;
		z-index: 15;
	}

	.tier::after {
		display: block;
		position: absolute;
		content: '';
		border: 3px solid black;
		background-color: white;
		width: 60px;
		height: 60px;
		left: 0;
		right: 0;
		margin: 0 auto;
		bottom: 35px;
		transform: rotate(45deg);
		z-index: 10;
	}

	input.tier {
		position: absolute;
		z-index: 20;
		font-size: xx-large;
		width: 2.5rem;
		bottom: 67.5px;
	}

	.num {
		border: none;
		font-size: xx-large;
		width: 90%;
		text-align: center;
	}

	.stat {
		font-size: x-large;
		text-align: center;
	}

	.sidebar {
		position: absolute;
		right: 0;
		width: 20%;
		border-left: 3px solid black;
		height: 100%;
	}

	.details {
		position: absolute;
		bottom: 90px;
	}

	.sidebar > .details > input {
		width: 90%;
		margin: 0 5px;
		font-size: x-large;
		text-align: center;
	}

	.size-circle {
		margin: auto;
		margin-top: 10px;
		border: 3px solid black;
		border-radius: 50%;
		width: 75px;
		height: 75px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.size-circle input {
		width: 80%;
		background: none;
		font-size: xx-large;
		text-align: center;
	}

	.title {
		position: absolute;
		margin-top: 10px;
		width: 80%;
	}

	.title input {
		font-size: xx-large;
		text-align: center;
		width: 100%;
		color: white;
		text-shadow: black 0px 0px 3px;
		background: none;
	}

	.owner {
		position: absolute;
		margin-top: 50px;
		margin-left: 80px;
		width: 63%;
		color: white;
		text-shadow: black 0px 0px 3px;
	}

	.owner input {
		font-size: medium;
		text-align: left;
		width: 50%;
		color: white;
		text-shadow: black 0px 0px 3px;
		background: none;
	}

	.traits {
		position: absolute;
		top: 100px;
		left: 100px;
	}

	.traits .item {
		position: relative;
		left: 2rem;
	}

	.traits input {
		background: none;
		font-size: large;
	}

	.traits input + span {
		position: relative;
		left: -235px;
	}

	.traits input:valid + span::before {
		content: '\25CF';
	}

	.traits-title {
		color: white;
		text-shadow: black 0px 0px 3px;
		font-size: x-large;
	}

	.attacks {
		position: absolute;
		width: 20%;
		bottom: 100px;
		top: 100px;
	}

	.attacks input {
		position: relative;
		font-size: xx-large;
		background: none;
		text-align: center;
		width: 90%;
		margin-top: 48px;
		z-index: 30;
	}

	.attacks img {
		position: absolute;
		width: 100%;
		z-index: 15;
	}

	.image-upload {
		margin-left: 20px;
	}

	.symbols {
		position: absolute;
		right: 20%;
		width: 20%;
		bottom: 90px;
		height: 60%;
	}

	.symbols img {
		box-sizing: border-box;
		width: 100%;
		padding: 10%;
	}

	.stars {
		display: flex;
		position: absolute;
		right: 20%;
		bottom: 52.5%;
	}

	.stars img {
		position: relative;
		width: 15px;
	}

	.stars img.is-hidden {
		visibility: hidden;
	}

	.stars img#star-0 {
		left: 5px;
	}

	.stars img#star-1 {
		top: -15px;
	}

	.stars img#star-2 {
		right: 5px;
	}
</style>
