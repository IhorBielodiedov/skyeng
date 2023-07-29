import { render, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import UserProfile from "../index";

test("renders error message when API request fails", async () => {
  const username = "testuser";

  // Создаем mock для axios, чтобы имитировать ответ от API
  const mock = new MockAdapter(axios);

  // Устанавливаем заглушку для GET-запроса к API, чтобы он возвращал ошибку 404
  mock.onGet(`https://api.github.com/users/${username}`).reply(404);

  // Рендерим компонент UserProfile, передавая имя пользователя в URL
  const { queryAllByText } = render(
    <MemoryRouter initialEntries={[`/user/${username}`]}>
      <Routes>
        <Route path="/user/:username" element={<UserProfile />} />
      </Routes>
    </MemoryRouter>
  );

  // Ожидаем появления сообщения об ошибке в компоненте UserProfile
  await waitFor(() => {
    const errorMessages = queryAllByText((content, element) => {
      // Проверяем, что найденные элементы содержат текст ошибки
      return (
        element.tagName.toLowerCase() === "div" &&
        element.textContent.includes(
          "Ошибка при получении данных из GitHub API"
        )
      );
    });

    // Проверяем, что хотя бы одно сообщение об ошибке найдено
    expect(errorMessages.length).toBeGreaterThan(0);
  });
});
