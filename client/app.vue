<template>
	<div class="text-gray-800 dark:bg-slate-900 dark:text-slate-50">
		<NuxtPage />
		<div v-if="loading" class="fixed inset-0 z-50 bg-black/50">
			<div class="absolute inset-0 flex items-center justify-center">
				<div class="p-4 text-center text-white">
					<p class="mb-5 text-xl font-semibold">Loading...</p>
					<Icon name="line-md:loading-loop" size="100" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	// bring in loading state
	// used to show the global overlay
	const loading = useLoader();
</script>
