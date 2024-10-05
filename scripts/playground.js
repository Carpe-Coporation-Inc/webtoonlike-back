

async function createEpisodes() {


  for (var i = 0; i < 100; i++) {

    const rsp = await fetch("http://localhost:3301/webtoon-episodes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "fake-uid": 2,
      },
      body: JSON.stringify({
        form: {
          authorId: 2,
          webtoonId: 5,
          title: `Episode ${i}`,
          description: `Episode ${i} description`,
        }
      })
    });
    const data = await rsp.json();
    console.log(JSON.stringify(data));
  }

}


createEpisodes();