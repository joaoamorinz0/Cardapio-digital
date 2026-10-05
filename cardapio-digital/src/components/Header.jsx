function Header({ store }) {
    return (
        <header className="header">
            <div className="brand">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
                    alt="Logo do Cardápio Digital"
                    className="logo"
                />
                <div>
                    <h1>{store.name}</h1>
                    <p className="tagline">{store.tagline}</p>
                </div>
            </div>

            <div className="header-meta">
                <span>📍 Entrega</span>
                <span>🕒 {store.hours}</span>
            </div>
        </header>
    );
}

export default Header;