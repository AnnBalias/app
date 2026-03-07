Ти вже клонувала репозиторій, тому просто відкрий термінал у VS Code.

1. Перевір, ти маєш бути в папці свого проєкту:

Команда: pwd
Результат: /c/Users/User/Documents/Projects/app

2. Створи Expo проект з TypeScript
   У папці репозиторію виконай:

npx create-expo-app@latest . --template

Вибери:

Blank (TypeScript)

Крапка . означає створити проект у поточній папці.

3. Встанови залежності

Якщо вони не встановились автоматично:

npm install

4. Запусти проект
   npm run start

Або

npx expo start

Відкриється Expo Dev Tools у браузері.
