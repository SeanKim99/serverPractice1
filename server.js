const http = require("http"); // http
const fs = require("fs").promises; //파일 불러오기

http
  .createServer(async (req, res) => {
    try {
      //get 부분
      if (req.method === "GET") {
        if (req.url === "/") {
          //기본일때
          const data = await fs.readFile("./home.html");
          res.writeHead(200);
          res.end(data);
        } else if (req.url === "/page1") {
          //page1일때
          const data = await fs.readFile("./page1.html");
          res.writeHead(200);
          res.end(data);
        }
        try {
          const data = await fs.readFile(`.${req.url}`);
          return res.end(data);
        } catch (err) {
          //에러 처리
        }
      }
      //발견 못하면 에러 404 처리
      res.writeHead(404);
      res.end("not found");
    } catch (err) {
      res.writeHead(500);
      res.end(err.message);
    }
  })
  .listen(8080, () => {
    console.log("서버가 실행됩니다.");
  });
