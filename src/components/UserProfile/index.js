// UserProfile.js
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./UserProfile.scss"; // Подключение стилей для компонента UserProfile

const UserProfile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null); // Добавляем состояние для ошибки

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}`
        );
        setUserData(response.data);
        setError(null); // Устанавливаем ошибку в null при успешном запросе
      } catch (error) {
        setError(error); // Сохраняем ошибку в состояние при неудачном запросе
      }
    };
    fetchUserData();
  }, [username]);

  if (error) {
    // Отображаем сообщение об ошибке, если она есть
    return (
      <div>Ошибка при получении данных из GitHub API: {error.message}</div>
    );
  }

  if (!userData) {
    return <div>Загрузка...</div>;
  }

  // Компонент UserProfile отображает информацию о пользователе
  return (
    <div className="user-profile">
      {/* Отображение аватара пользователя */}
      <img
        className="user-avatar"
        src={userData.avatar_url}
        alt={userData.login}
      />
      {/* Отображение основной информации о пользователе */}
      <div className="user-info">
        <h2>{userData.login}</h2>
        <p>Имя: {userData.name}</p>
        <p>Количество репозиториев: {userData.public_repos}</p>
        <p>Количество подписчиков: {userData.followers}</p>
        <p>
          Ссылка на профиль:{" "}
          <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
            {userData.html_url}
          </a>
        </p>
      </div>
      {/* Отображение дополнительной информации о пользователе, если она есть */}
      {userData.bio && <p className="user-bio">Описание: {userData.bio}</p>}
      {/* Кнопка для возврата к поиску пользователей */}
      <Link className="back-link" to="/">
        Назад к поиску пользователей
      </Link>
    </div>
  );
};

export default UserProfile;
