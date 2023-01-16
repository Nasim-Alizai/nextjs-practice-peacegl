const alert = {
	state: {
		show: false,
	},
	reducers: {
		showAlert(state, payload) {
			return {
				...state,
				show: true,
				...payload,
			};
		},
		closeAlert(state) {
			state.show = false;
			return { ...state };
		},
	},
	effects: (dispatch) => ({}),
};
export default alert;
