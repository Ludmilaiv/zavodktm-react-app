const Button = ({addClass, buttonSpan, type, onClick, style}) => {
  const className = `button button_normal ${addClass}`;
  if (onClick) {
    return (
    <div className={className} onClick={onClick} style={style}>
      {buttonSpan}
    </div>
    )
  } else {
    return (
      <div className={className} style={style}>
        {buttonSpan}
      </div>
      )
  }
  
}

export default Button