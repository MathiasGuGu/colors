<script lang="ts">
	interface colorContent {
		dark: string;
		darker: string;
		darkest: string;
	}

	export let name: string;
	export let primary: string;
	export let content: colorContent;
</script>

<div class="flex flex-col w-auto h-auto gap-5">
	<div
		class="w-48 h-24 rounded-lg text-xs font-light flex flex-col items-start justify-between px-2 py-3"
		style={`background-color: ${primary}; color: ${content.darker}`}
	>
		<p>{name}</p>
		<p>{primary}</p>
	</div>
	<div class="w-auto h-auto flex flex-col gap-3">
		<h3>{name} Content (3)</h3>
		<div class="w-48 h-24 rounded-lg flex">
			<div class="w-1/3 h-full rounded-l-lg" style={`background-color: ${content.dark}`}></div>
			<div class="w-1/3 h-full" style={`background-color: ${content.darker}`}></div>
			<div class="w-1/3 h-full rounded-r-lg" style={`background-color: ${content.darkest}`}></div>
		</div>
	</div>
</div>
