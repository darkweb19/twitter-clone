import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from "react-icons/bs";
import { BiHomeCircle, BiHash, BiUser, BiMoney } from "react-icons/bi";
import { SlOptions } from "react-icons/sl";
import FeedCard from "@/components/FeedCard";

interface TwitterSidebarButton {
	title: string;
	icon: React.ReactNode;
}

const sidebarMenuItems: TwitterSidebarButton[] = [
	{
		title: "Home",
		icon: <BiHomeCircle />,
	},
	{
		title: "Explore",
		icon: <BiHash />,
	},
	{
		title: "Notifications",
		icon: <BsBell />,
	},
	{
		title: "Messages",
		icon: <BsEnvelope />,
	},
	{
		title: "Bookmarks",
		icon: <BsBookmark />,
	},
	{
		title: "Verified",
		icon: <BiMoney />,
	},
	{
		title: "Profile",
		icon: <BiUser />,
	},
	{
		title: "More",
		icon: <SlOptions />,
	},
];

export default function Home() {
	return (
		<div>
			<div className="grid grid-cols-12 gap-3 h-screen w-screen px-32">
				<div className="col-span-3  mr-20   ">
					<div className=" h-fit w-fit text-2xl hover:bg-gray-700 rounded-full p-4 cursor-pointer transition-all">
						<BsTwitter />
					</div>
					<div className="mt-1 text-xl pr-4">
						<ul>
							{sidebarMenuItems.map((item) => (
								<li
									className="flex justify-start items-center gap-4 px-3 py-3 cursor-pointer rounded-full w-fit hover:bg-gray-900 mt-2"
									key={item.title}
								>
									<span className="text-2xl">
										{item.icon}{" "}
									</span>
									<span>{item.title} </span>
								</li>
							))}
						</ul>
						<div className="mt-5 px-3 ">
							<button className="bg-[#1d9bf0] font-semibold py-3 px-4 text-lg rounded-full w-full">
								Tweet
							</button>
						</div>
					</div>
				</div>
				<div className="col-span-6 border-r-[1px] border-l-[1px] h-screen overflow-scroll border-gray-600">
					<FeedCard />
					<FeedCard />
					<FeedCard />
					<FeedCard />
					<FeedCard />
					<FeedCard />
					<FeedCard />
					<FeedCard />
					<FeedCard />
					<FeedCard />
					<FeedCard />
					<FeedCard />
				</div>
				<div className="col-span-3 "></div>
			</div>
		</div>
	);
}
