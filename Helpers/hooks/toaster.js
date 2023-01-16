import { store } from "../../store/store";
export function useToaster(title, color , icon) {
	store.dispatch({
		type: "toaster/addToaster",
		payload: {
			id: new Date().getTime(),
			title,
			color,
			icon
		},
	});
}
