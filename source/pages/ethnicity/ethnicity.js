(() => {
  window.loadjs(
    [
      "https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.css",
      "https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js",
    ],
    async () => {
      const STUDENTS = await fetch("./data/students-formatted.json").then((r) =>
        r.json()
      );
      const studentsRegion = STUDENTS.reduce((a, c) => {
        const region = c.ethnicity.region;
        if (region in a) a[region] = a[region] + 1;
        else a[region] = 1;
        return a;
      }, {});

      const ctx = document.getElementById("region-chart").getContext("2d");

      const chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: Object.keys(studentsRegion),
          datasets: [
            {
              label: "Student Count",
              data: Object.values(studentsRegion),
            },
          ],
        },
      });
    }
  );
})();
