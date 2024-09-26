import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef, MouseEvent } from 'react'
interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

export default forwardRef<HTMLButtonElement, Props>(({ ...props }, ref) => {
	return (
		<button
			ref={ref}
			{...props}
		/>
	)
})
