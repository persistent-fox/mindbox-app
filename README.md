# Todo-app with React, Redux, Typescript

- Я использовала чистый Redux, так как в тестовом задании было четко указано использовать именно его, а не Toolkit.
- В моем проекте используется mockapi для создания временных фейковых запросов на сервер
- Тесты написаны для tasks-reducer
- Я использовала styled-components для стилизации компонентов

## Здесь можно посмотреть как выглядит сам todo-app

Откройте [Todo-app](https://persistent-fox.github.io/mindbox-app/) чтобы увидеть приложение

## Реализованные функции

- создание задачи с приоритетом
- изменение статуса выполнения задачи
- удаление задачи
- возможность отсортировать задачи по приоритетам
- возможность отсортировать задачи по выполненным/невыполненным задачам, включая приоритет
- изменение заголовка для задачи с помощью double-клика
- отображение количества выполненных задач

## Особенности

- обработана ошибка, в случае обновления заголовка для задачи. Сначала заголовок меняется на новый, но в случае, если с сервера приходит ошибка, то заголовок вновь меняется на старый. Здесь использован оптимистичный подход к изменению заголовка.
- при изменении задачи (статус, заголовок, удаление) пока не придет ответ от сервера будет запрещено изменять задачу
- нельзя создать задачу с количеством символов меньше 5
- если при изменении заголовка задачи не меняется заголовок, то запрос на сервер не отправляется, задача остается неизменной

## Что хотела добавить:
- была заложена база для изменения темы приложения, но не было реализовано
