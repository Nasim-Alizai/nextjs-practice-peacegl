const toaster = {
	state: [],
	reducers: {
		addToaster(state, payload) {
			return [...state, payload];
		},
		removeToaster(state, id) {
			return state.filter((item) => item.id != id);
		},
	},
	effects: (dispatch) => ({}),
};
export default toaster;
