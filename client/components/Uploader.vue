<template>
	<div>
		<TransitionRoot appear :show="isOpen" as="template">
			<Dialog as="div" @close="closeModal" class="relative z-10">
				<TransitionChild
					as="template"
					enter="duration-300 ease-out"
					enter-from="opacity-0"
					leave="duration-200 ease-in"
					leave-to="opacity-0"
				>
					<div class="fixed inset-0 bg-black/40 backdrop-blur" />
				</TransitionChild>

				<div class="fixed inset-0 overflow-y-auto">
					<div class="flex items-center justify-center min-h-full p-4">
						<TransitionChild
							as="template"
							enter="duration-300 ease-out"
							enter-from="opacity-0 scale-95"
							leave="duration-200 ease-in"
							leave-to="opacity-0 scale-95"
						>
							<DialogPanel
								class="w-full max-w-lg p-6 overflow-hidden transition-all transform bg-white shadow-xl dark:text-gray-100 dark:bg-slate-900 rounded-2xl"
							>
								<DialogTitle as="h3" class="text-lg font-medium text-center">
									Upload Files
								</DialogTitle>
								<div class="mt-8">
									<div class="text-center border border-dashed rounded-lg border-primary-300 py-9">
										<div v-bind="getRootProps()">
											<input v-bind="getInputProps()" />
											<p v-if="isDragActive">Drop the files here ...</p>
											<p class="text-sm font-light" v-else>
												Drag & drop some files here, or click to select files
											</p>
										</div>
										<button
											class="px-5 py-3 mt-5 text-sm font-light bg-gray-100 rounded-lg btn-flat"
											@click="open"
										>
											Browse Files
										</button>
									</div>
								</div>

								<div class="mt-4">
									<transition name="fade">
										<div v-if="selectedFiles.length" class="flex items-center justify-between">
											<h3 class="text-sm font-light text-gray-400">Selected files</h3>
											<button @click="uploadFiles" class="px-3 text-xs btn">Start Upload</button>
										</div>
									</transition>
									<transition-group name="list" tag="ul" class="relative mt-5 space-y-3">
										<template :key="`selectedFile${i}`" v-for="(f, i) in selectedFiles">
											<li class="p-3 origin-center rounded-md shadow shadow-gray-500/20">
												<div class="flex items-center justify-between">
													<div class="flex items-start max-w-sm space-x-4">
														<img
															:src="`${getVSIFileIcon(f.name)}`"
															alt="js"
															width="34"
															height="34"
															class="object-contain"
														/>
														<div>
															<h1 class="mb-1 text-sm truncate">
																{{ f.name }}
															</h1>
															<p class="text-xs font-light text-gray-400 uppercase">
																{{ f.type.split("/").pop() }}
															</p>
														</div>
													</div>

													<button
														@click="selectedFiles.splice(i, 1)"
														class="flex p-2 bg-gray-100 rounded-full dark:bg-slate-800 shrink-0"
													>
														<Icon name="bi:x" />
													</button>
												</div>
											</li>
										</template>
									</transition-group>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</TransitionRoot>
	</div>
</template>

<script setup>
	import { getMaterialFileIcon, getVSIFileIcon } from "file-extension-icon-js";
	import { useDropzone } from "vue3-dropzone";
	import {
		TransitionRoot,
		TransitionChild,
		Dialog,
		DialogPanel,
		DialogTitle,
	} from "@headlessui/vue";

	// handles the drop files
	function onDrop(acceptFiles, rejectReasons) {
		acceptFiles.forEach((f) => selectedFiles.value.push(f));
	}
	// stores the files that will be uploaded
	const selectedFiles = ref([]);

	// bring in method used to create documents
	const { createDocument } = useDocument();

	const { getRootProps, getInputProps, open, isDragActive, ...rest } = useDropzone({ onDrop });
	const isOpen = ref(false);
	function closeModal() {
		selectedFiles.value = [];
		isOpen.value = false;
	}
	function openModal() {
		isOpen.value = true;
	}

	// method triggered when the start upload button is clicked
	const uploadFiles = async () => {
		if (selectedFiles.value.length == 0) return;
		useLoader().value = true;
		await createDocument(selectedFiles.value);
		useLoader().value = false;
		closeModal();
	};

	defineExpose({
		closeModal,
		openModal,
	});
</script>
