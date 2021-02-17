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

const isJson = (str) => {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

const hasKeys = (str) => {
  if(str.includes("{") || str.includes("}")) return true;
  return false;
}

const isWSOpen = (ws) => {
	return ws.readyState === ws.OPEN;
}

const isMobile = {
  Android: () => {
      return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: () => {
      return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: () => {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: () => {
      return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: () => {
      return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
  },
  any: () => {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};