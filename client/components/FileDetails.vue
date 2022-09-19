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
								<div v-if="doc" class="flex flex-col h-full overflow-y-auto">
									<div class="p-2">
										<div class="flex items-center justify-between">
											<h1 class="font-medium text-gray-500">File Info</h1>
											<button @click="closeModal" type="button">
												<Icon class="dark:text-gray-400" name="bi:x-lg" />
											</button>
										</div>
										<img
											:src="`${getVSIFileIcon(doc.filename)}`"
											alt=""
											class="object-contain w-20 h-20 mt-10"
										/>
										<p class="text-xs font-light text-gray-400 mt-7">File name</p>
										<h1 class="mt-1 font-medium text-gray-700 dark:text-gray-200">
											{{ doc.name }}
										</h1>
										<p class="mt-4 text-xs font-light text-gray-400">File type</p>
										<h1 class="mt-1 font-medium text-gray-700 uppercase dark:text-gray-200">
											{{ doc.filename.split(".").pop() }}
										</h1>
										<p class="mt-4 text-xs font-light text-gray-400">Created</p>
										<h1 class="mt-1 font-medium text-gray-700 dark:text-gray-200">
											{{ dayjs(doc.createdAt).format("MMM DD, YYYY hh:mm A") }}
										</h1>
										<p class="mt-4 text-xs font-light text-gray-400">Updated</p>
										<h1 class="mt-1 font-medium text-gray-700 dark:text-gray-200">
											{{ dayjs(doc.updatedAt).format("MMM DD, YYYY hh:mm A") }}
										</h1>
										<p class="mt-4 text-xs font-light text-gray-400">Description</p>
										<h1 class="mt-1 font-medium text-gray-700 dark:text-gray-200">
											{{ doc.description ? doc.description : "N/A" }}
										</h1>

										<div class="mt-10">
											<a
												:href="docLink"
												target="_blank"
												class="flex items-center justify-start w-full px-3 py-4 mb-3 space-x-3 btn-flat"
											>
												<Icon name="bi:box-arrow-up-right" />
												<span>View Document</span>
											</a>
											<button
												@click="deleteDoc"
												class="flex items-center justify-start w-full px-3 py-4 space-x-3 text-sm text-gray-500 transition-all rounded-lg dark:text-gray-400 dark:hover:bg-slate-800 hover:bg-red-50 hover:text-red-500"
											>
												<Icon name="bi:trash3" />
												<span>Delete File</span>
											</button>
										</div>
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
	import dayjs from "dayjs";
	import { getVSIFileIcon } from "file-extension-icon-js";
	import { useDropzone } from "vue3-dropzone";
	import {
		TransitionRoot,
		TransitionChild,
		Dialog,
		DialogPanel,
		DialogTitle,
	} from "@headlessui/vue";

	// Document interface
	import { IDocument } from "~~/types";

	// var used to store the document being viewed
	const doc = ref<IDocument>();

	// bring in function used to remove doc
	const { removeDocument } = useDocument();

	const isOpen = ref(false);
	function closeModal() {
		doc.value = null;
		isOpen.value = false;
	}
	function openModal(item: IDocument) {
		if (item) doc.value = item;
		isOpen.value = true;
	}

	// dynamic doc link property
	const docLink = computed(() => {
		const config = useRuntimeConfig();
		const apiUrl = config.public.API_URL;
		return `${apiUrl}${doc.value.path}`;
	});

	// method triggered  when delete button is clicked
	const deleteDoc = async () => {
		let c = confirm("Are you sure?");
		if (!c) return;
		await removeDocument(doc.value.id);
		closeModal();
	};

	defineExpose({
		closeModal,
		openModal,
	});
</script>
