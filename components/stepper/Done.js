import Svgs from "../utils/SVGs";

const Done = () => {
	return (
		<>
			<div
				className="done-svg flex justify-center items-center h-full"
				dangerouslySetInnerHTML={{ __html: Svgs.done }}
			></div>
			<style jsx global>{`
				.done-svg {
					height: 540px;
				}
				.done-svg svg {
					height: 400px;
				}
			`}</style>
		</>
	);
};

export default Done;
