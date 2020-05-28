(async () => {
  const STUDENTS = await fetch("./data/students-formatted.json").then((r) =>
    r.json()
  );

  const studentNames = STUDENTS.map((item) => item["student"]);

  window.loadjs(
    "https://cdn.jsdelivr.net/gh/s0kil/inputyper@6e03fc2fe660bf1c75fc70eb320c0f6dd77ed61e/index.js",
    () => {
      PlaceholderTypingEffect({
        element: document.getElementById("student-search"),
        strings: studentNames,
        prepend: 'e.g. "',
        append: '"',
      }).begin({ delay: 1000 });
    }
  );
})();
