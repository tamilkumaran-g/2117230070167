import { useEffect, useState } from "react";
import { Log } from "../../logging_middleware/logger";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);

  // PRIORITY ORDER
  const priorityMap = {
    Placement: 3,
    Result: 2,
    Event: 1,
  };

  // FETCH DATA WHEN PAGE OR FILTER CHANGES
  useEffect(() => {
    fetchNotifications();
  }, [page, filter]);

  async function fetchNotifications() {
    try {
      let url =
        `http://20.207.122.201/evaluation-service/notifications?limit=10&page=${page}`;

      // FILTER
      if (filter) {
        url += `&notification_type=${filter}`;
      }

      // API CALL
      const response = await fetch(url, {
        method: "GET",

        headers: {
          Authorization:
            "Bearer YOUR_ACCESS_TOKEN",
        },
      });

      // CONVERT RESPONSE
      const data = await response.json();

      console.log(response.status);
      console.log(data);

      // HANDLE UNAUTHORIZED / EMPTY
      if (!data.notifications) {
        console.log("No notifications found");
        return;
      }

      // SORT BY PRIORITY
      const sorted = [...data.notifications].sort((a, b) => {
        return priorityMap[b.Type] - priorityMap[a.Type];
      });

      // TOP 10
      const topNotifications = sorted.slice(0, 10);

      setNotifications(topNotifications);

      // LOG SUCCESS
      await Log(
        "frontend",
        "info",
        "component",
        "notifications fetched successfully"
      );

    } catch (error) {
      console.error(error);

      // LOG ERROR
      await Log(
        "frontend",
        "error",
        "component",
        "failed to fetch notifications"
      );
    }
  }

  // FILTER FUNCTION
  function filterType(type) {
    setFilter(type);
    setPage(1);
  }

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        Campus Notifications
      </h1>

      {/* FILTER BUTTONS */}

      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <button onClick={() => filterType("")}>
          All
        </button>

        <button onClick={() => filterType("Placement")}>
          Placement
        </button>

        <button onClick={() => filterType("Result")}>
          Result
        </button>

        <button onClick={() => filterType("Event")}>
          Event
        </button>
      </div>

      {/* NOTIFICATIONS */}

      {notifications.map((item) => (
        <div
          key={item.ID}
          style={{
            border: "1px solid gray",
            borderRadius: "10px",
            padding: "15px",
            marginBottom: "15px",
            backgroundColor: "#f5f5f5",
            color: "black",
          }}
        >
          <h3>{item.Type}</h3>

          <p>{item.Message}</p>

          <small>{item.Timestamp}</small>
        </div>
      ))}

      {/* PAGINATION */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <button
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}
        >
          Previous
        </button>

        <span>Page {page}</span>

        <button
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;