import "./Button.css"; // falls du Styles brauchst

function Button({ type = "button", onClick, disabled = false, children, style = "primary" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`button ${style}-button`}
    >
      {children}
    </button>
  );
}

export default Button;
