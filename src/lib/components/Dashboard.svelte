<script lang="ts">
	import {
		ArrowRight,
		Bell,
		CornerDownRight,
		GitGraph,
		Info,
		MessageCircleCode,
		Package
	} from 'lucide-svelte';
	import { chroma } from 'chroma-js';
	export let colors: any;
	export let backgroundColor: string;
</script>

<div
	class="w-screen max-w-7xl h-auto border rounded-t-lg shadow-2xl shadow-zinc-50 flex flex-col"
	style={`
        background-color: ${backgroundColor}
    `}
>
	<!-- start of navbar-->

	<div
		class="flex w-full h-12 rounded-t-lg text-sm items-center justify-between px-12"
		style={`color: ${colors.textColor.darkest}`}
	>
		<div>Dashboard</div>
		<div class="flex gap-4 items-center text-xs">
			<p>Dashboard</p>
			<p>Information</p>
			<p>Contact</p>
			<Bell strokeWidth={2} size={16} />
			<MessageCircleCode strokeWidth={2} size={16} />
			<div class="h-8 w-8 rounded-full" style={`background-color: ${colors.primary}`}></div>
		</div>
	</div>
	<!-- start of dashboard-->
	<div class="w-full h-auto flex">
		<!-- start of sidebar-->
		<div class="w-1/5 h-auto flex flex-col items-start justify-start py-6 px-6 gap-5 border-r">
			<p class="flex gap-2 items-center" style={`color: ${colors.textColor.darkest};`}>
				<Package strokeWidth={2} size={16} /> Deliveries
			</p>
			<div
				class="flex flex-col pl-5 gap-2 text-sm"
				style={`
                        color: ${colors.textColor.darkest}
                    `}
			>
				<p
					class="flex items-center gap-2 rounded-lg px-2 py-1"
					style={`background-color: ${colors.primary}; color: ${colors.primaryContent.darkest}`}
				>
					<CornerDownRight strokeWidth={1} size={16} /> Recent deliveries
				</p>
				<p class="flex items-center gap-2">
					<CornerDownRight strokeWidth={1} size={16} /> All deliveries
				</p>
			</div>
			<p class="flex gap-2 items-center" style={`color: ${colors.textColor.darkest};`}>
				<GitGraph strokeWidth={2} size={16} /> Statistics
			</p>
			<div class="flex flex-col pl-5 gap-2 text-sm" style={`color: ${colors.textColor.darkest};`}>
				<p class="flex items-center gap-2">
					<CornerDownRight strokeWidth={1} size={16} /> Client Statistics
				</p>
				<p class="flex items-center gap-2">
					<CornerDownRight strokeWidth={1} size={16} /> All statistics
				</p>
			</div>
			<p class="flex items-center gap-2" style={`color: ${colors.textColor.darkest};`}>
				<Info strokeWidth={2} size={16} /> Other
			</p>
			<div class="flex flex-col pl-5 gap-2 text-sm" style={`color: ${colors.textColor.darkest};`}>
				<p class="flex items-center gap-2">
					<CornerDownRight strokeWidth={1} size={16} />Account
				</p>
				<p class="flex items-center gap-2">
					<CornerDownRight strokeWidth={1} size={16} />Settings
				</p>
				<p class="flex items-center gap-2">
					<CornerDownRight strokeWidth={1} size={16} />Terms of Service
				</p>
			</div>
			<div class="w-full h-64"></div>
			<!--End of sidebar-->
		</div>

		<!-- start of dashboard-->
		<div class="w-4/5 flex flex-col px-6 py-4">
			<div class="flex h-72 w-full gap-1">
				<div
					class="flex-1 h-full border rounded-lg flex px-6 py-4 flex-col gap-2 duration-300"
					style={`background-color: ${colors.primary}`}
				>
					<p style={`color: ${colors.primaryContent.darkest}`} class="text-2xl font-light">
						All your statistics in one Place
					</p>
					<div class="flex gap-1 items-center">
						<p
							style={`color: ${colors.primaryContent.dark}`}
							class="text-sm font-light flex items-center gap-1"
						>
							Something <ArrowRight strokeWidth={1} size={16} />
						</p>
						<p
							style={`color: ${colors.primaryContent.darker}`}
							class="text-sm font-light flex items-center gap-1"
						>
							Something more <ArrowRight strokeWidth={1} size={16} />
						</p>
						<p
							style={`color: ${colors.primaryContent.darkest}`}
							class="text-sm font-light flex items-center gap-1"
						>
							Something most
						</p>
					</div>
					<p
						style={`color: ${colors.primaryContent.darker}`}
						class="text-sm font-light duration-300"
					>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem itaque voluptatibus quae
						deserunt maxime fuga cum autem ea ad voluptas. Lorem, ipsum dolor sit amet consectetur
						adipisicing elit. At minima explicabo libero quisquam labore, corporis quibusdam
						voluptate illo itaque totam!
					</p>
				</div>
				<div
					class="flex-1 h-full border rounded-lg duration-300"
					style={`background-color: ${colors.secondary}`}
				></div>
			</div>
			<div class="w-full h-auto flex flex-col py-12 gap-1">
				<h2 class="text-xl font-light" style={`color: ${colors.textColor.darkest}`}>
					View all recent deliveries
				</h2>
				<p class="text-base font-light -mt-2" style={`color: ${colors.textColor.darker}`}>
					See all your latest deliveries and services in one place.
				</p>
				<div
					class="w-full h-14 rounded-lg flex gap-3 items-center px-12 text-sm justify-between"
					style={`background-color: ${chroma(backgroundColor).darken(0.2).hex()}; color: ${
						colors.foregroundText.darkest
					}`}
				>
					<p>First order</p>
					<div
						style={`background-color: ${colors.toastInfo}; color: ${colors.toastColors.info.content.darkest}`}
						class="h-6 text-xs rounded-lg flex items-center justify-center w-auto px-2"
					>
						Undergoing
					</div>
					<div>
						{new Date().toDateString()}
					</div>
					<div>Figma workfile</div>
				</div>
				<div
					class="w-full h-14 rounded-lg flex gap-3 items-center px-12 text-sm justify-between"
					style={`background-color: ${chroma(backgroundColor).brighten(1).hex()}; color: ${
						colors.foregroundText.darkest
					}`}
				>
					<p>Second order</p>
					<div
						style={`background-color: ${colors.toastSuccess}; color: ${colors.toastColors.success.content.darkest}`}
						class="h-6 text-xs rounded-lg flex items-center justify-center w-auto px-2"
					>
						Successfull
					</div>
					<div>
						{new Date().toDateString()}
					</div>
					<div>Figma workfile</div>
				</div>
				<div
					class="w-full h-14 rounded-lg flex gap-3 items-center px-12 text-sm justify-between"
					style={`background-color: ${chroma(backgroundColor).brighten(1).hex()}; color: ${
						colors.foregroundText.darkest
					}`}
				>
					<p>Second order</p>
					<div
						style={`background-color: ${colors.toastWarning}; color: ${colors.toastColors.warning.content.darkest}`}
						class="h-6 text-xs rounded-lg flex items-center justify-center w-auto px-2"
					>
						Danger
					</div>
					<div>
						{new Date().toDateString()}
					</div>
					<div>Figma workfile</div>
				</div>
			</div>
		</div>
	</div>
	<!-- End of page-->
</div>
