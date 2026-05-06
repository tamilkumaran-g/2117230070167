# Campus Notification System Design

## Overview

The Campus Notification System is designed to fetch, prioritize, filter, and display notifications for students. The system supports Placement, Result, and Event notifications with priority-based sorting and pagination.

The application is implemented using React for the frontend and a lightweight Express server for backend testing support.

---

# Architecture

The project contains three main modules:

## 1. logging_middleware

Responsible for sending structured logs to the external evaluation logging API.

### Responsibilities
- Log frontend actions
- Log API success/failure
- Track notification fetching events
- Track filter and pagination events

### Logging Format

```json
{
  "stack": "frontend",
  "level": "info",
  "package": "component",
  "message": "notifications fetched successfully"
}
```

---

## 2. notification_app_fe

Frontend React application responsible for:

- Fetching notifications
- Sorting by priority
- Filtering by type
- Pagination
- Displaying notifications
- Calling logging middleware

### Technologies Used

- React
- JavaScript
- Fetch API
- CSS Inline Styling

---

## 3. notification_app_be

A lightweight Express backend server created for frontend testing purposes.

### Features

- Health check endpoint
- Mock notification API
- Frontend integration support

---

# Notification Priority Logic

Notifications are sorted based on priority.

| Notification Type | Priority |
|-------------------|----------|
| Placement         | High     |
| Result            | Medium   |
| Event             | Low      |

### Priority Mapping

```javascript
const priorityMap = {
  Placement: 3,
  Result: 2,
  Event: 1,
};
```

### Sorting Logic

```javascript
const sorted = [...data.notifications].sort((a, b) => {
  return priorityMap[b.Type] - priorityMap[a.Type];
});
```

---

# Pagination

Pagination is implemented using query parameters.

### Query Parameters

- limit
- page

### Example

```text
/notifications?limit=10&page=1
```

### Purpose

- Reduce frontend load
- Improve performance
- Fetch notifications page by page

---

# Filtering

Filtering is implemented using the `notification_type` query parameter.

### Example

```text
/notifications?notification_type=Placement
```

### Supported Filters

- Placement
- Result
- Event

---

# Logging Middleware Design

The logging middleware is implemented as a reusable function.

### Responsibilities

- Send logs to evaluation server
- Handle logging failures
- Provide reusable logging utility

### Function Signature

```javascript
Log(stack, level, package, message)
```

### Example

```javascript
await Log(
  "frontend",
  "info",
  "component",
  "notifications fetched successfully"
);
```

---

# Error Handling

The application handles:

- Unauthorized API access
- Empty notification responses
- Logging failures
- Pagination edge cases

---

# Performance Considerations

- Only top 10 notifications displayed
- Pagination minimizes unnecessary data loading
- Filtering reduces rendering overhead

---

# Future Improvements

- Authentication system
- Real-time notifications using WebSockets
- Database integration
- User-specific notification preferences
- Responsive mobile UI
- Notification read/unread tracking

---

# Conclusion

The system successfully demonstrates:

- API integration
- Priority-based sorting
- Filtering
- Pagination
- Structured logging middleware
- Frontend state management
- Modular project organization