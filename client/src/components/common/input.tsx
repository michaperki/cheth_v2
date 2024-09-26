import { InputHTMLAttributes, DetailedHTMLProps, forwardRef } from 'react'

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  variant?: 'primary' | 'secondary' | 'tertiary'
}

export default forwardRef<HTMLInputElement, Props>(({ variant = 'primary', ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`
        ${variant === 'primary' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-200'}
        text-white
        font-medium
        py-2
        px-4
        rounded
        shadow
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-indigo-500
      `}
      {...props}
    />
  )
})
