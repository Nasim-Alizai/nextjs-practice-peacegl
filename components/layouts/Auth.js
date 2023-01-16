const Auth = ({ children }) => {
	return (
		<>
			<div className="h-screen flex flex-column items-center justify-center">
				<div className="auth-form-wrapper p-4">{children}</div>
			</div>
			<style jsx>{`
				.auth-form-wrapper {
					width: 450px;
				}
				@media screen (max-width: 400px) {
					.auth-form-wrapper {
						width: 100%;
					}
				}
			`}</style>
		</>
	);
};

export default Auth;
