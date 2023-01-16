import { Group, Text, useMantineTheme } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons";
import { useState } from "react";
import GlobalHelper from "../../../Helpers/GlobalHelper";
import UserHelper from "../../../Helpers/UserHelper";
import ImageCrpperModal from "../../utils/ImageCrpperModal";

const Step2 = ({ form, isUpdate }) => {
	const theme = useMantineTheme();
	const [cropModal, setCropModal] = useState(false);
	const [image, setImage] = useState();
	const [imageErrors, setImageErrors] = useState(null);
	const userHelper = new UserHelper();
	const globalHelper = new GlobalHelper();

	const onSave = async () => {
		if (editor) {
			const canvas = editor.getImageScaledToCanvas().toDataURL();
			let file = globalHelper.dataURLtoFile(canvas, form.values.image.name);
			form.setFieldValue("image", file);
			let res = await userHelper.uploadImage(file);
			if (res) {
				form.setFieldValue("attachment_id", res.attachment_id.toString());
			}
		}
	};
	const onCancel = () => {
		form.setFieldValue("image", image);
	};
	let editor = "";
	const setEditorRef = (edit) => (editor = edit);
	return (
		<>
			<div>
				<div className='my-5'>
					<div className='text-center font-medium text-xl mb-3'>
						User Profile :
					</div>
					<Dropzone
						onDrop={(files) => {
							form.setFieldValue("image", files[0]);
							setImage(files[0]);
							setCropModal(true);
							setImageErrors(null);
						}}
						onReject={async (files) => {
							await setImageErrors(files[0]);
						}}
						maxSize={4 * 1024 * 1024}
						className={`mx-auto h-48 w-48 overflow-hidden ${
							form.values.image ? "p-0" : ""
						}`}
						accept={IMAGE_MIME_TYPE}
						multiple={false}
						useFsAccessApi={false}
						activateOnClick={true}>
						{form.values.image ? (
							<div
								style={{
									backgroundImage: `url('${
										typeof form.values.image == "object"
											? URL.createObjectURL(form.values.image)
											: form.values.image
									}')`,
								}}
								className=' h-48 w-48 bg-no-repeat bg-cover bg-center'></div>
						) : (
							<Group
								position='center'
								spacing='xl'
								style={{ minHeight: 160, pointerEvents: "none" }}>
								<Dropzone.Accept>
									<IconUpload
										size={80}
										stroke={1.5}
										color={
											theme.colors[theme.primaryColor][
												theme.colorScheme === "dark" ? 4 : 6
											]
										}
									/>
								</Dropzone.Accept>
								<Dropzone.Reject>
									<IconX
										size={50}
										stroke={1.5}
										color={
											theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]
										}
									/>
								</Dropzone.Reject>
								<Dropzone.Idle>
									<IconPhoto size={80} stroke={1.5} />
								</Dropzone.Idle>
								<div>
									<Text size='md' inline align={"center"}>
										Drag image here or click to select image
									</Text>
								</div>
							</Group>
						)}
					</Dropzone>
					{form.values.image && (
						<ImageCrpperModal
							value={form.values.image}
							show={cropModal}
							setShow={setCropModal}
							onSave={onSave}
							onCancel={onCancel}
							setEditorRef={setEditorRef}
						/>
					)}
					<div
						className='text-center mt-5'
						style={{ color: theme.colors.red[6] }}>
						{imageErrors?.errors.map((error, i) => (
							<div key={i}>{error.message}</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Step2;
