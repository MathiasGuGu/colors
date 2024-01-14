<script lang="ts">
	export let showcaseType: any;
	export let id: string;
</script>

<button>
	<input
		bind:group={showcaseType}
		type="radio"
		class="hidden peer"
		name="showcase"
		{id}
		value={id}
	/>
	<label
		for={id}
		class="w-fit px-4 h-8 bg-white-100 rounded flex items-center justify-center text-white-500 peer-checked:bg-blue-200 peer-checked:text-blue-600 duration-200 hover:cursor-pointer hover:bg-blue-200 hover:bg-opacity-40"
	>
		{id}
	</label>
</button>
