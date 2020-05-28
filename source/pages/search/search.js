(async () => {
  const STUDENTS = await fetch("./data/students-formatted.json").then((r) =>
    r.json()
  );

  const h = await window
    .loadjs("https://cdn.jsdelivr.net/npm/stage0@0.0.25/dist/index.min.js", {
      returnPromise: true,
    })
    .then(() => window["stage0"]["default"]);

  const searchParamaters = new URLSearchParams(window.location.search);
  const searchParamatersKey = ((keys) => keys)(...searchParamaters.keys());
  const searchParamaterValue = searchParamaters.get(searchParamatersKey);

  switch (searchParamatersKey) {
    case "region-search":
      renderStudents(
        STUDENTS.filter(
          (item) => item.ethnicity.region === searchParamaterValue
        )
      );
      break;

    case "student-search":
      renderStudents(
        STUDENTS.filter((item) =>
          String(item.student).includes(searchParamaterValue)
        )
      );
      break;

    default:
      // Redirect To Home Page
      window.location.href = window.location.origin;
      break;
  }

  function renderStudents(students) {
    const StudentView = h`
      <li>#studentName</li>
    `;

    const view = students.reduce((fragment, item) => {
      const root = StudentView.cloneNode(true);
      const { studentName } = StudentView.collect(root);
      studentName.nodeValue = item.student;
      fragment.appendChild(root);
      return fragment;
    }, document.createDocumentFragment());

    document.getElementById("filtered-students-table").appendChild(view);
  }
})();
