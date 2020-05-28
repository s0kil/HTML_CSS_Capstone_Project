window.loadjs(
  [
    "https://unpkg.com/lighterhtml",
    "https://cdn.jsdelivr.net/npm/timeago.js@4.0.2/dist/timeago.min.js",
  ],
  async () => {
    const STUDENTS = await fetch("./data/students-formatted.json").then((r) =>
      r.json()
    );
    const studentsSortedByDateJoined = STUDENTS.sort(
      (a, b) => Date.parse(b.joined) - Date.parse(a.joined)
    );

    const { html } = window.lighterhtml;

    const formatDate = (date) => timeago.format(Date.parse(date));

    const studentsTemplate = (students) => html.node`
    <table>
      <tr>
        <th>Name</th>
        <th>Joined</th>
        <th>Ethnicity</th>
      </tr>

      ${students.map(
        (item) => html.node`
        <tr>
          <td>
            <a href="/search?student-search=${item.student}">
              ${item.student}
            </a>
          </td>
          <td>${formatDate(item.joined)}</td>
          <td>
            <a href="/search?region-search=${item.ethnicity.region}">
              ${item.ethnicity.region}
            </a>
          </td>
        </tr>
      `
      )}
    </table>
  `;

    document
      .getElementById("students-total")
      .appendChild(html.node`${STUDENTS.length}`);

    document
      .getElementById("students-table")
      .appendChild(studentsTemplate(studentsSortedByDateJoined));
  }
);
