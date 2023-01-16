import { Button, Modal, Slider } from "@mantine/core";
import AvatarEditor from "react-avatar-editor";
import { IconCrop } from "@tabler/icons";
import { useState } from "react";

const ImageCrpperModal = ({
	show,
	setShow,
	onSave,
	onCancel,
	setEditorRef,
	value,
}) => {
	const [zoom, setZoom] = useState(0);
	const [rotate, setRotate] = useState(0);

	return (
		<Modal
			opened={show}
			onClose={() => {
				setShow(false);
				setZoom(1);
				setRotate(0);
			}}
			centered
			size={400}
			overlayOpacity={0.5}
			overlayBlur={3}
			transition='pop'
			lockScroll={true}
			title='Crop Image'>
			<div className='flex justify-center'>
				<AvatarEditor
					ref={setEditorRef}
					image={typeof value == "object" ? URL.createObjectURL(value) : value}
					width={200}
					height={200}
					color={[0, 0, 0, 0.6]} // RGBA
					scale={zoom / 25 + 1}
					rotate={rotate}
					borderRadius={100}
					border={40}
				/>
			</div>
			<div className='mt-8'>
				<div className='flex items-center my-2'>
					<div className='w-20 whitespace-nowrap mx-2'>Zoom :</div>
					<Slider
						className='w-full'
						value={zoom}
						min={0}
						max={100}
						step={1}
						onChange={setZoom}
						onChangeEnd={setZoom}
					/>
				</div>
				<div className='flex items-center my-2'>
					<div className='w-20 whitespace-nowrap mx-2'>Rotate :</div>
					<Slider
						className='w-full'
						value={rotate}
						min={0}
						max={360}
						step={1}
						onChange={setRotate}
						onChangeEnd={setRotate}
					/>
				</div>
				<div className='flex justify-end mt-6'>
					<Button
						className='m-1'
						variant={"outline"}
						onClick={() => {
							onCancel();
							setShow(false);
							setZoom(1);
							setRotate(0);
						}}>
						Cancel
					</Button>
					<Button
						className='m-1'
						rightIcon={<IconCrop />}
						variant='gradient'
						onClick={() => {
							onSave();
							setShow(false);
							setZoom(1);
							setRotate(0);
						}}>
						Save
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default ImageCrpperModal;
