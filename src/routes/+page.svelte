<script>
	import Card from '../components/card.svelte';
	import CardForm from '../components/cardForm.svelte';
</script>

<main>
	<div>
		<CardForm />
		<Card />
	</div>
</main>

<style>
	main {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
