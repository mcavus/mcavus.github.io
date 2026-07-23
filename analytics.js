/* Cloudflare Web Analytics — cookieless, so no consent banner is required.
   Token comes from dash.cloudflare.com > Analytics & Logs > Web Analytics.
   It is not a secret; it ships in the page either way. */
var CF_BEACON_TOKEN = "071a5d9c8fbc4b468c8a000bc2afe8e0";

(function () {
  /* Skip while developing, so local visits stay out of the numbers. */
  var host = location.hostname;
  if (host === "localhost" || host === "127.0.0.1" || host === "") return;
  if (!CF_BEACON_TOKEN || CF_BEACON_TOKEN.indexOf("PASTE") !== -1) return;

  var s = document.createElement("script");
  /* type=module matches the snippet Cloudflare currently issues; the beacon is
     an ES module, and module scripts are deferred by default. */
  s.type = "module";
  s.src = "https://static.cloudflareinsights.com/beacon.min.js";
  s.setAttribute("data-cf-beacon", JSON.stringify({ token: CF_BEACON_TOKEN }));
  document.head.appendChild(s);
})();
