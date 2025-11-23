import { useTheme } from '../Context/ThemeContext';
import { HiMoon, HiSun } from 'react-icons/hi';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <HiMoon className="w-5 h-5" />
            ) : (
                <HiSun className="w-5 h-5" />
            )}
        </button>
    );
};

export default ThemeToggle;
