<template>
	<div>
		<header
			class="sticky top-0 z-10 border-b bg-white/70 dark:border-slate-800 dark:bg-slate-800/70 backdrop-blur"
		>
			<div class="flex items-center justify-between h-16 max-w-6xl px-5 mx-auto lg:px-0">
				<NuxtLink class="text-2xl font-semibold" to="/">Zup</NuxtLink>
				<div class="flex space-x-5">
					<button @click="$refs.searchPanel.openModal()" type="button" class="btn-flat">
						<span>Search</span>
					</button>
					<button @click="$refs.uploader.openModal()" class="px-3 py-2 btn">Upload File</button>
				</div>
			</div>
		</header>

		<!-- Uploader -->
		<Uploader ref="uploader" />

		<!-- Uploader -->
		<SearchPanel ref="searchPanel" />

		<main class="min-h-screen py-10">
			<div
				class="grid max-w-6xl grid-cols-1 gap-5 p-5 mx-auto md:gap-10 lg:p-0 md:grid-cols-3 lg:grid-cols-4"
			>
				<template v-for="d in documents" :key="d.id">
					<div
						class="relative px-5 py-10 text-center transition-all rounded-2xl group bg-slate-50 hover:bg-primary-50"
					>
						<!-- Format -->
						<div class="inline-block h-20 px-5 bg-white rounded-md shadow">
							<div class="flex items-center justify-center w-full h-full">
								<img
									:src="`${getVSIFileIcon(d.filename)}`"
									alt="js"
									width="34"
									height="34"
									class="object-contain"
								/>
							</div>
						</div>

						<!-- Action button -->
						<FileAction :document="d" class="absolute top-2 right-2" />

						<!-- Filename & size -->
						<p
							class="font-semibold truncate transition-all duration-300 mt-7 group-hover:text-primary"
						>
							{{ d.name }}
						</p>
						<p
							class="mt-2 text-sm font-light transition-all duration-300 group-hover:text-primary-400"
						>
							{{ fileSize(d.size).human("si") }}
						</p>
					</div>
				</template>
			</div>
		</main>
	</div>
</template>

<script setup>
	import { getVSIFileIcon } from "file-extension-icon-js";
	import fileSize from "file-size";

	const { getAllDocuments } = useDocument();
	await useAsyncData(async () => await getAllDocuments(), { initialCache: false });
	const documents = useAllDocuments();
</script>

<style></style>
