function Button({ children, onClick }) {
  return (
    <button type="button" className="custom-button" onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;