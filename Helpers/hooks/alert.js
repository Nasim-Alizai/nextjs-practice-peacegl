import { store } from "../../store/store";
export function useAlert(
	title,
	subtitle,
	confirmText,
	cancelText,
	onConfirm,
	onCancel,
	color,
	icon
) {
	store.dispatch({
		type: "alert/showAlert",
		payload: {
			title,
			subtitle,
			confirmText,
			cancelText,
			onConfirm,
			onCancel,
			color,
			icon,
		},
	});
}
