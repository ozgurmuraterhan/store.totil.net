import Search from "@components/common/search";
import { useUI } from "@contexts/ui.context";
import { BannerType } from "@settings/site-pages.settings";
import Image from "next/image";
import { Waypoint } from "react-waypoint";
import cn from "classnames";

type BannerProps = {
  banner: BannerType;
  className?: string;
};
const Banner: React.FC<BannerProps> = ({ banner, className }) => {
  const { showHeaderSearch, hideHeaderSearch } = useUI();
  const onWaypointPositionChange = ({
    currentPosition,
  }: Waypoint.CallbackArgs) => {
    if (!currentPosition || currentPosition === "above") {
      showHeaderSearch();
    }
  };
  return (
    <div className={cn("hidden lg:block relative", className)}>
      <div className="min-h-140 overflow-hidden -z-1">
        <Image
          alt={banner?.heading}
          src={banner?.image ?? "/banner/grocery.png"}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-5 mt-8 absolute inset-0 w-full flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl xl:text-5xl tracking-tight text-heading font-bold mb-5 xl:mb-8">
          {banner?.heading}
        </h1>
        <p className="text-base xl:text-lg text-heading mb-10 xl:mb-14">
          {banner?.subheading}
        </p>
        <div className="max-w-3xl w-full">
          <Search label="grocery search" />
        </div>
        <Waypoint
          onLeave={showHeaderSearch}
          onEnter={hideHeaderSearch}
          onPositionChange={onWaypointPositionChange}
        />
      </div>
    </div>
  );
};

export default Banner;
