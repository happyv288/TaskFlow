export const reminderTemplate = (
  name: string,
  title: string,
  priority: string,
  category: string,
  dueDate: Date,
) => {
  return `
    <div style="font-family:Arial,sans-serif;padding:20px">
      <h2>⏰ Task Reminder</h2>

      <p>Hello <strong>${name}</strong>,</p>

      <p>Your task is due soon.</p>

      <table cellpadding="8">
        <tr>
          <td><strong>Task</strong></td>
          <td>${title}</td>
        </tr>

        <tr>
          <td><strong>Priority</strong></td>
          <td>${priority}</td>
        </tr>

        <tr>
          <td><strong>Category</strong></td>
          <td>${category}</td>
        </tr>

        <tr>
          <td><strong>Due Date</strong></td>
          <td>${new Date(dueDate).toLocaleString()}</td>
        </tr>
      </table>

      <br>

      <p>Please complete it before the deadline.</p>

      <h3>TaskFlow</h3>
    </div>
  `;
};
