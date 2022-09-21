const container = document.getElementById("root");
const ajax = new XMLHttpRequest();
const content = document.createElement("div");
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";

function getData(url) {
  ajax.open("GET", url, false);
  ajax.send();

  return JSON.parse(ajax.response);
}

// 목록 만들기
const newsFeed = getData(NEWS_URL);
const newsList = [];
newsList.push("<ul>");
for (let i = 0; i < 10; i++) {
  newsList.push(`
    <li>
        <a href="#${newsFeed[i].id}">
            ${newsFeed[i].title} (${newsFeed[i].comments_count})
        </a>
    </li>
  `);
}
newsList.push("</ul>");

// root에 추가
container.innerHTML = newsList.join("");

// 목록에서 클릭했을 때, 상세 페이지
window.addEventListener("hashchange", function () {
  const id = location.hash.substring(1);
  const newsContent = getData(CONTENT_URL.replace("@id", id));

  // root에 추가
  container.innerHTML = `
        <h1>${newsContent.title}</h1>

        <div><a href="#">목록으로</a></div>
    `;
});
