
export const TOOL_DEFINITIONS = [
  {
    name: "CREATE_HABIT",
    description: "Create a new habit for the user with specified frequency and time.",
    parameters: {
      type: "dict",
      properties: {
        title: {
          type: "string",
          description: "The name/title of the habit",
        },
        description: {
          type: "string",
          description: "A detailed description of the habit",
        },
        frequency: {
          type: "string",
          description: "How often the habit should be performed: 'daily', 'weekly', or 'monthly'",
          enum: ["daily", "weekly", "monthly"],
        },
        hours: {
          type: "int",
          description: "The hour of day for the habit (0-23), default is 10",
        },
        minutes: {
          type: "int",
          description: "The minute of hour for the habit (0-59) default is 10",
        },
        dayOfWeek: {
          type: "int",
          description: "For weekly habits, the day of week (0=Sunday, 6=Saturday)",
        },
        dayOfMonth: {
          type: "int",
          description: "For monthly habits, the day of month (1-31)",
        },
        targetDurationInDays: {
          type: "int",
          description: "Target duration in days to maintain the habit",
        },
        icon: {
          type: "string",
          description: "Icon name for the habit",
        },
      },
      required: ["title", "frequency", "hours", "minutes"],
    },
  },
  {
    name: "GET_HABITS",
    description: "Get all habits of the user.",
    parameters: {
      type: "dict",
      properties: {},
      required: [],
    },
  },
  {
    name: "SEARCH_HABITS",
    description: "Search for specific habits by text query.",
    parameters: {
      type: "dict",
      properties: {
        query: {
          type: "string",
          description: "The search query to find habits",
        },
      },
      required: ["query"],
    },
  },
  {
    name: "GET_HABIT_DETAILS",
    description: "Get detailed information about a specific habit.",
    parameters: {
      type: "dict",
      properties: {
        id: {
          type: "string",
          description: "The unique identifier of the habit",
        },
      },
      required: ["id"],
    },
  },
  {
    name: "UPDATE_HABIT",
    description: "Update an existing habit with new information.",
    parameters: {
      type: "dict",
      properties: {
        id: {
          type: "string",
          description: "The unique identifier of the habit to update",
        },
        updates: {
          type: "dict",
          description: "Object containing the fields to update",
          properties: {
            title: {
              type: "string",
              description: "New title for the habit",
            },
            description: {
              type: "string",
              description: "New description for the habit",
            },
            frequency: {
              type: "string",
              description: "New frequency: 'daily', 'weekly', or 'monthly'",
              enum: ["daily", "weekly", "monthly"],
            },
            hours: {
              type: "int",
              description: "New hour (0-23)",
            },
            minutes: {
              type: "int",
              description: "New minute (0-59)",
            },
            dayOfWeek: {
              type: "int",
              description: "New day of week for weekly habits (0-6)",
            },
            dayOfMonth: {
              type: "int",
              description: "New day of month for monthly habits (1-31)",
            },
            targetDurationInDays: {
              type: "int",
              description: "New target duration in days",
            },
            icon: {
              type: "string",
              description: "New icon name",
            },
          },
        },
      },
      required: ["id", "updates"],
    },
  },
  {
    name: "DELETE_HABIT",
    description: "Delete an existing habit.",
    parameters: {
      type: "dict",
      properties: {
        id: {
          type: "string",
          description: "The unique identifier of the habit to delete",
        },
      },
      required: ["id"],
    },
  },
];
