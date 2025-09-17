export const Message = ({message, centerMessage = false}) => {
  return (
    <div className={`${centerMessage && "absolute inset-0 m-auto h-max "}`}><p className="text-center text-black" >{message}</p></div>
  )
}
