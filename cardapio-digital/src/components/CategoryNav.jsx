function CategoryNav({ items, activeCategory, onChange }) {
    return (
        <nav className="category-nav" aria-label="Categorias do cardápio">
            {items.map((category) => (
                <button
                    key={category.id}
                    type="button"
                    className={`category-button ${
                        activeCategory === category.id ? 'is-selected' : ''
                    }`}
                    onClick={() => onChange(category.id)}
                >
                    {category.name}
                </button>
            ))}
        </nav>
    );
}

export default CategoryNav;
