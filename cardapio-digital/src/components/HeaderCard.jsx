export default function HeaderCard({ id, name, tagline }) {
  return (
    <div className="header-card">
      <h2 id={id}>{name}</h2>
      <p>{tagline}</p>
    </div>
  );
}

