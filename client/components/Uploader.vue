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
					<div class="flex min-h-full items-center justify-center p-4">
						<TransitionChild
							as="template"
							enter="duration-300 ease-out"
							enter-from="opacity-0 scale-95"
							leave="duration-200 ease-in"
							leave-to="opacity-0 scale-95"
						>
							<DialogPanel
								class="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all"
							>
								<DialogTitle as="h3" class="text-lg font-medium text-center">
									Upload Files
								</DialogTitle>
								<div class="mt-8">
									<div class="border border-dashed border-primary-300 rounded-lg text-center py-9">
										<div v-bind="getRootProps()">
											<input v-bind="getInputProps()" />
											<p v-if="isDragActive">Drop the files here ...</p>
											<p class="font-light text-sm" v-else>
												Drag & drop some files here, or click to select files
											</p>
										</div>
										<button
											class="px-5 py-3 rounded-lg text-sm bg-gray-100 mt-5 font-light"
											@click="open"
										>
											Browse Files
										</button>
									</div>
								</div>

								<div class="mt-4">
									<transition name="fade">
										<div v-if="selectedFiles.length" class="flex items-center justify-between">
											<h3 class="text-sm text-gray-400 font-light">Selected files</h3>
											<button class="btn text-xs px-3">Start Upload</button>
										</div>
									</transition>
									<transition-group name="list" tag="ul" class="mt-5 space-y-3 relative">
										<template :key="`selectedFile${i}`" v-for="(f, i) in selectedFiles">
											<li class="p-3 shadow shadow-gray-500/20 rounded-md origin-center">
												<div class="flex items-center justify-between">
													<div class="max-w-sm flex items-start space-x-4">
														<img
															:src="`${getVSIFileIcon(f.name)}`"
															alt="js"
															width="34"
															height="34"
															class="object-contain"
														/>
														<div>
															<h1 class="truncate text-sm mb-1">
																{{ f.name }}
															</h1>
															<p class="text-xs uppercase text-gray-400 font-light">
																{{ f.type.split("/").pop() }}
															</p>
														</div>
													</div>

													<button
														@click="selectedFiles.splice(i, 1)"
														class="p-2 flex bg-gray-100 rounded-full shrink-0"
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

	function onDrop(acceptFiles, rejectReasons) {
		acceptFiles.forEach((f) => selectedFiles.value.push(f));
	}

	const selectedFiles = ref([]);

	const { getRootProps, getInputProps, open, isDragActive, ...rest } = useDropzone({ onDrop });
	const isOpen = ref(false);
	function closeModal() {
		isOpen.value = false;
	}
	function openModal() {
		isOpen.value = true;
	}

	defineExpose({
		closeModal,
		openModal,
	});
</script>
