(async () => {
  const APPLICATION_ROUTES = {
    "/": {
      html: "./pages/home.html",
      script: "./pages/home.js",
    },
    "/search": {
      html: "./pages/search.html",
    },
    "/ethnicity": {
      html: "./pages/ethnicity.html",
      script: "./pages/ethnicity.js",
    },
    "/students": {
      html: "./pages/students.html",
      script: "./pages/students.js",
    },
    "404": {
      html: "./pages/404.html",
    },
  };

  const requestedPath = window.location.pathname;
  const route = APPLICATION_ROUTES[requestedPath] || APPLICATION_ROUTES["404"];
  const routeHtml = await fetch(route.html).then((r) => r.text());

  const renderRouteHtml = (html) => {
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = html;
  };

  const loadRouteScript = (route) =>
    route.script ? window.loadjs(route.script) : undefined;

  if (/complete|interactive|loaded/.test(document.readyState)) {
    renderRouteHtml(routeHtml);
    loadRouteScript(route);
  } else {
    window.addEventListener("DOMContentLoaded", () => {
      renderRouteHtml(routeHtml);
      loadRouteScript(route);
    });
  }
})();
