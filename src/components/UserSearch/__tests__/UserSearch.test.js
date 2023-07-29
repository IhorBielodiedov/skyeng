import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import UserSearch from "../index";

test("renders UserSearch component correctly", async () => {
  // Рендерим компонент UserSearch с использованием MemoryRouter для начального пути "/"
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<UserSearch />} />
      </Routes>
    </MemoryRouter>
  );

  // Тестирование отображения компонента UserSearch
  const searchInput = screen.getByPlaceholderText("Введите имя пользователя");
  const searchButton = screen.getByText("Поиск");

  // Проверяем, что поле ввода и кнопка "Поиск" присутствуют на странице
  expect(searchInput).toBeInTheDocument();
  expect(searchButton).toBeInTheDocument();
});

test("shows warning when searching with empty input", () => {
  // Рендерим компонент UserSearch с использованием MemoryRouter для начального пути "/"
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<UserSearch />} />
      </Routes>
    </MemoryRouter>
  );

  // Тестирование предупреждения при поиске с пустым вводом
  const searchButton = screen.getByText("Поиск");

  // Кликаем на кнопку "Поиск" без ввода текста в поле поиска
  fireEvent.click(searchButton);

  // Проверяем, что предупреждение "Введите текст для поиска" отображается на странице
  const warning = screen.getByText("Введите текст для поиска");
  expect(warning).toBeInTheDocument();
});
