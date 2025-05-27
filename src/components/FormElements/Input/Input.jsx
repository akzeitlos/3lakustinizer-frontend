import "./Input.css";

function Input({ label, name, type = "text", required = false, value, onChange }) {
  return (
    <div className="input-field">
      <input
        type={type}
        name={name}
        required={required}         
        value={value}               
        onChange={onChange}         
      />
      {label && <label htmlFor={name}>{label}</label>}
    </div>
  );
}

export default Input;
