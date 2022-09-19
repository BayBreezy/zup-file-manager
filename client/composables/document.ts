import { IDocument } from "~~/types";

export const useAllDocuments = () => useState<IDocument[]>("alDocuments", () => []);

// returns the url to the api
export const useApiUrl = () => {
	const config = useRuntimeConfig();
	return config.public.API_URL;
};

export const useDocument = () => {
	const baseURL = `${useApiUrl()}documents/`;

	// Method used to get all documents
	const getAllDocuments = async () => {
		let data = await $fetch<IDocument[]>("", { baseURL }).catch((e) => {
			throw e.data;
		});
		useAllDocuments().value = data;
		return data;
	};
	// Method search a document
	const searchDocument = async (term) => {
		let data = await $fetch<IDocument[]>(`search/${term}`, { baseURL, method: "GET" }).catch(
			(e) => {
				throw e.data;
			}
		);
		return data;
	};

	/**
	 *
	 *  Method used ot create document(s)
	 * */
	const createDocument = async (files) => {
		// create form data
		let fd = new FormData();
		files.forEach((f) => fd.append("file", f));
		await $fetch("/", {
			baseURL,
			method: "POST",
			body: fd,
		}).catch((error) => {
			console.log(error.data);
			throw error.data;
		});
		await getAllDocuments();
	};

	// Method used to delete a doc
	const removeDocument = async (id: string) => {
		await $fetch(`${id}`, {
			baseURL,
			method: "DELETE",
		}).catch((error) => {
			console.log(error.data);
		});
		await getAllDocuments();
	};

	/**
	 *
	 * Method used to update a document
	 */
	const updateDocument = async (id: string, body, file) => {
		// create form data
		let fd = new FormData();
		if (file) fd.append("file", file);
		fd.append("name", body.name);
		fd.append("description", body.description || "");

		// send request
		await $fetch(`${id}`, {
			baseURL,
			method: "PATCH",
			body: fd,
		}).catch((error) => {
			console.log(error.data);
			throw error.data;
		});
		await getAllDocuments();
	};

	// return functions from composable
	return {
		getAllDocuments,
		createDocument,
		removeDocument,
		updateDocument,
		searchDocument,
	};
};
