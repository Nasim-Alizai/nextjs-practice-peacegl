import { useDispatch, useSelector } from "react-redux";
import ToasterItem from "./ToasterItem";

const Toaster = () => {
	const toaster = useSelector((state) => state.toaster);

	return (
		<div className=" fixed top-5  right-5" style={{ zIndex: 1000 }}>
			{toaster.map((item, i) => (
				<ToasterItem item={item} key={i} />
			))}
		</div>
	);
};
export default Toaster;
