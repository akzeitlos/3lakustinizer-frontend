import "./Button.css"; // falls du Styles brauchst

function Button({ type = "button", onClick, disabled = false, children, className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`button primary-button ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
