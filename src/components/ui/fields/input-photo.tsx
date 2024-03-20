import * as Modal from "@/components/ui/modal";
import { LucideImage, LucideImagePlus } from "lucide-react";
import React, { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import Button from "../button";
import Typography from "../typography";
// import { Container } from './styles';

interface InputPhotoProps {
  file: File | null;
  setFile: (file: File | null) => void;
}

const getCroppedImg = (imageSrc, crop) => {
  const canvas = document.createElement("canvas");
  const image = new Image();
  image.src = imageSrc;

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const ctx = canvas.getContext("2d");

  canvas.width = crop.width;
  canvas.height = crop.height;

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        //reject(new Error('Canvas is empty'))
        console.error("Canvas is empty");
        return;
      }
      blob.name = fileName;
      window.URL.revokeObjectURL(fileUrl);
      fileUrl = window.URL.createObjectURL(blob);
      resolve(fileUrl);
    }, "image/jpeg");
  });
};

const InputPhoto: React.FC<InputPhotoProps> = ({ file, setFile }) => {
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const [croppedImage, setCroppedImage] = useState<File | null>(file);

  const [isOpenCrop, setIsOpenCrop] = useState<boolean>(false);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = useCallback(async (croppedArea, croppedAreaPixels) => {
    const croppedImage = await getCroppedImg(croppedImage, croppedAreaPixels);
    setCroppedImage(croppedImage);
  }, []);

  const setFileAndOpenCrop = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setIsOpenCrop(true);
  };

  const handleConfirmImage = () => {
    setIsOpenCrop(false);
  };

  return (
    <>
      <input
        ref={inputFileRef}
        className="hidden"
        type="file"
        accept="image/*"
        onChange={(e) => setFileAndOpenCrop(e)}
      />
      {file ? (
        <div className="w-44 flex flex-col gap-2">
          <img
            src={URL.createObjectURL(file)}
            alt="Imagem selecionada"
            className="w-44 h-44 object-cover rounded"
          />
          <Button className="w-full" onClick={() => setFile(null)}>
            Remover Imagem
          </Button>
        </div>
      ) : (
        <div
          className="w-44 h-44 flex flex-col gap-2 justify-center items-center rounded bg-gray-300 hover:cursor-pointer hover:border hover:border-gray-950 transition duration-300 ease-in-out"
          onClick={() => {
            inputFileRef.current?.click();
          }}
        >
          <LucideImage name="image" className="text-gray-700" size={32} />
          <Typography className="text-gray-700">
            Selecione uma imagem
          </Typography>
        </div>
      )}

      <Modal.Root open={isOpenCrop}>
        <Modal.Header
          title="Selecione a área da imagem"
          onClose={() => console.log("close")}
          icon={<LucideImagePlus />}
        />
        <div className="flex h-48 w-48 flex-col justify-center items-center py-6 z-10">
          {croppedImage && (
            <Cropper
              image={URL.createObjectURL(croppedImage)}
              crop={crop}
              zoom={zoom}
              aspect={4 / 4}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          )}
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={handleConfirmImage} className="z-10">
            Confirmar
          </Button>
        </div>
      </Modal.Root>
    </>
  );
};

export default InputPhoto;
