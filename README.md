# DayOne - Daily Habit Streak Tracker

<p align="center">
  <img src="src/assets/brand/launch-icon.png" alt="DayOne Logo" width="200"/>
</p>

<p align="center">
  <strong>Build lasting habits, one day at a time</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#testing">Testing</a> •
  <a href="#contributing">Contributing</a>
</p>

## 📱 About

DayOne is a mobile application designed to help users build and maintain daily habits through a streak-based tracking system. The app focuses on simplicity and motivation, making it easy for users to track their progress and maintain consistency in their daily routines.

## ✨ Features

- **📊 Habit Management**: Create, edit, and organize your daily habits
- **🔥 Streak Tracking**: Visual streak counters to keep you motivated
- **📅 Daily Check-ins**: Mark habits as complete with a simple tap
- **🎯 Goal Setting**: Set target duration for your habits
- **🔍 Search & Filter**: Quickly find and manage your habits
- **🎨 Custom Icons**: Personalize your habits with icons
- **📈 Progress Visualization**: Track your longest and current streaks
- **💾 Offline Support**: All data stored locally for privacy and offline access

## 🚀 Tech Stack

### Core Technologies
- **React Native** (0.81.4) - Cross-platform mobile development
- **Expo** (~54.0.13) - Development platform and tooling
- **TypeScript** (~5.8.3) - Type-safe development
- **Expo Router** (~5.0.7) - File-based navigation

### State Management & Data
- **React Query** (TanStack Query v5) - Server state management
- **React Hook Form** (7.56.4) - Form management with validation
- **MMKV** (3.3.3) - Fast, encrypted key-value storage
- **Zod** (3.23.8) - Schema validation

### UI & Styling
- **Shopify Restyle** (2.4.5) - Type-safe theming system
- **React Native Reanimated** (4.1.3) - Smooth animations
- **Phosphor React Native** (2.2.1) - Icon library
- **React Native SVG** (15.12.0) - SVG support

### Development Tools
- **Jest** & **Jest Expo** - Testing framework
- **React Native Testing Library** - Component testing
- **Husky** - Git hooks for code quality
- **ESLint** & **Prettier** - Code formatting and linting
- **Babel Module Resolver** - Path aliasing

## 🏁 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or bun package manager
- Expo CLI
- iOS Simulator (Mac only) or Android Emulator

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/DayOne.git
cd DayOne
```

2. **Install dependencies**
```bash
# Using npm
npm install

# Using yarn
yarn install

# Using bun
bun install
```

3. **Start the development server**
```bash
npm start
# or
yarn start
# or
bun start
```

4. **Run on your device/emulator**
```bash
# For iOS
npm run ios

# For Android
npm run android

# For Web
npm run web
```

## 🏗️ Architecture

### Project Structure

```
DayOne/
├── app/                    # Expo Router navigation
│   ├── (app)/             # Authenticated app routes
│   ├── _layout.tsx        # Root layout
│   └── index.tsx          # Entry point
├── src/
│   ├── assets/            # Images, fonts, and static files
│   ├── infra/             # Infrastructure layer
│   │   ├── adapters/      # External service adapters
│   │   ├── config/        # Configuration files
│   │   ├── repository/    # Data persistence layer
│   │   └── types/         # Infrastructure types
│   ├── modules/           # Feature modules
│   │   ├── habit/         # Habit management module
│   │   │   ├── domain/    # Business logic and entities
│   │   │   ├── screens/   # UI components
│   │   │   └── __tests__/ # Module tests
│   │   └── streak/        # Streak tracking module
│   │       ├── domain/    # Business logic and entities
│   │       └── __tests__/ # Module tests
│   ├── shared/            # Shared components and utilities
│   │   ├── helpers/       # Utility functions
│   │   ├── hooks/         # Custom React hooks
│   │   ├── layout/        # Layout components
│   │   ├── navigation/    # Navigation utilities
│   │   ├── services/      # Shared services
│   │   └── ui/            # UI components library
│   ├── styles/            # Global styles and themes
│   └── test/              # Test utilities and setup
```

### Design Patterns

- **Domain-Driven Design**: Clear separation between domain logic and infrastructure
- **Use Case Pattern**: Business logic encapsulated in service classes
- **Repository Pattern**: Abstraction layer for data persistence
- **Dependency Injection**: Loose coupling between modules
- **Component Composition**: Reusable UI components with consistent APIs

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Watch mode for development
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Structure

The project includes comprehensive testing at multiple levels:

#### Unit Tests
- **Service Layer**: Testing business logic in isolation
- **Domain Models**: Validating entity behaviors
- **Utilities**: Testing helper functions

#### Integration Tests
- **Screen Flows**: Testing complete user journeys
- **Data Persistence**: Verifying repository operations
- **Navigation**: Testing routing and deep linking

### Test Files Organization
```
__tests__/
├── *.integration.test.ts   # Integration tests for screens
└── *.service.test.ts        # Unit tests for services
```

### Pre-commit Hooks
Tests automatically run before each commit via Husky to ensure code quality.

## 🤝 Contributing

We welcome contributions to DayOne! Here's how you can help:

### Development Process

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following our coding standards
3. **Write/update tests** for your changes
4. **Ensure all tests pass** with `npm test`
5. **Submit a pull request** with a clear description

### Coding Standards

- **TypeScript**: Use proper types, avoid `any`
- **Components**: Functional components with hooks
- **Naming**: Use descriptive, consistent naming
- **Comments**: Document complex logic
- **Testing**: Maintain or improve test coverage

### Commit Convention

Follow conventional commits format:
```
type(scope): description

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Bug Reports

Please use GitHub Issues to report bugs. Include:
- Device and OS version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

### Feature Requests

We'd love to hear your ideas! Please submit feature requests as GitHub Issues with:
- Clear use case description
- Proposed solution (optional)
- Alternative solutions considered

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Expo](https://expo.dev/)
- Icons by [Phosphor Icons](https://phosphoricons.com/)
- Type-safe theming with [Shopify Restyle](https://github.com/Shopify/restyle)

## 📞 Contact

- **GitHub Issues**: For bug reports and feature requests
- **Discussions**: For questions and community support

---

<p align="center">
  Made with ❤️ by the DayOne Team
</p>