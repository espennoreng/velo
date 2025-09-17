# Velo

Velo is a mobile application built with [Expo](https://expo.dev/) and [React Native](https://reactnative.dev/) designed to streamline inspections, member management, and organizational settings. The project features a modular architecture with reusable components and custom hooks for theming and color schemes.

## Features
- Inspection management with types and images
- Member management and invitations
- Organization settings and join/manage flows
- Home dashboard with items and last inspections
- Custom UI components (collapsible views, parallax scroll, themed text/views)
- Hooks for color scheme and theming
- Script for project reset

## Folder Structure
```
app/
  ├── _layout.tsx
  ├── +not-found.tsx
  ├── (inspections)/
  ├── (tabs)/
  │   ├── (home)/
  │   ├── (members)/
  │   └── (settings)/
assets/
  ├── fonts/
  └── images/
components/
  ├── ui/
  ├── input/
  ├── inspectionType/
  ├── item/
  ├── lastInspection/
  ├── progress/
  └── search/
constants/
  └── Colors.ts
hooks/
  ├── useColorScheme.ts
  ├── useColorScheme.web.ts
  └── useThemeColor.ts
scripts/
  └── reset-project.js
types/
  ├── inspectionType.ts
  ├── invite.ts
  ├── item.ts
  ├── lastInspection.ts
  └── member.ts
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or newer recommended)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Installation
```bash
# Install dependencies
npm install
# or
yarn install
```

### Running the App
```bash
# Start the Expo development server
npx expo start
```

### Scripts
- `scripts/reset-project.js`: Resets the project to a clean state.

## Contributing
Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

## License
This project is licensed under the MIT License.
