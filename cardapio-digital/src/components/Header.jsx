function Header() {
    const openTime = 11;
    const closeTime = 23;

    if (openTime >= closeTime) {
        
    }

    return (
        <header className="header">
            <img src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png" alt="Logo do Cardápio Digital" className="logo" />
            <h1>Cardápio Digital</h1>
            <h2>Os melhores Hamburgueres e batatas da cidade!</h2>
            <p className="operating-hours">Funcionamento: {openTime}:00 às {closeTime}:00</p>
        </header>
    );
}

export default Header;