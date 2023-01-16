import "../..//node_modules/flag-icons/css/flag-icons.min.css";

const FlagIcon = ({
	code = "us",
	square = true,
	rounded = false,
	size = 16,
}) => {
	return (
		<>
			<span
				className={`fi fi-${code} ${square ? "fis" : ""} ${
					rounded ? "rounded-full" : ""
				} `}
			></span>
			<style jsx>{`
				.fi {
					background-size: cover;
					height: ${size}px;
					width: ${size}px;
				}
			`}</style>
		</>
	);
};
export default FlagIcon;
