function Row({ title, children }) {
  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row-cards">
        {children}
      </div>
    </div>
  );
}

export default Row;