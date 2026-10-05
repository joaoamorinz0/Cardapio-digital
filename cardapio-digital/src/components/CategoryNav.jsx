function CategoryNav() {
    const categories = ['Hambúrgueres', 'Acompanhamentos', 'Sobremesas', 'Bebidas'];

    return (
        <nav className="category-nav">
            <ul>
                {categories.map((category, index) => (
                    <li key={index}>
                        <a className="category-link" href={`#${category.toLowerCase().replace(' ', '-')}`}>{category}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default CategoryNav;
