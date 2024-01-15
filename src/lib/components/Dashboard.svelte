<script lang="ts">
	import { Rainbow, MessageCircle, BellDot, User } from 'lucide-svelte';
	// background color and content color
	export let backgroundColor: any;
	export let backgroundContent: any;
	// primary color and content color
	export let primaryColor: any;
	export let primaryContent: any;
	// secondary color and content color
	export let secondaryColor: any;
	export let secondaryContent: any;
	// tertiary color and content color
	export let tertiaryColor: any;
	export let tertiaryContent: any;
	// quad color and content color
	export let quadColor: any;
	export let quadContent: any;

	/* 
		Not all colors have to exist at all times. 
		For example, if the user is using a monochromatic palette,
		only the background color and content color will exist.

		However, if the user is using a quad palette, all colors will exist.

		therefor, the different parts of the dashboard need to have checks to see if the color exists or not.
		if it does not, it will either have to be another color, hidden or disabled.
	*/
</script>

<div class="w-full h-auto flex items-center justify-center">
	<section
		class="w-full h-96 rounded-lg max-w-7xl flex flex-col"
		style={`
		background-color: ${backgroundColor};
		color: ${backgroundContent.darkest};
		`}
	>
		<!--Start of Navbar-->
		<div class="w-full h-12 flex items-center justify-between px-12">
			<!--Logo container-->
			<div class="flex items-center gap-2 text-xs">
				<Rainbow />
				<p>Colors</p>
			</div>
			<!--Content container-->
			<div class="flex items-center gap-2 text-xs">
				<button class="px-3 py-1 rounded hover:bg-white-50/10">Dashboard</button>
				<button class="px-3 py-1 rounded hover:bg-white-50/10">Collaboraters</button>
				<button class="px-3 py-1 rounded hover:bg-white-50/10">Collection</button>
				<button class="px-3 py-1 rounded hover:bg-white-50/10"><MessageCircle size={16} /></button>
				<button class="px-3 py-1 rounded hover:bg-white-50/10"><BellDot size={16} /></button>
				<button
					class=" h-8 w-8 flex items-center justify-center rounded-full"
					style={`background-color: ${primaryColor};
					color: ${primaryContent.darker};
					`}
				>
					<User size={16} />
				</button>
			</div>
		</div>
		<!--Start of content section-->
		<div class="w-full h-64 flex items-center justify-end gap-12 pr-12 mt-6">
			<!--Left primary container-->
			<div
				class="h-full w-full max-w-xl rounded-lg"
				style={`background-color: ${primaryColor}`}
			></div>
			<!--right secondary container-->
			<div class="h-full w-80 rounded-lg relative" style={`background-color: ${secondaryColor}`}>
				{#if tertiaryColor}
					<div
						style={` background-color: ${tertiaryColor}`}
						class="w-32 h-32 bottom-0 absolute rounded-bl-lg rounded-tr-lg"
					></div>
				{/if}
				{#if quadColor}
					<div
						style={` background-color: ${quadColor}`}
						class="w-48 h-32 top-0 right-0 absolute rounded-bl-lg rounded-tr-lg"
					></div>
				{/if}
			</div>
		</div>
	</section>
</div>
