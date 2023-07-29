import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./UserSearch.scss"; // Подключение стилей для компонента UserSearch

const UserSearch = () => {
  // Использование React Hooks для состояния и эффектов
  const [searchQuery, setSearchQuery] = useState(""); // Состояние для хранения строки поиска
  const [searchResults, setSearchResults] = useState([]); // Состояние для хранения результатов поиска
  const [sortOrder, setSortOrder] = useState("desc"); // Состояние для хранения порядка сортировки
  const [currentPage, setCurrentPage] = useState(1); // Состояние для хранения текущей страницы пагинации
  const [inputWarning, setInputWarning] = useState(false); // Состояние для отображения предупреждения при пустой строке поиска

  // Обработчик изменения текста в поле поиска
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setInputWarning(false); // Сброс предупреждения при вводе текста
  };

  // Обработчик отправки формы поиска
  const handleSearchSubmit = async (event) => {
    if (event) event.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults([]); // Очистка результатов поиска при пустой строке
      setInputWarning(true); // Установка предупреждения, если поле ввода пустое
      return;
    }
    try {
      // Запрос к GitHub API для поиска пользователей
      const response = await axios.get(
        `https://api.github.com/search/users?q=${searchQuery}&sort=repositories&order=${sortOrder}&per_page=30&page=${currentPage}`
      );
      setSearchResults(response.data.items); // Обновление состояния результатов поиска
    } catch (error) {
      console.error("Ошибка при получении данных из GitHub API", error);
    }
  };

  // Обработчик смены порядка сортировки
  const handleSortToggle = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  // Обработчик смены текущей страницы пагинации
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Эффект для вызова функции поиска при изменении порядка сортировки или текущей страницы пагинации
  useEffect(() => {
    handleSearchSubmit();
  }, [sortOrder, currentPage]);

  return (
    <div>
      <form onSubmit={handleSearchSubmit} className="search-form">
        <div className="search-form-input-group">
          <input
            className="search-form-input"
            type="text"
            placeholder="Введите имя пользователя"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="search-form-btn" type="submit">
            Поиск
          </button>
        </div>
        {inputWarning && (
          <p className="search-form-warning">Введите текст для поиска</p>
        )}
      </form>

      {/* Отображение кнопки сортировки при наличии результатов поиска */}
      {searchResults.length > 0 && (
        <div>
          <button
            className="search-page-button__item"
            onClick={handleSortToggle}
          >
            Сортировать по {sortOrder === "desc" ? "убыванию" : "возрастанию"}
          </button>
        </div>
      )}
      {/* Отображение списка пользователей с использованием компонента Link для перенаправления на их профили */}
      {searchResults.map((user) => (
        <Link key={user.id} to={`/user/${user.login}`}>
          <div>{user.login}</div>
        </Link>
      ))}

      {/* Отображение кнопок пагинации при наличии результатов поиска */}
      {searchResults.length > 0 && (
        <div className="search-page-button">
          <button
            className="search-page-button__item"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Предыдущая страница
          </button>
          <button
            className="search-page-button__item"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Следующая страница
          </button>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
