# Task Manager

A Kanban-style task manager built with React, TypeScript, and [`@dnd-kit/react`](https://dndkit.com), featuring drag-and-drop task organization across columns, inline task editing, and persistent state via Zustand.

## Features

- 🗂️ **Kanban board** — tasks organized into columns, each with a live task count
- 🖱️ **Drag and drop** — reorder tasks within a column or move them between columns
- ✏️ **Inline editing** — edit task titles, descriptions, and content directly on the card
- ➕ **Create tasks** — add new tasks via a modal, assigning them to a column on creation
- 🛠️ **Edit tasks** — update a task's details or move it to a different column via an edit modal
- 🔍 **Filter tabs** — filter the view by column, with an "All Tasks" option showing the total count
- 🕳️ **Empty states** — friendly placeholder when a column has no tasks

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — dev server and build tooling
- **Tailwind CSS v4** — styling
- **Zustand** — global task state management
- **@dnd-kit/react** + **@dnd-kit/helpers** — drag-and-drop and sortable lists
- **shadcn/ui** + **@base-ui/react** — UI primitives (Card, Button, Input, Select, Label, etc.)
- **lucide-react** + **bootstrap-icons** — icon sets

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Starts the Vite dev server with hot module reloading.

### Build

```bash
npm run build
```

Type-checks the project and builds a production bundle.

### Preview

```bash
npm run preview
```

Serves the production build locally.

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── Columns.tsx           # Droppable column container
│   ├── ColumnHeader.tsx      # Column title + task count
│   ├── TaskBox.tsx           # Sortable/draggable task card
│   ├── TaskModal.tsx         # Modal for creating a new task
│   ├── EditModal.tsx         # Modal for editing an existing task
│   ├── EmptyState.tsx        # Placeholder for empty columns
│   ├── FilterTab.tsx         # Column filter tabs
│   ├── TaskTopBar.tsx        # Top bar with filters + "Create Task" button
│   └── ui/                   # shadcn-based UI primitives
├── store/
│   └── useTaskStore.ts       # Zustand store: task state + CRUD actions
└── utils/
    ├── makeTask.ts           # Task type + factory helper
    └── data.ts                # Initial seed data for columns/tasks
```

## State Management

Task data lives in a single Zustand store (`useTaskStore`), keyed by column:

```ts
tasks: Record<string, Task[]>;
```

The store exposes actions for creating, updating, editing (including moving a task between columns), and deleting tasks, plus a `setTasks` updater used by `@dnd-kit`'s `move` helper to sync drag-and-drop changes back into state.

## Drag and Drop

Built with `@dnd-kit/react`:

- `Columns` uses `useDroppable` so tasks can be dropped into any column, even empty ones.
- `TaskBox` uses `useSortable` (grouped by column) so tasks can be reordered within a column or moved across columns.
- `DragDropProvider`'s `onDragOver` handler applies `@dnd-kit/helpers`' `move()` to keep the Zustand store in sync during a drag.
