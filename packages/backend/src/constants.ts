export const DATA = 'data' as const;
export const MESSAGE = 'message' as const;

export const statuses = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const responseTexts = {
  'Переданы некорректные данные при создании карточки': 'Переданы некорректные данные при создании карточки',
  'Карточка с указанным _id не найдена': 'Карточка с указанным _id не найдена',
  'Передан несуществующий _id карточки': 'Передан несуществующий _id карточки',
  'На сервере произошла ошибка': 'На сервере произошла ошибка',
  'Данный маршрут не существует': 'Данный маршрут не существует',
  'Переданы некорректные данные при создании пользователя': 'Переданы некорректные данные при создании пользователя',
  'Пользователь по указанному _id не найден': 'Пользователь по указанному _id не найден',
  'Переданы некорректные данные при обновлении профиля': 'Переданы некорректные данные при обновлении профиля',
  'Переданы некорректные данные при обновлении аватара': 'Переданы некорректные данные при обновлении аватара',
  'Переданы некорректные данные при авторизации': 'Переданы некорректные данные при авторизации',
  'Пользователь по указанному email не найден': 'Пользователь по указанному email не найден',
  'Пользователь по указанному password не найден': 'Пользователь по указанному password не найден',
  'Поле "password" должно быть больше 5 символов': 'Поле "password" должно быть больше 5 символов',
} as const;
