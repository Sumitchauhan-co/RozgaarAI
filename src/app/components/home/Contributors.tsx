"use client";

import { AvatarCircles } from "@/components/ui/avatar-circles";

const contributors = [
  {
    imageUrl: "https://avatars.githubusercontent.com/u/189152417?v=4",
    profileUrl: "https://github.com/Pathik0701",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/181889969?v=4",
    profileUrl: "https://github.com/simar0911",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/212151764?v=4",
    profileUrl: "https://github.com/Sumitchauhan-co",
  },
];

export default function StaticContributors() {
  return (
    <div className="inline-flex items-center gap-4 rounded-full border border-[#ECE3DA] bg-white/80 px-5 py-2.5 shadow-xs backdrop-blur-md transition-all hover:border-[#D8C7B8] hover:shadow-md">
      <AvatarCircles numPeople={0} avatarUrls={contributors} />
      <div className="flex flex-col text-left">
        <span className="text-xs font-bold text-[#2B0F05]">
          Built by passionate contributors
        </span>
        <span className="text-xs font-medium text-[#7A726C]">
          Join the community of RozgaarAI on GitHub
        </span>
      </div>
    </div>
  );
}
