import { forwardRef } from 'react';
import cn from 'classnames';
import Cleave from 'cleave.js/react';
import 'cleave.js/dist/addons/cleave-phone.us';

interface PhoneNumberInputProps {
	name: string;
	label: string;
	error?: string;
	variant?: 'normal' | 'solid' | 'outline';
	className?: string;
	inputClassName?: string;
	shadow?: boolean;
}

const variantClasses = {
	normal:
		'bg-gray-100 border border-gray-300 focus:shadow focus:bg-white focus:border-primary',
	solid:
		'bg-gray-100 border border-gray-100 focus:bg-white focus:border-primary',
	outline: 'border border-gray-300 focus:border-primary',
};

const PhoneNumberInput = forwardRef<HTMLInputElement, PhoneNumberInputProps>(
	(
		{
			name,
			label,
			error,
			variant = 'normal',
			className,
			inputClassName,
			shadow = false,
		},
		ref
	) => {
		return (
			<div className={className}>
				<label htmlFor={name} className="block mb-2 text-sm text-body">
					{label}
				</label>
				<Cleave
					id={name}
					name={name}
					className={cn(
						'py-3 px-4 w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0',
						shadow && 'focus:shadow',
						variantClasses[variant],
						inputClassName
					)}
					options={{ phone: true, phoneRegionCode: 'US' }}
					//@ts-ignore
					htmlRef={ref}
					autoComplete="off"
					autoCorrect="off"
					autoCapitalize="off"
					spellCheck="false"
					aria-invalid={error ? 'true' : 'false'}
				/>
				{error && <p className="my-2 text-xs text-red-500">{error}</p>}
			</div>
		);
	}
);

export default PhoneNumberInput;
