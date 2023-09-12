import { BiImageAlt } from "react-icons/bi";
import { useCallback, useState } from "react";
import { userCurrentUser } from "@/hooks/user";
import Image from "next/image";
import { useCreateTweet } from "@/hooks/tweet";

export default function Home() {
	const { user } = userCurrentUser();

	const { mutate } = useCreateTweet();

	const [content, setContent] = useState("");

	const handleCreateTweet = useCallback(() => {
		mutate({
			content,
		});
	}, [content, mutate]);

	const handleSelectImage = useCallback(() => {
		const input = document.createElement("input");
		input.setAttribute("type", "file");
		input.setAttribute("accept", "image/*");
		input.click();
	}, []);

	return (
		<div>
			<div>
				<div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-4  hover:bg-slate-900 transition-all cursor-pointer">
					<div className="grid grid-cols-12 gap-3">
						<div className="col-span-1 ">
							{user?.profileImageUrl && (
								<Image
									className="rounded-full"
									src={user?.profileImageUrl}
									alt="user-image"
									height={50}
									width={50}
								/>
							)}
						</div>
						<div className="col-span-11">
							<textarea
								value={content}
								onChange={(e) => setContent(e.target.value)}
								className=" w-full bg-transparent text-xl px-3 border-b border-slate-700   "
								placeholder="What's happening?"
								rows={4}
							></textarea>
							<div className="mt-2 flex justify-between items-center ">
								<BiImageAlt
									onClick={handleSelectImage}
									className="text-xl"
								/>
								<button
									onClick={handleCreateTweet}
									className="bg-[#1d9bf0] font-semibold py-1 px-4 text-sm rounded-full "
								>
									Tweet
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
