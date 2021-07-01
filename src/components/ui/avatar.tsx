import cn from "classnames";

type AvatarProps = {
	className?: string;
	src: string;
	title: string;
	[key: string]: unknown;
};

const Avatar: React.FC<AvatarProps> = ({ src, className, title, ...rest }) => {
	return (
		<div
			className={cn(
				"relative cursor-pointer w-10 h-10 overflow-hidden rounded-full border border-gray-100",
				className
			)}
			{...rest}
		>
			<img alt={title} src={src} />
		</div>
	);
};

export default Avatar;
