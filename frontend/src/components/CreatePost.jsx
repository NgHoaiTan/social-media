import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SquarePlus, ImageIcon } from "lucide-react";
import { useState, useRef } from "react";
import axios from "@/utils/axiosInstance";
import { toast } from "react-toastify";

function CreatePost({ user }) {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const fileInputRef = useRef();
  const textareaRef = useRef();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...files]);
    setPreviewUrls((prev) => [...prev, ...newPreviews]);
  };

  const handlePost = async () => {
    if (!images.length) return toast.warn("Vui lòng chọn ít nhất 1 ảnh!");

    const formData = new FormData();
    formData.append("caption", content);
    formData.append("file", images[0]); // nếu backend chỉ nhận 1 ảnh

    try {
      const res = await axios.post("/posts", formData);
      if (res.data.success) toast.success("Đăng bài thành công!");

      setContent("");
      setImages([]);
      setPreviewUrls([]);
    } catch (error) {
      toast.error(
        `Lỗi đăng bài: ${error.response?.data?.error || error.message}`
      );
    }
  };

  const getInitials = (name) => {
    if (!name) return "UN";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("");
  };

  const handleTextareaChange = (e) => {
    setContent(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <li className="flex items-center space-x-3 hover:bg-gray-200 p-2 rounded-xl transition duration-200 cursor-pointer">
          <div className="w-10 h-10 flex items-center justify-center bg-red-100 rounded-full">
            <SquarePlus className="w-5 h-5 text-red-600" />
          </div>
          <span className="font-medium text-base">Thêm bài viết</span>
        </li>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl bg-white rounded-xl max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-xl text-center">
            Tạo bài viết
          </DialogTitle>
        </DialogHeader>

        {/* Nội dung có thể cuộn */}
        <div className="px-6 pb-4 overflow-y-auto max-h-[65vh]">
          <div className="flex items-center space-x-3 mb-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.profilePicture || ""} />
              <AvatarFallback>{getInitials(user?.username)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{user?.username}</p>
              <span className="text-sm text-gray-500">Bạn bè</span>
            </div>
          </div>

          <Textarea
            ref={textareaRef}
            placeholder={`${user?.username || "Bạn"} ơi, bạn đang nghĩ gì thế?`}
            className="resize-none overflow-hidden min-h-[50px] text-base border-none focus:ring-0 shadow-none"
            value={content}
            onChange={handleTextareaChange}
          />

          {previewUrls.length > 0 && (
            <div className="mt-4 rounded-md bg-gray-100 overflow-hidden">
              {previewUrls.length === 1 ? (
                <div className="h-[500px]">
                  <img
                    src={previewUrls[0].url}
                    alt="preview-0"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-1 h-[500px]">
                  <div className="col-span-2 row-span-2">
                    <img
                      src={previewUrls[0].url}
                      alt="preview-0"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {previewUrls.slice(1, 5).map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={img.url}
                        alt={`preview-${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {index === 3 && previewUrls.length > 5 && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center text-xl font-semibold">
                          +{previewUrls.length - 5}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="border-t px-6 py-4 flex justify-between items-center bg-white sticky bottom-0">
          <Button
            type="button"
            variant="ghost"
            onClick={() => fileInputRef.current.click()}
          >
            <ImageIcon className="w-5 h-5 mr-2" />
            Thêm ảnh
          </Button>

          <DialogClose asChild>
            <Button onClick={handlePost}>Đăng</Button>
          </DialogClose>
        </div>

        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
      </DialogContent>
    </Dialog>
  );
}

export default CreatePost;
