const Button = ({addClass, buttonSpan, type, onClick}) => {
  const className = `button button_normal ${addClass}`;
  if (type==="submit" || type==="popup") {
    return (
    <div className={className} onClick={onClick}>
      {buttonSpan}
    </div>
    )
  } else {
    return (
      <div className={className}>
        {buttonSpan}
      </div>
      )
  }
  
}

export default Button