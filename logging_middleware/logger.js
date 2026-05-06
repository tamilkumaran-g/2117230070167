const token = "YOUR_ACCESS_TOKEN";
export async function Log(stack, level, pkg, message) {
  try {
    await fetch("http://20.207.122.201/evaluation-service/logs", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message,
      }),
    });
  } catch (error) {
    console.error("Logging Error:", error);
  }
}