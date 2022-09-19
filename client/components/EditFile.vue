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
					<div class="flex justify-end w-full h-full">
						<TransitionChild
							as="template"
							enter="duration-300 ease-out"
							enter-from="opacity-0 translate-x-[100px]"
							leave="duration-200 ease-in"
							leave-to="opacity-0 translate-x-[100px]"
						>
							<DialogPanel
								class="w-full max-w-sm p-6 overflow-hidden transition-all transform bg-white shadow-xl dark:bg-slate-900"
							>
								<div class="flex flex-col h-full overflow-y-auto">
									<div class="p-2">
										<div class="flex items-center justify-between">
											<h1 class="font-medium text-gray-500 dark:text-gray-200">Edit File Info</h1>
											<button @click="closeModal" type="button">
												<span class="sr-only">Close Edit file panel</span>
												<Icon class="dark:text-gray-300" name="bi:x-lg" />
											</button>
										</div>
										<div
											class="px-3 mt-5 text-center border border-dashed rounded-lg border-primary-300 py-9"
										>
											<div v-bind="getRootProps()">
												<input v-bind="getInputProps()" />
												<p v-if="isDragActive">Drop the file here ...</p>
												<p class="text-sm font-light dark:text-gray-100" v-else>
													Drag & drop a new file here, or click to select file
												</p>
											</div>
											<button class="mt-5 text-xs font-light btn-flat" @click="open">
												Browse File
											</button>
										</div>

										<transition name="fade">
											<div
												v-if="selectedFile"
												class="p-3 origin-center rounded-md shadow mt-7 shadow-gray-500/20"
											>
												<div class="flex items-center justify-between">
													<div class="flex items-start max-w-sm space-x-4">
														<img
															:src="`${getVSIFileIcon(selectedFile.name)}`"
															alt="js"
															width="34"
															height="34"
															class="object-contain"
														/>
														<div>
															<h1 class="mb-1 text-sm truncate dark:text-gray-100">
																{{ selectedFile.name }}
															</h1>
															<p
																class="text-xs font-light text-gray-400 uppercase dark:text-gray-300"
															>
																{{ selectedFile.type.split("/").pop() }}
															</p>
														</div>
													</div>

													<button
														@click="selectedFile = null"
														class="flex p-2 bg-gray-100 rounded-full dark:bg-gray-800 shrink-0"
													>
														<Icon class="text-red-400" name="bi:x" />
													</button>
												</div>
											</div>
										</transition>
										<form @submit.prevent="updateDoc">
											<label
												for="name"
												class="inline-block mb-1 text-xs font-light text-gray-400 mt-7"
												>File name</label
											>
											<input
												v-model="doc.name"
												required
												minlength="5"
												type="text"
												id="name"
												name="name"
												class="input"
											/>
											<label
												for="description"
												class="inline-block mt-3 mb-1 text-xs font-light text-gray-400"
												>Description</label
											>
											<textarea
												v-model="doc.description"
												rows="4"
												type="text"
												id="description"
												name="description"
												class="input"
											></textarea>

											<div class="w-full mt-5">
												<button class="w-full btn">
													<span>Update File</span>
												</button>
											</div>
										</form>
									</div>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</TransitionRoot>
	</div>
</template>

<script setup lang="ts">
	import { getVSIFileIcon } from "file-extension-icon-js";
	import { useDropzone } from "vue3-dropzone";
	import {
		TransitionRoot,
		TransitionChild,
		Dialog,
		DialogPanel,
		DialogTitle,
	} from "@headlessui/vue";

	// document type
	import { IDocument } from "~~/types";

	// document that is being edited
	const doc = ref<IDocument>({} as IDocument);
	// global ref used to show loading state
	const loading = useLoader();

	// function used to handle files dropped in the dropzone component
	function onDrop(acceptFiles, rejectReasons) {
		selectedFile.value = acceptFiles[0];
	}

	// ref used to store new file for upload
	const selectedFile = ref();

	// dropzone config
	const { getRootProps, getInputProps, open, isDragActive, ...rest } = useDropzone({
		onDrop,
		maxFiles: 1,
		multiple: false,
	});

	// bring in function used to update document
	const { updateDocument } = useDocument();

	// Method call to trigger update function
	const updateDoc = async () => {
		if (!doc.value.name) return alert("Name is required");

		loading.value = true;
		await updateDocument(doc.value.id, doc.value, selectedFile.value);
		selectedFile.value = null;
		loading.value = false;
		closeModal();
	};

	const isOpen = ref(false);
	function closeModal() {
		doc.value = {} as IDocument;
		isOpen.value = false;
	}
	function openModal(item: IDocument) {
		if (item) doc.value = JSON.parse(JSON.stringify(item));
		isOpen.value = true;
	}

	// expose open & close functions
	defineExpose({
		closeModal,
		openModal,
	});
</script>
