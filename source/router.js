(async () => {
  const { APPLICATION_ROUTES } = window;

  const assetPath = (path, assetExtension) => {
    const pathSegments = path.split("/").filter((segment) => segment.length);
    if (path.endsWith("/"))
      return (
        pathSegments.join("/") +
        "/" +
        pathSegments[pathSegments.length - 1] +
        "." +
        assetExtension
      );
    else return pathSegments.join("/") + "." + assetExtension;
  };

  const requestedPath = window.location.pathname;
  const route = APPLICATION_ROUTES[requestedPath] || APPLICATION_ROUTES["404"];
  const routeHtml = await fetch(assetPath(route.path, "html")).then((r) =>
    r.text()
  );

  const renderHtml = (html) => {
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = html;
  };

  const loadAssets = (route) =>
    route.assets
      ? route.assets.forEach((asset) =>
          window.loadjs(assetPath(route.path, asset))
        )
      : undefined;

  const initialize = () => {
    renderHtml(routeHtml);
    loadAssets(route);
  };

  if (/complete|interactive|loaded/.test(document.readyState)) initialize();
  else window.addEventListener("DOMContentLoaded", () => initialize());
})();
