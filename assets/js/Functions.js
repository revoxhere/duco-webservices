const getJSON = (url, qs_params = "") => {
  const buildQueryString = (params) => {
    return Object.entries(params)
      .map((d) => `${d[0]}=${d[1]}`)
      .join("&");
  }

  return new Promise((resolve, reject) => {
    const qs = qs_params ? "?" + buildQueryString(qs_params) : "";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${url}${qs}`);

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 400) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        resolve(xhr.responseText);
      }
    };
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
}

const fadeOut = (el) => {
  el.style.opacity = 1;

  (function fade() {
    if ((el.style.opacity -= 0.1) < 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

const fadeIn = (el, display) => {
  el.style.opacity = 0;
  el.style.display = display || "block";

  (function fade() {
    let val = parseFloat(el.style.opacity);
    if (!((val += 0.1) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}

const isWSOpen = (ws) => {
	return ws.readyState === ws.OPEN;
}
